// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IERC721AB {
  /**
   * @notice
   *  Update anotherblock address
   *  Revoke the AB_ROLE from the previous anotherblock address
   *  Grant the AB_ROLE role to the new address
   *  Only DEFAULT_ADMIN_ROLE can perform this operation
   *
   * @param _anotherblock : new anotherblock address
   */
  function setDropManager(address _anotherblock) external;

  function dropIdPerToken(uint256 _tokenId) external returns (uint256);

  function transferFrom(
    address _from,
    address _to,
    uint256 _tokenId
  ) external;
}
