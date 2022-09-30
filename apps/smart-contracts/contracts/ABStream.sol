// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/* Superfluid Interfaces */
import { ISuperfluid } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import { ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import { IConstantFlowAgreementV1 } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

/* Superfluid Contracts */
import { CFAv1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";
import { SuperAppBase } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

/* Openzeppelin Contract */
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/* Custom Imports */
import { ISuperSoulbound } from "./interfaces/ISuperSoulbound.sol";
import { IABRegistry } from "./interfaces/IABRegistry.sol";

/// @dev Thrown when the caller is not authorized to call the function
error FORBIDDEN();

/// @dev Thrown when the passed parameter is invalid
error INVALID_PARAMETER();

contract ABStream is SuperAppBase, Ownable {
  using CFAv1Library for CFAv1Library.InitData;

  /// @dev Superfluid Constant Flow Agreement library
  CFAv1Library.InitData public cfaV1Lib;

  /// @dev Anotherblock Super Token streamed from this contract
  ISuperSoulbound internal AB_TOKEN;

  /// @dev Address of Anotherblock Registry (used to store data incoming from L1 txs)
  IABRegistry internal AB_REGISTRY;

  /// @dev Address of Anotherblock Relay (used to control the streams destination based on L1 messages)
  address internal AB_RELAY;

  /// @dev Stores the base flow for a given Drop ID
  mapping(uint256 => int96) internal baseFlowPerDrop;

  /// @dev Stores the total boost increase for a given user
  mapping(address => int96) internal currentUserBoost;

  struct Condition {
    uint256[] dropIds;
    uint256[] quantities;
  }

  struct Boost {
    Condition condition;
    int96 increase;
  }

  Boost[] public boosts;

  constructor(
    ISuperfluid _host,
    address _relay,
    address _registry
  ) {
    if (address(_host) == address(0) || _relay == address(0))
      revert INVALID_PARAMETER();

    cfaV1Lib = CFAv1Library.InitData({
      host: _host,
      cfa: IConstantFlowAgreementV1(
        address(
          _host.getAgreementClass(
            keccak256(
              "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
            )
          )
        )
      )
    });

    AB_REGISTRY = IABRegistry(_registry);
    AB_RELAY = _relay;
  }

  function updateStream(
    address _previousReceiver,
    address _newReceiver,
    uint256 _dropId
  ) external {
    if (msg.sender != AB_RELAY) revert FORBIDDEN();
    AB_TOKEN.setAllowedId(_newReceiver);
    _reduceFlow(_previousReceiver, _dropId);
    _increaseFlow(_newReceiver, _dropId);
  }

  function setBaseFlow(int96 _baseFlow, uint256 _dropId) external {
    if (msg.sender != AB_RELAY) revert FORBIDDEN();
    if (_baseFlow <= 0) revert INVALID_PARAMETER();
    baseFlowPerDrop[_dropId] = _baseFlow;
  }

  function getABToken() external view returns (address) {
    return address(AB_TOKEN);
  }

  function getABRegistry() external view returns (address) {
    return address(AB_REGISTRY);
  }

  function getABRelay() external view returns (address) {
    return AB_RELAY;
  }

  function getFlow(address _receiver)
    external
    view
    returns (
      uint256 timestamp,
      int96 flowRate,
      uint256 deposit,
      uint256 owedDeposit
    )
  {
    return
      cfaV1Lib.cfa.getFlow(
        ISuperToken(address(AB_TOKEN)),
        address(this),
        _receiver
      );
  }

  /**************************************************************************
   *                              INTERNAL
   *************************************************************************/

  function _increaseFlow(address _to, uint256 _dropId) internal {
    if (_to == address(0)) return;

    int96 currentFlow = _getOutflow(_to);
    int96 newUserBoost = _getUserBoost(_to);

    int96 newFlow = currentFlow +
      baseFlowPerDrop[_dropId] +
      newUserBoost -
      currentUserBoost[_to];

    if (currentFlow == 0) {
      cfaV1Lib.createFlow(_to, ISuperToken(address(AB_TOKEN)), newFlow);
    } else {
      cfaV1Lib.updateFlow(_to, ISuperToken(address(AB_TOKEN)), newFlow);
    }
    currentUserBoost[_to] = newUserBoost;
  }

  function _reduceFlow(address _from, uint256 _dropId) internal {
    if (_from == address(this)) return;

    int96 currentFlow = _getOutflow(_from);
    int96 newUserBoost = _getUserBoost(_from);

    int96 newFlow = currentFlow -
      baseFlowPerDrop[_dropId] +
      newUserBoost -
      currentUserBoost[_from];

    if (newFlow == 0) {
      cfaV1Lib.deleteFlow(address(this), _from, ISuperToken(address(AB_TOKEN)));
    } else if (newFlow > 0) {
      cfaV1Lib.updateFlow(_from, ISuperToken(address(AB_TOKEN)), newFlow);
    }
    currentUserBoost[_from] = newUserBoost;
  }

  //returns 0 if stream doesn't exist
  function _getOutflow(address _to) internal returns (int96) {
    (, int96 outFlowRate, , ) = cfaV1Lib.cfa.getFlow(
      ISuperToken(address(AB_TOKEN)),
      address(this),
      _to
    );
    return outFlowRate;
  }

  function _getUserBoost(address _user) internal returns (int96) {
    int96 totalBoost = 0;
    for (uint256 i = 0; i < boosts.length; ++i) {
      if (_isConditionSatisfied(_user, boosts[i].condition)) {
        totalBoost += boosts[i].increase;
      }
    }
    return totalBoost;
  }

  function _isConditionSatisfied(address _user, Condition memory condition)
    internal
    returns (bool)
  {
    for (uint256 i = 0; i < condition.dropIds.length; ++i) {
      if (
        AB_REGISTRY.getUserBalancePerDrop(_user, condition.dropIds[i]) <
        condition.quantities[i]
      ) return false;
    }
    return true;
  }

  /**************************************************************************
   *                              ONLY OWNER
   *************************************************************************/

  function setABToken(address _ABToken) external onlyOwner {
    if (_ABToken == address(0)) revert INVALID_PARAMETER();
    AB_TOKEN = ISuperSoulbound(_ABToken);
  }

  function setABRegistry(address _ABRegistry) external onlyOwner {
    if (_ABRegistry == address(0)) revert INVALID_PARAMETER();
    AB_REGISTRY = IABRegistry(_ABRegistry);
  }

  function setABRelay(address _ABRelay) external onlyOwner {
    if (_ABRelay == address(0)) revert INVALID_PARAMETER();
    AB_RELAY = _ABRelay;
  }
}

/**************************************************************************
 *                              TO BE DISCUSSED
 *************************************************************************/

// NEEDED ?
// function editNFT(
//   uint256 tokenId,
//   int96 flowRate,
//   address receiver
// ) external {
//   require(flowRate >= 0, "flowRate must be positive!");

//   if (flowRate == 0) {
//     // subtract previous flowrate
//     _reduceFlow(receiver, flowRates[tokenId]);
//   } else {
//     // add new flowRate
//     _increaseFlow(receiver, flowRate - flowRates[tokenId]);
//   }

//   flowRates[tokenId] = flowRate;
// }
