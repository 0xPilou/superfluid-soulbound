// SPDX-License-Identifier: AGPLv3
pragma solidity 0.8.16;

/* Superfluid Interfaces */
import { ISuperfluid, ISuperfluidGovernance, ISuperToken, ISuperAgreement, IERC20, IERC777, TokenInfo } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import { SuperfluidErrors } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/Definitions.sol";

/* Superfluid Contracts */
import { UUPSProxiable } from "@superfluid-finance/ethereum-contracts/contracts/upgradability/UUPSProxiable.sol";

/* Superfluid Libs */
import { ERC777Helper } from "@superfluid-finance/ethereum-contracts/contracts/libs/ERC777Helper.sol";

/* Openzeppelin Contracts */
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { SafeCast } from "@openzeppelin/contracts/utils/math/SafeCast.sol";
import { IERC777Recipient } from "@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol";
import { IERC777Sender } from "@openzeppelin/contracts/token/ERC777/IERC777Sender.sol";
import { Address } from "@openzeppelin/contracts/utils/Address.sol";

/* Custom Imports */
import { ISuperfluidToken, SuperfluidSoulbound } from "./SuperfluidSoulbound.sol";

/**
 * @title Superfluid compatible super soulbound token implementation
 *
 * @author 0xPilou
 */
