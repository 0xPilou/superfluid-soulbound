// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.16;

interface IABToken {
  function mint(address _receiver, uint256 _amount) external;

  function burn(address _from, uint256 _amount) external;

  function setStore(address _store) external;
}
