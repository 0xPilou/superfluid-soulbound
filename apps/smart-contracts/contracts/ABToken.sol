// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.16;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { SuperSoulbound } from "./SuperSoulbound.sol";

contract ABToken is SuperSoulbound, AccessControl {
  bytes32 public constant MINTER = keccak256("MINTER");
  bytes32 public constant BURNER = keccak256("BURNER");

  address public store;

  constructor(
    address _store,
    address _host,
    address _admin
  ) SuperSoulbound(_host, _admin) {
    store = _store;
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER, msg.sender);
    _grantRole(BURNER, _store);
  }

  function mint(address _receiver, uint256 _amount) external onlyRole(MINTER) {
    _mint(msg.sender, _receiver, _amount, false, "0x", new bytes(0));
  }

  function burn(address _from, uint256 _amount) external onlyRole(BURNER) {
    _burn(msg.sender, _from, _amount, "0x", new bytes(0));
  }

  function setStore(address _store) external onlyRole(DEFAULT_ADMIN_ROLE) {
    require(_store != address(0), "zero-address");
    store = _store;
    _grantRole(BURNER, _store);
  }
}
