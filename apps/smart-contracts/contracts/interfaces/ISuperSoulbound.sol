// SPDX-License-Identifier: AGPLv3
pragma solidity 0.8.16;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Superfluid compatible super soulbound token interface
 *
 * @author 0xPilou
 */
interface ISuperSoulbound {
  function initialize(
    IERC20 underlyingToken,
    uint8 underlyingDecimals,
    string calldata n,
    string calldata s
  ) external ;

  function proxiableUUID() external pure  returns (bytes32);

  function updateCode(address newAddress) external ;

  /**************************************************************************
   * ERC20 Token Info
   *************************************************************************/

  function name() external view  returns (string memory);

  function symbol() external view  returns (string memory);

  function decimals() external pure  returns (uint8);

  /**************************************************************************
   * ERC20 Implementations
   *************************************************************************/

  function totalSupply() external view  returns (uint256);

  function balanceOf(address account)
    external
    view
    
    returns (uint256 balance);

  function transfer(address recipient, uint256 amount)
    external
    
    returns (bool);

  function allowance(address account, address spender)
    external
    view
    
    returns (uint256);

  function approve(address spender, uint256 amount)
    external
    
    returns (bool);

  function transferFrom(
    address holder,
    address recipient,
    uint256 amount
  ) external  returns (bool);

  function increaseAllowance(address spender, uint256 addedValue)
    external
    
    returns (bool);

  function decreaseAllowance(address spender, uint256 subtractedValue)
    external
    
    returns (bool);

  /**************************************************************************
   * ERC-777 functions
   *************************************************************************/

  function granularity() external pure  returns (uint256);

  function send(
    address recipient,
    uint256 amount,
    bytes calldata data
  ) external ;

  function burn(uint256 amount, bytes calldata data) external ;

  function isOperatorFor(address operator, address tokenHolder)
    external
    view
    
    returns (bool);

  function authorizeOperator(address operator) external ;

  function revokeOperator(address operator) external ;

  function defaultOperators() external view  returns (address[] memory);

  function operatorSend(
    address sender,
    address recipient,
    uint256 amount,
    bytes calldata data,
    bytes calldata operatorData
  ) external ;

  function operatorBurn(
    address account,
    uint256 amount,
    bytes calldata data,
    bytes calldata operatorData
  ) external ;

  /**************************************************************************
   * SuperToken custom token functions
   *************************************************************************/

  function selfMint(
    address account,
    uint256 amount,
    bytes memory userData
  ) external ;

  function selfBurn(
    address account,
    uint256 amount,
    bytes memory userData
  ) external ;

  function selfApproveFor(
    address account,
    address spender,
    uint256 amount
  ) external ;

  function selfTransferFrom(
    address holder,
    address spender,
    address recipient,
    uint256 amount
  ) external ;

  /**************************************************************************
   * SuperToken extra functions
   *************************************************************************/

  function transferAll(address recipient) external ;

  /**************************************************************************
   * ERC20 wrapping
   *************************************************************************/

  /// @dev ISuperfluidGovernance.getUnderlyingToken implementation
  function getUnderlyingToken() external view  returns (address);

  /// @dev ISuperToken.upgrade implementation
  function upgrade(uint256 amount) external ;

  /// @dev ISuperToken.upgradeTo implementation
  function upgradeTo(
    address to,
    uint256 amount,
    bytes calldata data
  ) external ;

  /// @dev ISuperToken.downgrade implementation
  function downgrade(uint256 amount) external ;

  /**************************************************************************
   * Superfluid Batch Operations
   *************************************************************************/

  function operationApprove(
    address account,
    address spender,
    uint256 amount
  ) external ;

  function operationTransferFrom(
    address account,
    address spender,
    address recipient,
    uint256 amount
  ) external ;

  function operationUpgrade(address account, uint256 amount) external ;

  function operationDowngrade(address account, uint256 amount)
    external
    ;

  function setAllowedId(address receiver) external;
}
