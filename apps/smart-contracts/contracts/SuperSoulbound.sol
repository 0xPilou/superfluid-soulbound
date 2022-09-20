// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.16;

import { UUPSProxiable } from "@superfluid-finance/ethereum-contracts/contracts/upgradability/UUPSProxiable.sol";
import { SuperfluidErrors } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/Definitions.sol";
import { ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import { ISuperfluid } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import { SuperfluidToken } from "@superfluid-finance/ethereum-contracts/contracts/superfluid/SuperfluidToken.sol";
import { ERC777Helper } from "@superfluid-finance/ethereum-contracts/contracts/libs/ERC777Helper.sol";
import { ISuperTokenFactory } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

contract SuperSoulbound is
  UUPSProxiable,
  SuperfluidToken,
  AccessControl,
  ISuperToken
{
  address public store;

  bytes32 public constant BURNER = keccak256("BURNER");
  bytes32 public constant MINTER = keccak256("MINTER");

  /// @dev TokenInfo Name property
  string internal name_;

  /// @dev TokenInfo Symbol property
  string internal symbol_;

  /// @dev The underlying ERC20 token
  IERC20 internal underlyingToken_;

  /// @dev Decimals of the underlying token
  uint8 internal underlyingDecimals_;

  uint8 private constant STANDARD_DECIMALS_ = 18;

  /// @dev ERC777 operators support data
  ERC777Helper.Operators internal operators_;

  error NOT_TRANSFERABLE();
  error PURE_SUPERTOKEN();
  error ONLY_SELF();

  constructor(ISuperfluid host, address _store) SuperfluidToken(host) {
    store = _store;
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER, msg.sender);
    _grantRole(BURNER, _store);
  }

  function initialize(
    IERC20 _underlyingToken,
    uint8 _underlyingDecimals,
    string calldata _name,
    string calldata _symbol
  ) external override initializer {
    underlyingToken_ = _underlyingToken;
    underlyingDecimals_ = _underlyingDecimals;
    name_ = _name;
    symbol_ = _symbol;

    // register interfaces
    ERC777Helper.register(address(this));

    // help tools like explorers detect the token contract
    emit Transfer(address(0), address(0), 0);
  }

  function mint(
    address _receiver,
    uint256 _amount,
    bytes memory _userData
  ) external onlyRole(MINTER) {
    _mint(_receiver, _amount);
  }

  function burn(
    address _from,
    uint256 _amount,
    bytes memory _userData
  ) external onlyRole(BURNER) {
    _burn(_from, _amount);
  }

  function proxiableUUID() public pure override returns (bytes32) {
    return keccak256("org.anoblo.SuperSoulbound.implementation");
  }

  function updateCode(address newAddress) external override {
    if (msg.sender != address(_host))
      revert SuperfluidErrors.ONLY_HOST(SuperfluidErrors.SUPER_TOKEN_ONLY_HOST);
    UUPSProxiable._updateCodeAddress(newAddress);
  }

  function name() external view override returns (string memory) {
    return name_;
  }

  function symbol() external view override returns (string memory) {
    return symbol_;
  }

  function decimals() external pure override returns (uint8) {
    return STANDARD_DECIMALS_;
  }

  function totalSupply() public view override returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address account)
    public
    view
    override
    returns (uint256 balance)
  {
    (int256 availableBalance, , , ) = super.realtimeBalanceOfNow(account);
    return availableBalance < 0 ? 0 : uint256(availableBalance);
  }

  function transfer(address _to, uint256 _amount)
    public
    override
    returns (bool)
  {
    revert NOT_TRANSFERABLE();
  }

  function allowance(address account, address spender)
    public
    view
    override
    returns (uint256)
  {
    return 0;
  }

  function approve(address spender, uint256 amount)
    public
    override
    returns (bool)
  {
    revert NOT_TRANSFERABLE();
    return false;
  }

  function transferFrom(
    address _from,
    address _to,
    uint256 _amount
  ) public override returns (bool) {
    revert NOT_TRANSFERABLE();
  }

  function increaseAllowance(address spender, uint256 addedValue)
    public
    override
    returns (bool)
  {
    revert NOT_TRANSFERABLE();
    return false;
  }

  function decreaseAllowance(address spender, uint256 subtractedValue)
    public
    override
    returns (bool)
  {
    revert NOT_TRANSFERABLE();
    return false;
  }

  function granularity() external pure override returns (uint256) {
    return 1;
  }

  function send(
    address recipient,
    uint256 amount,
    bytes calldata data
  ) external override {
    revert NOT_TRANSFERABLE();
  }

  function burn(uint256 amount, bytes calldata data) external override {
    revert NOT_TRANSFERABLE();
  }

  function isOperatorFor(address _operator, address _tokenHolder)
    external
    view
    override
    returns (bool)
  {
    return false;
  }

  function authorizeOperator(address _operator) external override {
    revert NOT_TRANSFERABLE();
  }

  function revokeOperator(address _operator) external override {
    revert NOT_TRANSFERABLE();
  }

  function defaultOperators()
    external
    view
    override
    returns (address[] memory)
  {
    return ERC777Helper.defaultOperators(operators_);
  }

  function operatorSend(
    address _sender,
    address _recipient,
    uint256 _amount,
    bytes calldata _data,
    bytes calldata _operatorData
  ) external override {
    revert NOT_TRANSFERABLE();
  }

  function operatorBurn(
    address _account,
    uint256 _amount,
    bytes calldata _data,
    bytes calldata _operatorData
  ) external override {
    revert NOT_TRANSFERABLE();
  }

  function selfMint(
    address account,
    uint256 amount,
    bytes memory userData
  ) external override onlySelf {
    revert NOT_TRANSFERABLE();
  }

  function selfBurn(
    address account,
    uint256 amount,
    bytes memory userData
  ) external override onlySelf {
    revert NOT_TRANSFERABLE();
  }

  function selfApproveFor(
    address account,
    address spender,
    uint256 amount
  ) external override onlySelf {
    revert NOT_TRANSFERABLE();
  }

  function selfTransferFrom(
    address holder,
    address spender,
    address recipient,
    uint256 amount
  ) external override onlySelf {
    revert NOT_TRANSFERABLE();
  }

  function transferAll(address recipient) external override {
    revert NOT_TRANSFERABLE();
  }

  /// @dev ISuperfluidGovernance.getUnderlyingToken implementation
  function getUnderlyingToken() external view override returns (address) {
    return address(underlyingToken_);
  }

  /// @dev ISuperToken.upgrade implementation
  function upgrade(uint256 amount) external override {
    revert PURE_SUPERTOKEN();
  }

  /// @dev ISuperToken.upgradeTo implementation
  function upgradeTo(
    address to,
    uint256 amount,
    bytes calldata data
  ) external override {
    revert PURE_SUPERTOKEN();
  }

  /// @dev ISuperToken.downgrade implementation
  function downgrade(uint256 amount) external override {
    revert PURE_SUPERTOKEN();
  }

  function operationApprove(
    address account,
    address spender,
    uint256 amount
  ) external override onlyHost {
    revert NOT_TRANSFERABLE();
  }

  function operationTransferFrom(
    address account,
    address spender,
    address recipient,
    uint256 amount
  ) external override onlyHost {
    revert NOT_TRANSFERABLE();
  }

  function operationUpgrade(address account, uint256 amount)
    external
    override
    onlyHost
  {
    revert PURE_SUPERTOKEN();
  }

  function operationDowngrade(address account, uint256 amount)
    external
    override
    onlyHost
  {
    revert PURE_SUPERTOKEN();
  }

  function setStore(address _store) external {
    require(_store != address(0), "zero-address");
    store = _store;
  }

  modifier onlySelf() {
    if (msg.sender != address(this)) revert ONLY_SELF();
    _;
  }
}
