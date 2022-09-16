// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.14;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { SuperTokenBase } from "./SuperToken/SuperTokenBase.sol";

contract SuperSoulbound is SuperTokenBase, AccessControl {
  bytes32 public constant MINTER = keccak256("MINTER");
  bytes32 public constant BURNER = keccak256("BURNER");

  address public store;

  error NOT_MINTER();
  error NOT_BURNER();
  error NOT_TRANSFERABLE();

  constructor(address _store) {
    store = _store;
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER, msg.sender);
    _grantRole(BURNER, _store);
  }

  function initialize(
    string memory name,
    string memory symbol,
    address factory
  ) external {
    _initialize(name, symbol, factory);
  }

  function mint(
    address _receiver,
    uint256 _amount,
    bytes memory _userData
  ) external onlyRole(MINTER) {
    _mint(_receiver, _amount, _userData);
  }

  function burn(
    address _from,
    uint256 _amount,
    bytes memory _userData
  ) external onlyRole(BURNER) {
    _burn(_from, _amount, _userData);
  }

  function approveStore(uint256 _amount) external {
    _approve(msg.sender, store, _amount);
  }

  function setStore(address _store) external onlyRole(DEFAULT_ADMIN_ROLE) {
    require(_store != address(0), "zero-address");
    store = _store;
  }
}
