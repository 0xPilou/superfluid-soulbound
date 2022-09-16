//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Soulbound is ERC20, AccessControl {
  bytes32 public constant MINTER = keccak256("MINTER");
  bytes32 public constant BURNER = keccak256("BURNER");

  error NOT_MINTER();
  error NOT_BURNER();
  error NOT_TRANSFERABLE();

  constructor() ERC20("Soulbound Token", "SBT") {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function mint(address _to, uint256 _amount) external onlyRole(MINTER) {
    _mint(_to, _amount);
  }

  function burn(address _from, uint256 _amount) external onlyRole(BURNER) {
    _burn(_from, _amount);
  }

  function transfer(address _to, uint256 _amount)
    public
    override
    returns (bool)
  {
    revert NOT_TRANSFERABLE();
  }

  function transferFrom(
    address _from,
    address _to,
    uint256 _amount
  ) public override returns (bool) {
    revert NOT_TRANSFERABLE();
  }
}
