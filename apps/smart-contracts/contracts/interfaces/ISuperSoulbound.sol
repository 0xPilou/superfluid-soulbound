// SPDX-License-Identifier: AGPLv3
pragma solidity 0.8.16;

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
  ) external override;

  function proxiableUUID() public pure override returns (bytes32);

  function updateCode(address newAddress) external override;

  /**************************************************************************
   * ERC20 Token Info
   *************************************************************************/

  function name() external view override returns (string memory);

  function symbol() external view override returns (string memory);

  function decimals() external pure override returns (uint8);

  /**************************************************************************
   * ERC20 Implementations
   *************************************************************************/

  function totalSupply() public view override returns (uint256);

  function balanceOf(address account)
    public
    view
    override
    returns (uint256 balance);

  function transfer(address recipient, uint256 amount)
    public
    override
    returns (bool);

  function allowance(address account, address spender)
    public
    view
    override
    returns (uint256);

  function approve(address spender, uint256 amount)
    public
    override
    returns (bool);

  function transferFrom(
    address holder,
    address recipient,
    uint256 amount
  ) public override returns (bool);

  function increaseAllowance(address spender, uint256 addedValue)
    public
    override
    returns (bool);

  function decreaseAllowance(address spender, uint256 subtractedValue)
    public
    override
    returns (bool);

  /**************************************************************************
   * ERC-777 functions
   *************************************************************************/

  function granularity() external pure override returns (uint256);

  function send(
    address recipient,
    uint256 amount,
    bytes calldata data
  ) external override;

  function burn(uint256 amount, bytes calldata data) external override;

  function isOperatorFor(address operator, address tokenHolder)
    external
    view
    override
    returns (bool);

  function authorizeOperator(address operator) external override;

  function revokeOperator(address operator) external override;

  function defaultOperators() external view override returns (address[] memory);

  function operatorSend(
    address sender,
    address recipient,
    uint256 amount,
    bytes calldata data,
    bytes calldata operatorData
  ) external override;

  function operatorBurn(
    address account,
    uint256 amount,
    bytes calldata data,
    bytes calldata operatorData
  ) external override;

  /**************************************************************************
   * SuperToken custom token functions
   *************************************************************************/

  function selfMint(
    address account,
    uint256 amount,
    bytes memory userData
  ) external override;

  function selfBurn(
    address account,
    uint256 amount,
    bytes memory userData
  ) external override;

  function selfApproveFor(
    address account,
    address spender,
    uint256 amount
  ) external override;

  function selfTransferFrom(
    address holder,
    address spender,
    address recipient,
    uint256 amount
  ) external override;

  /**************************************************************************
   * SuperToken extra functions
   *************************************************************************/

  function transferAll(address recipient) external override;

  /**************************************************************************
   * ERC20 wrapping
   *************************************************************************/

  /// @dev ISuperfluidGovernance.getUnderlyingToken implementation
  function getUnderlyingToken() external view override returns (address);

  /// @dev ISuperToken.upgrade implementation
  function upgrade(uint256 amount) external override;

  /// @dev ISuperToken.upgradeTo implementation
  function upgradeTo(
    address to,
    uint256 amount,
    bytes calldata data
  ) external override;

  /// @dev ISuperToken.downgrade implementation
  function downgrade(uint256 amount) external override;

  /**************************************************************************
   * Superfluid Batch Operations
   *************************************************************************/

  function operationApprove(
    address account,
    address spender,
    uint256 amount
  ) external override;

  function operationTransferFrom(
    address account,
    address spender,
    address recipient,
    uint256 amount
  ) external override;

  function operationUpgrade(address account, uint256 amount) external override;

  function operationDowngrade(address account, uint256 amount)
    external
    override;
}
