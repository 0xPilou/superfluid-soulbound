// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract MockMessenger {
  address public lastTarget;
  bytes public lastMessage;
  uint32 public lastGasLimit;

  address public lastCaller;

  function xDomainMessageSender() external view returns (address) {
    return lastCaller;
  }

  function sendMessage(
    address _target,
    bytes memory _message,
    uint32 _gasLimit
  ) external {
    lastCaller = msg.sender;
    lastTarget = _target;
    lastMessage = _message;
    lastGasLimit = _gasLimit;
  }

  function setLastCaller(address _caller) external {
    lastCaller = _caller;
  }
}
