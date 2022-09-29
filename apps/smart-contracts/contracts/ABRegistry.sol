// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/* Openzeppelin Contract */
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/// @dev Thrown when the caller is not authorized to call the function
error FORBIDDEN();

/// @dev Thrown when the passed parameter is invalid
error INVALID_PARAMETER();

contract ABRegistry is Ownable {
  /// @dev Address of Anotherblock Relay (used to control the streams destination based on L1 messages)
  address internal AB_RELAY;

  mapping(address => mapping(uint256 => uint256)) private userBalancePerDrop;

  constructor(address _relay) {
    if (_relay == address(0)) revert INVALID_PARAMETER();
    AB_RELAY = _relay;
  }

  function incrementUserBalance(address _user, uint256 _dropId) external {
    if (msg.sender != AB_RELAY) revert FORBIDDEN();
    userBalancePerDrop[_user][_dropId] += 1;
  }

  function decrementUserBalance(address _user, uint256 _dropId) external {
    if (msg.sender != AB_RELAY) revert FORBIDDEN();
    userBalancePerDrop[_user][_dropId] -= 1;
  }

  function getUserBalancePerDrop(address _user, uint256 _dropId)
    external
    returns (uint256)
  {
    return userBalancePerDrop[_user][_dropId];
  }
}
