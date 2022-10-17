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

  /// @dev Stores the special boost increase for a given user
  mapping(address => int96) internal specialBoost;

  /**
   * @notice
   *  Condition Structure format
   *
   * @param condition : Necessary condition to gain the Boost (see Condition Structure)
   * @param increase : Amount of AB Token increased (in token/seconds) to be granted by the boost
   */
  struct Boost {
    Condition condition;
    int96 increase;
  }

  /**
   * @notice
   *  Condition Structure format
   *
   * @param dropIds : Drop IDs array required to gain the Boost
   * @param quantities : Quantities of tokens (corresponding to the Drop IDs) to be held to gain the Boost
   */
  struct Condition {
    uint256[] dropIds;
    uint256[] quantities;
  }

  /// @dev Array containing all existing & available Boosts
  Boost[] public boosts;

  /// @dev Total number of existing & available boosts
  uint256 public nbBoost = 0;

  /**
   * @notice
   *  Contract Constructor
   *
   * @param _host : Superfluid Host address
   * @param _relay : Anotherblock Relay address
   * @param _registry : Anotherblock Registry address
   */
  constructor(
    ISuperfluid _host,
    address _relay,
    address _registry
  ) {
    if (address(_host) == address(0) || _relay == address(0))
      revert INVALID_PARAMETER();

    // Initialize the Constant Flow Agreement (CFA) Library
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

  /**
   * @notice
   *  Update the streams for the previous holder and the new holder
   *
   * @param _previousReceiver : Previous holder address
   * @param _newReceiver : New holder address
   * @param _dropId : Associated Drop ID corresponding to the token transferred
   */
  function updateStream(
    address _previousReceiver,
    address _newReceiver,
    uint256 _dropId
  ) external {
    // Ensure the caller is Anotherblock Relay
    if (msg.sender != AB_RELAY) revert FORBIDDEN();

    // Allow the new holder to be streamed AB Tokens
    AB_TOKEN.setAllowedId(_newReceiver);

    // Reduce the previous holder flow
    _reduceFlow(_previousReceiver, _dropId);

    // Increase the new holder flow
    _increaseFlow(_newReceiver, _dropId);
  }

  /**
   * @notice
   *  Set the base flow for a given Drop ID
   *
   * @param _baseFlow : new base flow to be set
   * @param _dropId : Associated Drop ID corresponding to the token transferred
   */
  function setBaseFlow(int96 _baseFlow, uint256 _dropId) external {
    // Ensure the caller is Anotherblock Relay
    if (msg.sender != AB_RELAY) revert FORBIDDEN();

    // Ensure the given base flow is greater than 0
    if (_baseFlow <= 0) revert INVALID_PARAMETER();

    // Set the base flow for the given Drop ID
    baseFlowPerDrop[_dropId] = _baseFlow;
  }

  /**
   * @notice
   *  Get Anotherblock Token Address
   *
   * @return : Anotherblock Token Address
   */
  function getABToken() external view returns (address) {
    return address(AB_TOKEN);
  }

  /**
   * @notice
   *  Get Anotherblock Registry Address
   *
   * @return : Anotherblock Registry Address
   */
  function getABRegistry() external view returns (address) {
    return address(AB_REGISTRY);
  }

  /**
   * @notice
   *  Get Anotherblock Relay Address
   *
   * @return : Anotherblock Relay Address
   */
  function getABRelay() external view returns (address) {
    return AB_RELAY;
  }

  /**
   * @notice
   *  Get current flow information of the given address
   *
   * @param _receiver user address to be queried
   *
   * @return timestamp
   * @return flowRate
   * @return deposit
   * @return owedDeposit
   */
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

  /*************************************************************************
   *                              INTERNAL                                 *
   *************************************************************************/

  /**
   * @notice
   *  Increase the flow streamed to the given address
   *
   * @param _to receiver address of the stream to be increase
   * @param _dropId Drop ID of the token transferred
   *
   */
  function _increaseFlow(address _to, uint256 _dropId) internal {
    if (_to == address(0)) return;

    // Get the current flow to the user
    int96 currentFlow = _getOutflow(_to);

    // Get the user boost
    int96 newUserBoost = this.getUserBoost(_to);

    // Calculate the new flow
    int96 newFlow = currentFlow +
      baseFlowPerDrop[_dropId] +
      newUserBoost -
      currentUserBoost[_to];

    if (currentFlow == 0) {
      // If flow is equal to 0, create the flow
      cfaV1Lib.createFlow(_to, ISuperToken(address(AB_TOKEN)), newFlow);
    } else {
      // Else update the flow with the new flow amount
      cfaV1Lib.updateFlow(_to, ISuperToken(address(AB_TOKEN)), newFlow);
    }
    // Update the current User boost
    currentUserBoost[_to] = newUserBoost;
  }

  /**
   * @notice
   *  Reduce the flow streamed to the given address
   *
   * @param _from receiver address of the stream to be reduced
   * @param _dropId Drop ID of the token transferred
   *
   */
  function _reduceFlow(address _from, uint256 _dropId) internal {
    if (_from == address(this) || _from == address(0)) return;

    // Get the current flow to the user
    int96 currentFlow = _getOutflow(_from);

    // Get the user boost
    int96 newUserBoost = this.getUserBoost(_from);

    // Calculate the new flow
    int96 newFlow = currentFlow -
      baseFlowPerDrop[_dropId] +
      newUserBoost -
      currentUserBoost[_from];

    if (newFlow == 0) {
      // If the new calculated flow is equal to 0, delete the flow
      cfaV1Lib.deleteFlow(address(this), _from, ISuperToken(address(AB_TOKEN)));
    } else if (newFlow > 0) {
      // Else update the flow with the new flow amount
      cfaV1Lib.updateFlow(_from, ISuperToken(address(AB_TOKEN)), newFlow);
    }
    // Update the current User boost
    currentUserBoost[_from] = newUserBoost;
  }

  /**
   * @notice
   *  Get current flow amount stream to the given address
   *
   * @dev
   *  Return 0 if the stream does not exist
   *
   * @param _to user address to be queried
   *
   * @return : the current flow stream to the given address
   */
  function _getOutflow(address _to) internal view returns (int96) {
    (, int96 outFlowRate, , ) = cfaV1Lib.cfa.getFlow(
      ISuperToken(address(AB_TOKEN)),
      address(this),
      _to
    );
    return outFlowRate;
  }

  /**
   * @notice
   *  Get current boost allocated to the given address
   *
   * @param _user user address to be queried
   *
   * @return : the total amount of boost allocated to the given address
   */
  function getUserBoost(address _user) external view returns (int96) {
    int96 totalBoost = 0;
    // Loop through all available boosts
    for (uint256 i = 0; i < nbBoost; ++i) {
      // For each boost, check if the user satisfies the conditions
      if (_isConditionSatisfied(_user, boosts[i].condition)) {
        // Increase the boost
        totalBoost += boosts[i].increase;
      }
    }
    return totalBoost;
  }

  /**
   * @notice
   *  Verifies if the given address meet the given boost conditions
   *
   * @param _user user address to be verified
   * @param _condition condition to be verified
   *
   * @return : true if the condition is verified, false otherwise
   */
  function _isConditionSatisfied(address _user, Condition memory _condition)
    internal
    view
    returns (bool)
  {
    for (uint256 i = 0; i < _condition.dropIds.length; ++i) {
      if (
        AB_REGISTRY.getUserBalancePerDrop(_user, _condition.dropIds[i]) <
        _condition.quantities[i]
      ) return false;
    }
    return true;
  }

  /**************************************************************************
   *                              ONLY OWNER
   *************************************************************************/

  /**
   * @notice
   *  Set Anotherblock Token Address
   *
   * @dev
   *  Only the contract owner can perform this operation
   *
   * @param _ABToken Anotherblock Token Address
   */
  function setABToken(address _ABToken) external onlyOwner {
    // Ensure the given address is not the zero-address
    if (_ABToken == address(0)) revert INVALID_PARAMETER();
    AB_TOKEN = ISuperSoulbound(_ABToken);
  }

  /**
   * @notice
   *  Set Anotherblock Registry Address
   *
   * @dev
   *  Only the contract owner can perform this operation
   *
   * @param _ABRegistry Anotherblock Registry Address
   */
  function setABRegistry(address _ABRegistry) external onlyOwner {
    // Ensure the given address is not the zero-address
    if (_ABRegistry == address(0)) revert INVALID_PARAMETER();
    AB_REGISTRY = IABRegistry(_ABRegistry);
  }

  /**
   * @notice
   *  Set Anotherblock Relay Address
   *
   * @dev
   *  Only the contract owner can perform this operation
   *
   * @param _ABRelay Anotherblock Relay Address
   */
  function setABRelay(address _ABRelay) external onlyOwner {
    // Ensure the given address is not the zero-address
    if (_ABRelay == address(0)) revert INVALID_PARAMETER();
    AB_RELAY = _ABRelay;
  }

  /**
   * @notice
   *  Add a new available Boost
   *
   * @dev
   *  Only the contract owner can perform this operation
   *
   * @param _dropIds : Drop IDs array required to gain the Boost
   * @param _quantities : Quantities of tokens (corresponding to the Drop IDs) to be held to gain the Boost
   * @param _increase : Amount of AB Token increased (in token/seconds) to be granted by the boost
   */
  function addBoost(
    uint256[] memory _dropIds,
    uint256[] memory _quantities,
    int96 _increase
  ) external onlyOwner {
    // Ensure that the dropIds array and the quantities array are of the same length
    if (_dropIds.length != _quantities.length) revert INVALID_PARAMETER();

    // Ensure the increase is greater than 0
    if (_increase <= 0) revert INVALID_PARAMETER();

    // Add the new boost to the array of boosts
    boosts.push(Boost(Condition(_dropIds, _quantities), _increase));

    // Increment the total number of boosts
    nbBoost++;
  }

  /**
   * @notice
   *  Update an existing Boost
   *
   * @dev
   *  Only the contract owner can perform this operation
   *
   * @param _boostId : Boost ID to be updated (correspond to its index in the `boosts` array)
   * @param _increase : Amount of AB Token increased (in token/seconds) to be granted by the boost
   */
  function updateBoost(uint256 _boostId, int96 _increase) external onlyOwner {
    // Ensure the boost exists
    if (_boostId > boosts.length) revert INVALID_PARAMETER();

    // Update its `increase` value
    boosts[_boostId].increase = _increase;
  }

  /**
   * @notice
   *  Grant a special boost to a given user
   *
   * @dev
   *  Only the contract owner can perform this operation
   *
   * @param _to : User address to receive the special boost
   * @param _specialBoost : Amount of AB Token increased (in token/seconds) to be granted by the special boost
   */
  function grantSpecialBoost(address _to, int96 _specialBoost)
    external
    onlyOwner
  {
    if (_to == address(0) || _specialBoost <= 0) revert INVALID_PARAMETER();

    int96 currentFlow = _getOutflow(_to);

    int96 newFlow = currentFlow + _specialBoost;

    if (currentFlow == 0) {
      cfaV1Lib.createFlow(_to, ISuperToken(address(AB_TOKEN)), newFlow);
    } else {
      cfaV1Lib.updateFlow(_to, ISuperToken(address(AB_TOKEN)), newFlow);
    }
    specialBoost[_to] += _specialBoost;
  }

  /**
   * @notice
   *  Revoke a special boost to a given user
   *
   * @dev
   *  Only the contract owner can perform this operation
   *
   * @param _from : User address to reduce the special boost from
   * @param _specialBoost : Amount of AB Token flow to be decreased (in token/seconds)
   */
  function revokeSpecialBoost(address _from, int96 _specialBoost)
    external
    onlyOwner
  {
    if (
      _from == address(0) ||
      _specialBoost <= 0 ||
      specialBoost[_from] < _specialBoost
    ) revert INVALID_PARAMETER();

    int96 currentFlow = _getOutflow(_from);

    if (currentFlow - _specialBoost < 0) revert INVALID_PARAMETER();

    int96 newFlow = currentFlow - _specialBoost;

    if (newFlow == 0) {
      cfaV1Lib.deleteFlow(address(this), _from, ISuperToken(address(AB_TOKEN)));
    } else if (newFlow > 0) {
      cfaV1Lib.updateFlow(_from, ISuperToken(address(AB_TOKEN)), newFlow);
    }
    specialBoost[_from] -= _specialBoost;
  }
}
