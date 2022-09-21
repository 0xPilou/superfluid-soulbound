// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.14;

interface ISuperSoulbound {
  /// @notice Mints tokens, only the owner may do this
  /// @param receiver Receiver of minted tokens
  /// @param amount Amount to mint
  function mint(
    address receiver,
    uint256 amount,
    bytes memory userData
  ) external;

  /// @notice Burns from message sender
  /// @param amount Amount to burn
  function burn(
    address _from,
    uint256 amount,
    bytes memory userData
  ) external;

  function setStore(address _store) external;
}
