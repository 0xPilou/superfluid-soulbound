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

/// @dev Thrown when the caller is not authorized to call the function
error FORBIDDEN();

/// @dev Thrown when the passed parameter is invalid
error INVALID_PARAMETER();

contract ABStream is SuperAppBase, Ownable {
  using CFAv1Library for CFAv1Library.InitData;

  // CFA library
  CFAv1Library.InitData public cfaV1Lib;

  /// @dev Super token that may be streamed to this contract
  ISuperSoulbound internal AB_TOKEN;

  /// @dev Address of Anotherblock Relay (used to control the streams destination based on L1 messages)
  address internal AB_RELAY;

  mapping(uint256 => int96) public flowRates;

  constructor(ISuperfluid host, address relay) {
    assert(address(host) != address(0));

    cfaV1Lib = CFAv1Library.InitData({
      host: host,
      cfa: IConstantFlowAgreementV1(
        address(
          host.getAgreementClass(
            keccak256(
              "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
            )
          )
        )
      )
    });

    AB_RELAY = relay;
  }

  function initStream(int96 flowRate, uint256 tokenId) external {
    if (msg.sender != AB_RELAY) revert FORBIDDEN();
    _initStream(flowRate, tokenId);
  }

  function updateStream(
    address previousReceiver,
    address newReceiver,
    uint256 tokenId
  ) external {
    if (msg.sender != AB_RELAY) revert FORBIDDEN();
    AB_TOKEN.setAllowedId(newReceiver);
    _reduceFlow(previousReceiver, flowRates[tokenId]);
    _increaseFlow(newReceiver, flowRates[tokenId]);
  }

  function getABToken() external view returns (address) {
    return address(AB_TOKEN);
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

  function _initStream(int96 _flowRate, uint256 _tokenId) internal {
    if (_flowRate <= 0) revert INVALID_PARAMETER();
    flowRates[_tokenId] = _flowRate;
  }

  //this will increase the flow or create it
  function _increaseFlow(address to, int96 flowRate) internal {
    if (to == address(0)) return;

    int96 outFlowRate = _getOutflow(to);

    if (outFlowRate == 0) {
      cfaV1Lib.createFlow(to, ISuperToken(address(AB_TOKEN)), flowRate);
    } else {
      // increase the outflow by flowRates[tokenId]
      cfaV1Lib.updateFlow(
        to,
        ISuperToken(address(AB_TOKEN)),
        outFlowRate + flowRate
      );
    }
  }

  function _reduceFlow(address to, int96 flowRate) internal {
    if (to == address(this)) return;

    int96 outFlowRate = _getOutflow(to);

    if (outFlowRate == flowRate) {
      cfaV1Lib.deleteFlow(address(this), to, ISuperToken(address(AB_TOKEN)));
    } else if (outFlowRate > flowRate) {
      // reduce the outflow by flowRate;
      // shouldn't overflow, because we just checked that it was bigger.
      cfaV1Lib.updateFlow(
        to,
        ISuperToken(address(AB_TOKEN)),
        outFlowRate - flowRate
      );
    }
    // won't do anything if outFlowRate < flowRate
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

  /**************************************************************************
   *                              ONLY OWNER
   *************************************************************************/

  function setABToken(address _ABToken) external onlyOwner {
    if (_ABToken == address(0)) revert INVALID_PARAMETER();
    AB_TOKEN = ISuperSoulbound(_ABToken);
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
