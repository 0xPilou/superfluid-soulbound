// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

interface IABStream {
  function updateStream(
    address previousReceiver,
    address newReceiver,
    uint256 dropId
  ) external;

  function setBaseFlow(int96 _baseFlow, uint256 _dropId) external;

  function setABToken(address _ABToken) external;

  function getABToken() external view returns (address);

  function getABRelay() external view returns (address);

  function getFlow(address _receiver)
    external
    view
    returns (
      uint256 timestamp,
      int96 flowRate,
      uint256 deposit,
      uint256 owedDeposit
    );
}
