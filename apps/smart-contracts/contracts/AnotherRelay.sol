// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/* Openzeppelin Contract */
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/* Optimism Interface */
import { ICrossDomainMessenger } from "@eth-optimism/contracts/libraries/bridge/ICrossDomainMessenger.sol";

contract AnotherRelay is Ownable {
  // Addresses allowed to interact with the relay
  mapping(address => bool) private allowedSenders;

  // Optimism CrossDomainMessenger contract
  ICrossDomainMessenger internal messenger =
    ICrossDomainMessenger(0x4200000000000000000000000000000000000007);

  modifier onlyAllowed() {
    require(
      msg.sender == address(messenger) &&
        allowedSenders[messenger.xDomainMessageSender()]
    );
    _;
  }

  function grantAllowance(address _sender) external onlyOwner {
    allowedSenders[_sender] = true;
  }

  function revokeAllowance(address _sender) external onlyOwner {
    allowedSenders[_sender] = false;
  }

  function issuedNFT() external onlyAllowed {}

  function transferredNFT() external onlyAllowed {}

  function createdDrop() external onlyAllowed {}

  function updatedDrop() external onlyAllowed {}
}
