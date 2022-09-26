// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import { ISuperfluid, ISuperApp, ISuperToken, ISuperAgreement, SuperAppDefinitions } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { CFAv1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

import { IConstantFlowAgreementV1 } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import { SuperAppBase } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

import { ISuperSoulbound } from "./interfaces/ISuperSoulbound.sol";

import { ICrossDomainMessenger } from "@eth-optimism/contracts/libraries/bridge/ICrossDomainMessenger.sol";

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/// @dev Constant Flow Agreement registration key, used to get the address from the host.
bytes32 constant CFA_ID = keccak256(
  "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
);

/// @dev Thrown when the callback caller is not the host.
error Unauthorized();

/// @dev Thrown when the token being streamed to this contract is invalid
error InvalidToken();

/// @dev Thrown when the agreement is other than the Constant Flow Agreement V1
error InvalidAgreement();

contract Cashflow is SuperAppBase, Ownable {
  // CFA library setup
  using CFAv1Library for CFAv1Library.InitData;
  CFAv1Library.InitData public cfaV1Lib;

  /// @dev Super token that may be streamed to this contract
  ISuperSoulbound internal acceptedToken;

  ICrossDomainMessenger internal messenger =
    ICrossDomainMessenger(0x4200000000000000000000000000000000000007);
  address internal nft;

  mapping(uint256 => int96) public flowRates;

  constructor(ISuperfluid host) {
    assert(address(host) != address(0));

    cfaV1Lib = CFAv1Library.InitData({
      host: host,
      cfa: IConstantFlowAgreementV1(address(host.getAgreementClass(CFA_ID)))
    });
  }

  function issueNFT(
    address receiver,
    int96 flowRate,
    uint256 tokenId
  ) external onlyNFT {
    _issueNFT(receiver, flowRate, tokenId);
  }

  function updateHolder(
    address oldReceiver,
    address newReceiver,
    uint256 tokenId
  ) external onlyNFT {
    acceptedToken.setAllowedId(newReceiver);
    _reduceFlow(oldReceiver, flowRates[tokenId]);
    _increaseFlow(newReceiver, flowRates[tokenId]);
  }

  function editNFT(
    uint256 tokenId,
    int96 flowRate,
    address receiver
  ) external {
    require(flowRate >= 0, "flowRate must be positive!");

    if (flowRate == 0) {
      // subtract previous flowrate
      _reduceFlow(receiver, flowRates[tokenId]);
    } else {
      // add new flowRate
      _increaseFlow(receiver, flowRate - flowRates[tokenId]);
    }

    flowRates[tokenId] = flowRate;
  }

  function getAcceptedToken() external view returns (address) {
    return address(acceptedToken);
  }

  function getNFT() external view returns (address) {
    return nft;
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
        ISuperToken(address(acceptedToken)),
        address(this),
        _receiver
      );
  }

  /**************************************************************************
   *                              INTERNAL
   *************************************************************************/

  function _issueNFT(
    address receiver,
    int96 flowRate,
    uint256 tokenId
  ) internal {
    require(receiver != address(this), "Issue to a new address");
    require(flowRate > 0, "flowRatee must be positive!");
    acceptedToken.setAllowedId(receiver);
    flowRates[tokenId] = flowRate;
  }

  //this will increase the flow or create it
  function _increaseFlow(address to, int96 flowRate) internal {
    if (to == address(0)) return;

    (, int96 outFlowRate, , ) = cfaV1Lib.cfa.getFlow(
      ISuperToken(address(acceptedToken)),
      address(this),
      to
    ); //returns 0 if stream doesn't exist
    if (outFlowRate == 0) {
      cfaV1Lib.createFlow(to, ISuperToken(address(acceptedToken)), flowRate);
    } else {
      // increase the outflow by flowRates[tokenId]
      cfaV1Lib.updateFlow(
        to,
        ISuperToken(address(acceptedToken)),
        outFlowRate + flowRate
      );
    }
  }

  function _reduceFlow(address to, int96 flowRate) internal {
    if (to == address(this)) return;

    (, int96 outFlowRate, , ) = cfaV1Lib.cfa.getFlow(
      ISuperToken(address(acceptedToken)),
      address(this),
      to
    );

    if (outFlowRate == flowRate) {
      cfaV1Lib.deleteFlow(
        address(this),
        to,
        ISuperToken(address(acceptedToken))
      );
    } else if (outFlowRate > flowRate) {
      // reduce the outflow by flowRate;
      // shouldn't overflow, because we just checked that it was bigger.
      cfaV1Lib.updateFlow(
        to,
        ISuperToken(address(acceptedToken)),
        outFlowRate - flowRate
      );
    }
    // won't do anything if outFlowRate < flowRate
  }

  /**************************************************************************
   *                              ONLY OWNER
   *************************************************************************/

  function setNFT(address _nft) external onlyOwner {
    nft = _nft;
  }

  function setAcceptedToken(address _acceptedToken) external onlyOwner {
    assert(_acceptedToken != address(0));
    acceptedToken = ISuperSoulbound(_acceptedToken);
  }

  /**************************************************************************
   *                              MODIFIER
   *************************************************************************/

  modifier onlyNFT() {
    require(
      msg.sender == address(messenger) &&
        messenger.xDomainMessageSender() == nft
    );
    _;
  }
}
