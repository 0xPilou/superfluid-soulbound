// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.14;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { SuperTokenBase } from "./SuperToken/SuperTokenBase.sol";

contract SuperSoulbound is SuperTokenBase, AccessControl {
  bytes32 public constant MINTER = keccak256("MINTER");
  bytes32 public constant BURNER = keccak256("BURNER");

  error NOT_MINTER();
  error NOT_BURNER();
  error NOT_TRANSFERABLE();

  constructor() {   
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  /// @notice Initializer, used AFTER factory upgrade
  /// @param name Name of Super Token
  /// @param symbol Symbol of Super Token
  /// @param factory Super token factory for initialization
  function initialize(
    string memory name,
    string memory symbol,
    address factory
  ) external {
    _initialize(name, symbol, factory);
  }

  /// @notice Mints tokens, only the owner may do this
  /// @param receiver Receiver of minted tokens
  /// @param amount Amount to mint
  function mint(
    address receiver,
    uint256 amount,
    bytes memory userData
  ) external onlyRole(MINTER) {
    _mint(receiver, amount, userData);
  }

  /// @notice Burns from message sender
  /// @param amount Amount to burn
  function burn(uint256 amount, bytes memory userData)
    external
    onlyRole(BURNER)
  {
    _burn(msg.sender, amount, userData);
  }
}