contract SuperSoulbound is UUPSProxiable, SuperfluidSoulbound, ISuperToken {
  using SafeMath for uint256;
  using SafeCast for uint256;
  using Address for address;
  using ERC777Helper for ERC777Helper.Operators;
  using SafeERC20 for IERC20;

  error NOT_TRANSFERABLE();
  error NOT_APPROVABLE();
  error NOT_BURNABLE();
  error NOT_MINTABLE();

  uint8 private constant _STANDARD_DECIMALS = 18;

  /* WARNING: NEVER RE-ORDER VARIABLES! Including the base contracts.
       Always double-check that new
       variables are added APPEND-ONLY. Re-ordering variables can
       permanently BREAK the deployed proxy contract. */

  /// @dev The underlying ERC20 token
  IERC20 internal _underlyingToken;

  /// @dev Decimals of the underlying token
  uint8 internal _underlyingDecimals;

  /// @dev TokenInfo Name property
  string internal _name;

  /// @dev TokenInfo Symbol property
  string internal _symbol;

  /// @dev ERC20 Allowances Storage
  mapping(address => mapping(address => uint256)) internal _allowances;

  /// @dev ERC777 operators support data
  ERC777Helper.Operators internal _operators;

  // NOTE: for future compatibility, these are reserved solidity slots
  // The sub-class of SuperToken solidity slot will start after _reserve22
  uint256 internal _reserve22;
  uint256 private _reserve23;
  uint256 private _reserve24;
  uint256 private _reserve25;
  uint256 private _reserve26;
  uint256 private _reserve27;
  uint256 private _reserve28;
  uint256 private _reserve29;
  uint256 private _reserve30;
  uint256 internal _reserve31;

  constructor(address host, address cfa, address cashflow)
    SuperfluidSoulbound(ISuperfluid(host), cfa, cashflow)
  {}

  function initialize(
    IERC20 underlyingToken,
    uint8 underlyingDecimals,
    string calldata n,
    string calldata s
  ) external override initializer {
    _underlyingToken = underlyingToken;
    _underlyingDecimals = underlyingDecimals;

    _name = n;
    _symbol = s;

    // register interfaces
    ERC777Helper.register(address(this));

    // help tools like explorers detect the token contract
    emit Transfer(address(0), address(0), 0);
  }

  function proxiableUUID() public pure override returns (bytes32) {
    return
      keccak256("org.superfluid-finance.contracts.SuperToken.implementation");
  }

  function updateCode(address newAddress) external override {
    if (msg.sender != address(_host))
      revert SuperfluidErrors.ONLY_HOST(SuperfluidErrors.SUPER_TOKEN_ONLY_HOST);
    UUPSProxiable._updateCodeAddress(newAddress);
  }

  /**************************************************************************
   * ERC20 Token Info
   *************************************************************************/

  function name() external view override returns (string memory) {
    return _name;
  }

  function symbol() external view override returns (string memory) {
    return _symbol;
  }

  function decimals() external pure override returns (uint8) {
    return _STANDARD_DECIMALS;
  }

  /**************************************************************************
   * (private) Token Logics
   *************************************************************************/

  function _mint(
    address operator,
    address account,
    uint256 amount,
    bool requireReceptionAck,
    bytes memory userData,
    bytes memory operatorData
  ) internal {
    if (account == address(0)) {
      revert SuperfluidErrors.ZERO_ADDRESS(
        SuperfluidErrors.SUPER_TOKEN_MINT_TO_ZERO_ADDRESS
      );
    }

    SuperfluidSoulbound._mint(account, amount);

    _callTokensReceived(
      operator,
      address(0),
      account,
      amount,
      userData,
      operatorData,
      requireReceptionAck
    );

    emit Minted(operator, account, amount, userData, operatorData);
    emit Transfer(address(0), account, amount);
  }

  /**
   * @dev Burn tokens
   * @param from address token holder address
   * @param amount uint256 amount of tokens to burn
   * @param userData bytes extra information provided by the token holder
   * @param operatorData bytes extra information provided by the operator (if any)
   */
  function _burn(
    address operator,
    address from,
    uint256 amount,
    bytes memory userData,
    bytes memory operatorData
  ) internal {
    if (from == address(0)) {
      revert SuperfluidErrors.ZERO_ADDRESS(
        SuperfluidErrors.SUPER_TOKEN_BURN_FROM_ZERO_ADDRESS
      );
    }

    _callTokensToSend(
      operator,
      from,
      address(0),
      amount,
      userData,
      operatorData
    );

    SuperfluidSoulbound._burn(from, amount);

    emit Burned(operator, from, amount, userData, operatorData);
    emit Transfer(from, address(0), amount);
  }

  /**
   * @dev Call from.tokensToSend() if the interface is registered
   * @param operator address operator requesting the transfer
   * @param from address token holder address
   * @param to address recipient address
   * @param amount uint256 amount of tokens to transfer
   * @param userData bytes extra information provided by the token holder (if any)
   * @param operatorData bytes extra information provided by the operator (if any)
   */
  function _callTokensToSend(
    address operator,
    address from,
    address to,
    uint256 amount,
    bytes memory userData,
    bytes memory operatorData
  ) private {
    address implementer = ERC777Helper
      ._ERC1820_REGISTRY
      .getInterfaceImplementer(
        from,
        ERC777Helper._TOKENS_SENDER_INTERFACE_HASH
      );
    if (implementer != address(0)) {
      IERC777Sender(implementer).tokensToSend(
        operator,
        from,
        to,
        amount,
        userData,
        operatorData
      );
    }
  }

  /**
   * @dev Call to.tokensReceived() if the interface is registered. Reverts if the recipient is a contract but
   * tokensReceived() was not registered for the recipient
   * @param operator address operator requesting the transfer
   * @param from address token holder address
   * @param to address recipient address
   * @param amount uint256 amount of tokens to transfer
   * @param userData bytes extra information provided by the token holder (if any)
   * @param operatorData bytes extra information provided by the operator (if any)
   * @param requireReceptionAck if true, contract recipients are required to implement ERC777TokensRecipient
   */
  function _callTokensReceived(
    address operator,
    address from,
    address to,
    uint256 amount,
    bytes memory userData,
    bytes memory operatorData,
    bool requireReceptionAck
  ) private {
    address implementer = ERC777Helper
      ._ERC1820_REGISTRY
      .getInterfaceImplementer(
        to,
        ERC777Helper._TOKENS_RECIPIENT_INTERFACE_HASH
      );
    if (implementer != address(0)) {
      IERC777Recipient(implementer).tokensReceived(
        operator,
        from,
        to,
        amount,
        userData,
        operatorData
      );
    } else if (requireReceptionAck) {
      if (to.isContract()) revert SUPER_TOKEN_NOT_ERC777_TOKENS_RECIPIENT();
    }
  }

  /**************************************************************************
   * ERC20 Implementations
   *************************************************************************/

  function totalSupply() public view override returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address account)
    public
    view
    override
    returns (uint256 balance)
  {
    // solhint-disable-next-line not-rely-on-time
    (int256 availableBalance, , , ) = super.realtimeBalanceOfNow(account);
    return availableBalance < 0 ? 0 : uint256(availableBalance);
  }

  function transfer(address recipient, uint256 amount)
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
    revert NOT_APPROVABLE();
  }

  function transferFrom(
    address holder,
    address recipient,
    uint256 amount
  ) public override returns (bool) {
    revert NOT_TRANSFERABLE();
  }

  function increaseAllowance(address spender, uint256 addedValue)
    public
    override
    returns (bool)
  {
    revert NOT_APPROVABLE();
  }

  function decreaseAllowance(address spender, uint256 subtractedValue)
    public
    override
    returns (bool)
  {
    revert NOT_APPROVABLE();
  }

  /**************************************************************************
   * ERC-777 functions
   *************************************************************************/

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
    revert NOT_BURNABLE();
  }

  function isOperatorFor(address operator, address tokenHolder)
    external
    view
    override
    returns (bool)
  {
    return _operators.isOperatorFor(operator, tokenHolder);
  }

  function authorizeOperator(address operator) external override {
    address holder = msg.sender;
    _operators.authorizeOperator(holder, operator);
    emit AuthorizedOperator(operator, holder);
  }

  function revokeOperator(address operator) external override {
    address holder = msg.sender;
    _operators.revokeOperator(holder, operator);
    emit RevokedOperator(operator, holder);
  }

  function defaultOperators()
    external
    view
    override
    returns (address[] memory)
  {
    return ERC777Helper.defaultOperators(_operators);
  }

  function operatorSend(
    address sender,
    address recipient,
    uint256 amount,
    bytes calldata data,
    bytes calldata operatorData
  ) external override {
    revert NOT_TRANSFERABLE();
  }

  function operatorBurn(
    address account,
    uint256 amount,
    bytes calldata data,
    bytes calldata operatorData
  ) external override {
    revert NOT_BURNABLE();
  }

  /**************************************************************************
   * SuperToken custom token functions
   *************************************************************************/

  function selfMint(
    address account,
    uint256 amount,
    bytes memory userData
  ) external override onlySelf {
    revert NOT_MINTABLE();
  }

  function selfBurn(
    address account,
    uint256 amount,
    bytes memory userData
  ) external override onlySelf {
    revert NOT_BURNABLE();
  }

  function selfApproveFor(
    address account,
    address spender,
    uint256 amount
  ) external override onlySelf {
    revert NOT_APPROVABLE();
  }

  function selfTransferFrom(
    address holder,
    address spender,
    address recipient,
    uint256 amount
  ) external override onlySelf {
    revert NOT_TRANSFERABLE();
  }

  /**************************************************************************
   * SuperToken extra functions
   *************************************************************************/

  function transferAll(address recipient) external override {
    revert NOT_TRANSFERABLE();
  }

  /**************************************************************************
   * ERC20 wrapping
   *************************************************************************/

  /// @dev ISuperfluidGovernance.getUnderlyingToken implementation
  function getUnderlyingToken() external view override returns (address) {
    return address(_underlyingToken);
  }

  /// @dev ISuperToken.upgrade implementation
  function upgrade(uint256 amount) external override {
    _upgrade(msg.sender, msg.sender, msg.sender, amount, "", "");
  }

  /// @dev ISuperToken.upgradeTo implementation
  function upgradeTo(
    address to,
    uint256 amount,
    bytes calldata data
  ) external override {
    _upgrade(msg.sender, msg.sender, to, amount, "", data);
  }

  /// @dev ISuperToken.downgrade implementation
  function downgrade(uint256 amount) external override {
    _downgrade(msg.sender, msg.sender, amount, "", "");
  }

  function _upgrade(
    address operator,
    address account,
    address to,
    uint256 amount,
    bytes memory userData,
    bytes memory operatorData
  ) private {
    if (address(_underlyingToken) == address(0))
      revert SUPER_TOKEN_NO_UNDERLYING_TOKEN();

    (uint256 underlyingAmount, uint256 adjustedAmount) = _toUnderlyingAmount(
      amount
    );

    uint256 amountBefore = _underlyingToken.balanceOf(address(this));
    _underlyingToken.safeTransferFrom(account, address(this), underlyingAmount);
    uint256 amountAfter = _underlyingToken.balanceOf(address(this));
    uint256 actualUpgradedAmount = amountAfter - amountBefore;
    if (underlyingAmount != actualUpgradedAmount)
      revert SUPER_TOKEN_INFLATIONARY_DEFLATIONARY_NOT_SUPPORTED();

    _mint(
      operator,
      to,
      adjustedAmount,
      // if `to` is diffferent from `account`, we requireReceptionAck
      account != to,
      userData,
      operatorData
    );

    emit TokenUpgraded(to, adjustedAmount);
  }

  function _downgrade(
    address operator,
    address account,
    uint256 amount,
    bytes memory data,
    bytes memory operatorData
  ) private {
    if (address(_underlyingToken) == address(0))
      revert SUPER_TOKEN_NO_UNDERLYING_TOKEN();

    (uint256 underlyingAmount, uint256 adjustedAmount) = _toUnderlyingAmount(
      amount
    );

    // _burn will check the (actual) amount availability again
    _burn(operator, account, adjustedAmount, data, operatorData);

    uint256 amountBefore = _underlyingToken.balanceOf(address(this));
    _underlyingToken.safeTransfer(account, underlyingAmount);
    uint256 amountAfter = _underlyingToken.balanceOf(address(this));
    uint256 actualDowngradedAmount = amountBefore - amountAfter;
    if (underlyingAmount != actualDowngradedAmount)
      revert SUPER_TOKEN_INFLATIONARY_DEFLATIONARY_NOT_SUPPORTED();

    emit TokenDowngraded(account, adjustedAmount);
  }

  /**
   * @dev Handle decimal differences between underlying token and super token
   */
  function _toUnderlyingAmount(uint256 amount)
    private
    view
    returns (uint256 underlyingAmount, uint256 adjustedAmount)
  {
    uint256 factor;
    if (_underlyingDecimals < _STANDARD_DECIMALS) {
      // if underlying has less decimals
      // one can upgrade less "granualar" amount of tokens
      factor = 10**(_STANDARD_DECIMALS - _underlyingDecimals);
      underlyingAmount = amount / factor;
      // remove precision errors
      adjustedAmount = underlyingAmount * factor;
    } else if (_underlyingDecimals > _STANDARD_DECIMALS) {
      // if underlying has more decimals
      // one can upgrade more "granualar" amount of tokens
      factor = 10**(_underlyingDecimals - _STANDARD_DECIMALS);
      underlyingAmount = amount * factor;
      adjustedAmount = amount;
    } else {
      underlyingAmount = adjustedAmount = amount;
    }
  }

  /**************************************************************************
   * Superfluid Batch Operations
   *************************************************************************/

  function operationApprove(
    address account,
    address spender,
    uint256 amount
  ) external override onlyHost {
    revert NOT_APPROVABLE();
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
    _upgrade(msg.sender, account, account, amount, "", "");
  }

  function operationDowngrade(address account, uint256 amount)
    external
    override
    onlyHost
  {
    _downgrade(msg.sender, account, amount, "", "");
  }

  /**************************************************************************
   * Modifiers
   *************************************************************************/

  modifier onlySelf() {
    if (msg.sender != address(this)) revert SUPER_TOKEN_ONLY_SELF();
    _;
  }
}
