// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

interface IABRegistry {
  function updateBalance(
    address _from,
    address _to,
    uint256 _dropId
  ) external;

  function getUserBalancePerDrop(address _user, uint256 _dropId)
    external
    view
    returns (uint256);
}
