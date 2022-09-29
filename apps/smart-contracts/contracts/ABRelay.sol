// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/* Openzeppelin Contract */
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/* Optimism Interface */
import { ICrossDomainMessenger } from "@eth-optimism/contracts/libraries/bridge/ICrossDomainMessenger.sol";

/* Custom Imports */
import { IABStream } from "./interfaces/IABStream.sol";
import { IABRegistry } from "./interfaces/IABRegistry.sol";

contract ABRelay is Ownable {
  // Addresses allowed to interact with the relay
  mapping(address => bool) private allowedSenders;

  // Optimism CrossDomainMessenger contract
  ICrossDomainMessenger internal messenger =
    ICrossDomainMessenger(0x4200000000000000000000000000000000000007);

  IABStream internal abStream;
  IABRegistry internal abRegistry;

  /*
   **************************************************************************
   *                             ONLY OWNER                                 *
   **************************************************************************
   */

  function grantAllowance(address _sender) external onlyOwner {
    allowedSenders[_sender] = true;
  }

  function revokeAllowance(address _sender) external onlyOwner {
    allowedSenders[_sender] = false;
  }

  function setABStream(address _abStream) external onlyOwner {
    abStream = IABStream(_abStream);
  }

  function setABRegistry(address _abRegistry) external onlyOwner {
    abRegistry = IABRegistry(_abRegistry);
  }

  /*
   **************************************************************************
   *                            ONLY ALLOWED                                *
   **************************************************************************
   */

  function transferredNFT(
    address _from,
    address _to,
    uint256 _dropId
  ) external onlyAllowed {
    abStream.updateStream(_from, _to);
    abRegistry.decrementUserBalance(_from, _dropId);
    abRegistry.incrementUserBalance(_to, _dropId);
  }

  function createdDrop() external onlyAllowed {}

  function updatedDrop() external onlyAllowed {}

  /*
   **************************************************************************
   *                              MODIFIERS                                 *
   **************************************************************************
   */

  modifier onlyAllowed() {
    require(
      msg.sender == address(messenger) &&
        allowedSenders[messenger.xDomainMessageSender()]
    );
    _;
  }
}
