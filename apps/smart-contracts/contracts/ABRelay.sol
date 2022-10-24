//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ████████████████████████          ██████████
//                            ████████████████████████          ██████████
//                            ████████████████████████          ██████████
//                            ████████████████████████          ██████████
//                                                    ████████████████████
//                                                    ████████████████████
//                                                    ████████████████████
//                                                    ████████████████████
//
//
//  █████╗ ███╗   ██╗ ██████╗ ████████╗██╗  ██╗███████╗██████╗ ██████╗ ██╗      ██████╗  ██████╗██╗  ██╗
// ██╔══██╗████╗  ██║██╔═══██╗╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝
// ███████║██╔██╗ ██║██║   ██║   ██║   ███████║█████╗  ██████╔╝██████╔╝██║     ██║   ██║██║     █████╔╝
// ██╔══██║██║╚██╗██║██║   ██║   ██║   ██╔══██║██╔══╝  ██╔══██╗██╔══██╗██║     ██║   ██║██║     ██╔═██╗
// ██║  ██║██║ ╚████║╚██████╔╝   ██║   ██║  ██║███████╗██║  ██║██████╔╝███████╗╚██████╔╝╚██████╗██║  ██╗
// ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝
//
/**
 * @title ABRelay
 * @author Anotherblock Technical Team
 * @notice Relay Contract on Optimism
 *  Used to relay data incoming from Anotherblock contracts on Ethereum (using Optimism Cross Domain Messenger)
 **/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/* Openzeppelin Contract */
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/* Optimism Interface */
import { ICrossDomainMessenger } from "@eth-optimism/contracts/libraries/bridge/ICrossDomainMessenger.sol";

/* Anotherblock Interfaces */
import { IABStream } from "./interfaces/IABStream.sol";
import { IABRegistry } from "./interfaces/IABRegistry.sol";

contract ABRelay is Initializable, OwnableUpgradeable {
  /*
   **************************************************************************
   *                                STATES                                  *
   **************************************************************************
   */

  /// @dev Addresses allowed to interact with Anotherblock Relay
  mapping(address => bool) private allowedSenders;

  /// @dev Optimism Cross Domain Messenger Interface
  ICrossDomainMessenger internal MESSENGER;

  /// @dev Anotherblock AB Token Streaming Interface
  IABStream internal AB_STREAM;

  /// @dev Anotherblock Registry Interface
  IABRegistry internal AB_REGISTRY;

  /// @dev Storage gap used for future upgrades (30 * 32 bytes)
  uint256[30] __gap;

  /*
   **************************************************************************
   *                            CONSTRUCTOR                                 *
   **************************************************************************
   */

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  /**
   * Contract Initializer
   */
  function initialize() public initializer {
    MESSENGER = ICrossDomainMessenger(
      0x4200000000000000000000000000000000000007
    );
    __Ownable_init();
  }

  /*
   **************************************************************************
   *                             ONLY OWNER                                 *
   **************************************************************************
   */

  /**
   * @notice
   *  Grant access to interact with this contract from `_sender` address
   *
   * @param _sender : the address to be granted access
   */
  function setAllowance(address _sender, bool _authorization)
    external
    onlyOwner
  {
    allowedSenders[_sender] = _authorization;
  }

  /**
   * @notice
   *  Set the address of ABStream
   *
   * @param _abStream : address of Anotherblock AB Token Streaming contract
   */
  function setABStream(address _abStream) external onlyOwner {
    AB_STREAM = IABStream(_abStream);
  }

  /**
   * @notice
   *  Set the address of ABRegistry
   *
   * @param _abRegistry : address of Anotherblock Registry contract
   */
  function setABRegistry(address _abRegistry) external onlyOwner {
    AB_REGISTRY = IABRegistry(_abRegistry);
  }

  /*
   **************************************************************************
   *                            ONLY ALLOWED                                *
   **************************************************************************
   */

  /**
   * @notice
   *  Update the balance on Anotherblock Registry contract
   *  Update the AB Token Stream on Anotherblock Streaming contract
   *
   *  This function can only be called by approved senders using L2 Cross Domain Messenger Contract
   *
   * @param _from : Previous holder address
   * @param _to : New holder address
   * @param _dropId : Drop ID associated to the token transferred
   */
  function transferredNFT(
    address _from,
    address _to,
    uint256 _dropId
  ) external onlyAllowed {
    // Update the balance on Anotherblock Registry contract
    AB_REGISTRY.updateBalance(_from, _to, _dropId);

    // Update the AB Token Stream on Anotherblock Streaming contract
    AB_STREAM.updateStream(_from, _to, _dropId);

    // TODO : update Royalty streaming contract
    // ...
  }

  /**
   * @notice
   *  Update the drop rightholder address on Anotherblock Registry contract
   *  Set the base flow on Anotherblock Streaming contract
   *
   *  This function can only be called by approved senders using L2 Cross Domain Messenger Contract
   *
   * @param _baseFlow : new base flow to be set
   * @param _dropId : Drop ID associated to the token transferred
   * @param _rightholder : Rightholder address
   */
  function createdDrop(
    int96 _baseFlow,
    uint256 _dropId,
    address _rightholder
  ) external onlyAllowed {
    // Update the drop rightholder address on Anotherblock Registry contract
    AB_REGISTRY.updateDropRightholder(_dropId, _rightholder);

    // Set the base flow on Anotherblock Streaming contract
    AB_STREAM.setBaseFlow(_baseFlow, _dropId);
  }

  // TODO : add function to update L2 contracts on L1 Drop modification (Rightholder change, ...)
  function updatedDrop() external onlyAllowed {}

  /*
   **************************************************************************
   *                              MODIFIERS                                 *
   **************************************************************************
   */

  /**
   * @notice
   *  Ensure that the call is coming the L2 cross domain messenger
   *  Ensure that the caller is an approved address
   */
  modifier onlyAllowed() {
    require(
      msg.sender == address(MESSENGER) &&
        allowedSenders[MESSENGER.xDomainMessageSender()]
    );
    _;
  }
}
