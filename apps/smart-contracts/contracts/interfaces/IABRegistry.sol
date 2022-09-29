// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

interface IABRegistry {
  function incrementUserBalance(address _user, uint256 _dropId) external;

  function decrementUserBalance(address _user, uint256 _dropId) external;

  function getUserBalancePerDrop(address _user, uint256 _dropId)
    external
    returns (uint256);
}
