// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/* Superfluid Interfaces */
import { ISuperfluid } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import { ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import { IConstantFlowAgreementV1 } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import { IInstantDistributionAgreementV1 } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";
import { SuperAppDefinitions } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/Definitions.sol";

/* Superfluid Contracts */
import { CFAv1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";
import { IDAv1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";
import { SuperAppBase } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

/* Openzeppelin Contract */
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/* Custom Imports */
import { IABRegistry } from "./interfaces/IABRegistry.sol";

/// @dev Thrown when the caller is not authorized to call the function
error FORBIDDEN();

/// @dev Thrown when the passed parameter is invalid
error INVALID_PARAMETER();

contract ABStreamRoyalty is SuperAppBase, Ownable {
  using IDAv1Library for IDAv1Library.InitData;

  /// @notice IDA Library
  IDAv1Library.InitData public idaV1;

  /// @notice Super token Ether to be streamed
  ISuperToken public ETHx;

  /// @dev Address of Anotherblock Registry (used to store data incoming from L1 txs)
  IABRegistry internal AB_REGISTRY;

  /// @dev Address of Anotherblock Relay (used to control the streams destination based on L1 messages)
  address internal AB_RELAY;

  uint32 public constant INDEX_ID = 0;

  /// @dev Stores the base flow per NFT held for a given Drop ID
  mapping(uint256 => int96) internal baseFlowPerDrop;

  /**
   * @notice
   *  Contract Constructor
   *
   * @param _host : Superfluid Host address
   * @param _ETHx : Super Token Ether address
   * @param _relay : Anotherblock Relay address
   * @param _registry : Anotherblock Registry address
   */
  constructor(
    ISuperfluid _host,
    ISuperToken _ETHx,
    address _relay,
    address _registry
  ) {
    ETHx = _ETHx;

    // IDA Library Initialize.
    idaV1 = IDAv1Library.InitData(
      _host,
      IInstantDistributionAgreementV1(
        address(
          _host.getAgreementClass(
            keccak256(
              "org.superfluid-finance.agreements.InstantDistributionAgreement.v1"
            )
          )
        )
      )
    );

    AB_REGISTRY = IABRegistry(_registry);
    AB_RELAY = _relay;

    idaV1.createIndex(ETHx, INDEX_ID);
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

    // Reduce the previous holder flow
    // _loseShare(_previousReceiver, _dropId);

    // Increase the new holder flow
    // _gainShare(_newReceiver, _dropId);
  }

  /// @notice allows an account to delete its entire subscription this contract
  /// @param subscriber subscriber address whose subscription is to be deleted
  function deleteShares(address subscriber) external {
    idaV1.deleteSubscription(ETHx, address(this), INDEX_ID, subscriber);
  }

  /// @notice Takes the entire balance of the designated ETHx in the contract and distributes it out to unit holders w/ IDA
  function distribute(uint256 amount) public {
    ETHx.transferFrom(msg.sender, address(this), amount);

    (uint256 actualDistributionAmount, ) = idaV1.ida.calculateDistribution(
      ETHx,
      address(this),
      INDEX_ID,
      amount
    );

    idaV1.distribute(ETHx, INDEX_ID, actualDistributionAmount);
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

  /*************************************************************************
   *                              INTERNAL                                 *
   *************************************************************************/
  function _gainShare(address subscriber, uint256 units) internal {
    // Get current units subscriber holds
    (, , uint256 currentUnitsHeld, ) = idaV1.getSubscription(
      ETHx,
      address(this),
      INDEX_ID,
      subscriber
    );

    // Update to current amount + 1
    idaV1.updateSubscriptionUnits(
      ETHx,
      INDEX_ID,
      subscriber,
      uint128(currentUnitsHeld + units)
    );
  }

  /// @notice lets an account lose a single distribution unit
  /// @param subscriber subscriber address whose units are to be decremented
  function _loseShare(address subscriber) internal {
    // Get current units subscriber holds
    (, , uint256 currentUnitsHeld, ) = idaV1.getSubscription(
      ETHx,
      address(this),
      INDEX_ID,
      subscriber
    );

    // Update to current amount - 1 (reverts if currentUnitsHeld - 1 < 0, so basically if currentUnitsHeld = 0)
    idaV1.updateSubscriptionUnits(
      ETHx,
      INDEX_ID,
      subscriber,
      uint128(currentUnitsHeld - 1)
    );
  }

  /**************************************************************************
   *                              ONLY OWNER
   *************************************************************************/

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
}
