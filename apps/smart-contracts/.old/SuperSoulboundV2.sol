// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import { UUPSProxiable } from "@superfluid-finance/ethereum-contracts/contracts/upgradability/UUPSProxiable.sol";
import { SuperfluidErrors } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/Definitions.sol";
import { ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import { ISuperfluid } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import { ISuperAgreement } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperAgreement.sol";
import { ISuperfluidToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol";
import { ISuperfluidGovernance } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidGovernance.sol";

import { ERC777Helper } from "@superfluid-finance/ethereum-contracts/contracts/libs/ERC777Helper.sol";
import { FixedSizeData } from "@superfluid-finance/ethereum-contracts/contracts/libs/FixedSizeData.sol";
import { EventsEmitter } from "@superfluid-finance/ethereum-contracts/contracts/libs/EventsEmitter.sol";

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { SafeCast } from "@openzeppelin/contracts/utils/math/SafeCast.sol";

contract SuperSoulboundV2 is ISuperToken, UUPSProxiable, AccessControl {
  using SafeCast for uint256;
  using SafeCast for int256;

  address public store;

  bytes32 private constant _REWARD_ADDRESS_CONFIG_KEY =
    keccak256("org.superfluid-finance.superfluid.rewardAddress");

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

  /// @dev Shared Settled balance for the account
  mapping(address => int256) internal sharedSettledBalances_;

  /// @dev Active agreement bitmap
  mapping(address => uint256) internal inactiveAgreementBitmap_;

  /// @dev Superfluid contract
  ISuperfluid internal immutable host_;

  /// @dev Total supply
  uint256 internal totalSupply_;

  error NOT_TRANSFERABLE();
  error PURE_SUPERTOKEN();
  error ONLY_SELF();

  constructor(address host, address _store) {
    store = _store;
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(MINTER, msg.sender);
    _grantRole(BURNER, _store);
    host_ = ISuperfluid(host);
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

  /// @dev ISuperfluidToken.getHost implementation
  function getHost() external view override returns (address host) {
    return address(host_);
  }

  /// @dev ISuperfluidToken.realtimeBalanceOf implementation
  function realtimeBalanceOf(address account, uint256 timestamp)
    public
    view
    override
    returns (
      int256 availableBalance,
      uint256 deposit,
      uint256 owedDeposit
    )
  {
    availableBalance = sharedSettledBalances_[account];
    ISuperAgreement[] memory activeAgreements = getAccountActiveAgreements(
      account
    );
    for (uint256 i = 0; i < activeAgreements.length; ++i) {
      (
        int256 agreementDynamicBalance,
        uint256 agreementDeposit,
        uint256 agreementOwedDeposit
      ) = activeAgreements[i].realtimeBalanceOf(this, account, timestamp);
      deposit = deposit + agreementDeposit;
      owedDeposit = owedDeposit + agreementOwedDeposit;
      // 1. Available Balance = Dynamic Balance - Max(0, Deposit - OwedDeposit)
      // 2. Deposit should not be shared between agreements
      availableBalance =
        availableBalance +
        agreementDynamicBalance -
        (
          agreementDeposit > agreementOwedDeposit
            ? (agreementDeposit - agreementOwedDeposit)
            : 0
        ).toInt256();
    }
  }

  /// @dev ISuperfluidToken.realtimeBalanceOfNow implementation
  function realtimeBalanceOfNow(address account)
    public
    view
    override
    returns (
      int256 availableBalance,
      uint256 deposit,
      uint256 owedDeposit,
      uint256 timestamp
    )
  {
    timestamp = host_.getNow();
    (availableBalance, deposit, owedDeposit) = realtimeBalanceOf(
      account,
      timestamp
    );
  }

  function isAccountCritical(address account, uint256 timestamp)
    public
    view
    override
    returns (bool isCritical)
  {
    (int256 availableBalance, , ) = realtimeBalanceOf(account, timestamp);
    return availableBalance < 0;
  }

  function isAccountCriticalNow(address account)
    external
    view
    override
    returns (bool isCritical)
  {
    return isAccountCritical(account, host_.getNow());
  }

  function isAccountSolvent(address account, uint256 timestamp)
    public
    view
    override
    returns (bool isSolvent)
  {
    (
      int256 availableBalance,
      uint256 deposit,
      uint256 owedDeposit
    ) = realtimeBalanceOf(account, timestamp);
    // Available Balance = Realtime Balance - Max(0, Deposit - OwedDeposit)
    int256 realtimeBalance = availableBalance +
      (deposit > owedDeposit ? (deposit - owedDeposit) : 0).toInt256();
    return realtimeBalance >= 0;
  }

  function isAccountSolventNow(address account)
    external
    view
    override
    returns (bool isSolvent)
  {
    return isAccountSolvent(account, host_.getNow());
  }

  /// @dev ISuperfluidToken.getAccountActiveAgreements implementation
  function getAccountActiveAgreements(address account)
    public
    view
    override
    returns (ISuperAgreement[] memory)
  {
    return host_.mapAgreementClasses(~inactiveAgreementBitmap_[account]);
  }

  /// @dev ISuperfluidToken.createAgreement implementation
  function createAgreement(bytes32 id, bytes32[] calldata data)
    external
    override
  {
    address agreementClass = msg.sender;
    bytes32 slot = keccak256(abi.encode("AgreementData", agreementClass, id));
    if (FixedSizeData.hasData(slot, data.length)) {
      revert SuperfluidErrors.ALREADY_EXISTS(
        SuperfluidErrors.SF_TOKEN_AGREEMENT_ALREADY_EXISTS
      );
    }
    FixedSizeData.storeData(slot, data);
    emit AgreementCreated(agreementClass, id, data);
  }

  /// @dev ISuperfluidToken.getAgreementData implementation
  function getAgreementData(
    address agreementClass,
    bytes32 id,
    uint256 dataLength
  ) external view override returns (bytes32[] memory data) {
    bytes32 slot = keccak256(abi.encode("AgreementData", agreementClass, id));
    data = FixedSizeData.loadData(slot, dataLength);
  }

  /// @dev ISuperfluidToken.updateAgreementData implementation
  function updateAgreementData(bytes32 id, bytes32[] calldata data)
    external
    override
  {
    address agreementClass = msg.sender;
    bytes32 slot = keccak256(abi.encode("AgreementData", agreementClass, id));
    FixedSizeData.storeData(slot, data);
    emit AgreementUpdated(msg.sender, id, data);
  }

  /// @dev ISuperfluidToken.terminateAgreement implementation
  function terminateAgreement(bytes32 id, uint256 dataLength)
    external
    override
  {
    address agreementClass = msg.sender;
    bytes32 slot = keccak256(abi.encode("AgreementData", agreementClass, id));
    if (!FixedSizeData.hasData(slot, dataLength)) {
      revert SuperfluidErrors.DOES_NOT_EXIST(
        SuperfluidErrors.SF_TOKEN_AGREEMENT_DOES_NOT_EXIST
      );
    }
    FixedSizeData.eraseData(slot, dataLength);
    emit AgreementTerminated(msg.sender, id);
  }

  /// @dev ISuperfluidToken.updateAgreementState implementation
  function updateAgreementStateSlot(
    address account,
    uint256 slotId,
    bytes32[] calldata slotData
  ) external override {
    bytes32 slot = keccak256(
      abi.encode("AgreementState", msg.sender, account, slotId)
    );
    FixedSizeData.storeData(slot, slotData);
    emit AgreementStateUpdated(msg.sender, account, slotId);
  }

  /// @dev ISuperfluidToken.getAgreementState implementation
  function getAgreementStateSlot(
    address agreementClass,
    address account,
    uint256 slotId,
    uint256 dataLength
  ) external view override returns (bytes32[] memory slotData) {
    bytes32 slot = keccak256(
      abi.encode("AgreementState", agreementClass, account, slotId)
    );
    slotData = FixedSizeData.loadData(slot, dataLength);
  }

  /// @dev ISuperfluidToken.settleBalance implementation
  function settleBalance(address account, int256 delta)
    external
    override
    onlyAgreement
  {
    sharedSettledBalances_[account] = sharedSettledBalances_[account] + delta;
  }

  /// @dev ISuperfluidToken.makeLiquidationPayoutsV2 implementation
  function makeLiquidationPayoutsV2(
    bytes32 id,
    bytes memory liquidationTypeData,
    address liquidatorAccount, // the address executing the liquidation
    bool useDefaultRewardAccount, // Whether or not the default reward account receives the rewardAmount
    address targetAccount, // Account to be liquidated
    uint256 rewardAmount, // The amount the rewarded account will receive
    int256 targetAccountBalanceDelta // The delta amount the target account balance should change by
  ) external override onlyAgreement {
    address rewardAccount = _getRewardAccount();

    // we set the rewardAccount to the user who executed the liquidation if
    // no rewardAccount is set (aka. ANARCHY MODE - should not occur in reality, for testing purposes)
    if (rewardAccount == address(0)) {
      rewardAccount = liquidatorAccount;
    }

    address rewardAmountReceiver = useDefaultRewardAccount
      ? rewardAccount
      : liquidatorAccount;

    if (targetAccountBalanceDelta <= 0) {
      // LIKELY BRANCH: target account pays penalty to rewarded account
      assert(rewardAmount.toInt256() == -targetAccountBalanceDelta);

      sharedSettledBalances_[rewardAmountReceiver] += rewardAmount.toInt256();
      sharedSettledBalances_[targetAccount] += targetAccountBalanceDelta;
      EventsEmitter.emitTransfer(
        targetAccount,
        rewardAmountReceiver,
        rewardAmount
      );
    } else {
      // LESS LIKELY BRANCH: target account is bailed out
      // NOTE: useDefaultRewardAccount being true is undefined behavior
      // because the default reward account isn't receiving the rewardAmount by default
      assert(!useDefaultRewardAccount);
      sharedSettledBalances_[rewardAccount] -= (rewardAmount.toInt256() +
        targetAccountBalanceDelta);
      sharedSettledBalances_[liquidatorAccount] += rewardAmount.toInt256();
      sharedSettledBalances_[targetAccount] += targetAccountBalanceDelta;
      EventsEmitter.emitTransfer(
        rewardAccount,
        liquidatorAccount,
        rewardAmount
      );
      EventsEmitter.emitTransfer(
        rewardAccount,
        targetAccount,
        uint256(targetAccountBalanceDelta)
      );
    }

    emit AgreementLiquidatedV2(
      msg.sender,
      id,
      liquidatorAccount,
      targetAccount,
      rewardAmountReceiver,
      rewardAmount,
      targetAccountBalanceDelta,
      liquidationTypeData
    );
  }

  function _mint(address account, uint256 amount) internal {
    sharedSettledBalances_[account] =
      sharedSettledBalances_[account] +
      amount.toInt256();
    totalSupply_ = totalSupply_ + amount;
  }

  function _burn(address account, uint256 amount) internal {
    (int256 availableBalance, , ) = realtimeBalanceOf(account, host_.getNow());
    if (availableBalance < amount.toInt256()) {
      revert SuperfluidErrors.INSUFFICIENT_BALANCE(
        SuperfluidErrors.SF_TOKEN_BURN_INSUFFICIENT_BALANCE
      );
    }
    sharedSettledBalances_[account] =
      sharedSettledBalances_[account] -
      amount.toInt256();
    totalSupply_ = totalSupply_ - amount;
  }

  function _getRewardAccount() internal view returns (address rewardAccount) {
    ISuperfluidGovernance gov = host_.getGovernance();
    rewardAccount = gov.getConfigAsAddress(
      host_,
      this,
      _REWARD_ADDRESS_CONFIG_KEY
    );
  }

  /* 










*/

  function proxiableUUID() public pure override returns (bytes32) {
    return keccak256("org.anoblo.SuperSoulbound.implementation");
  }

  function updateCode(address newAddress) external override {
    if (msg.sender != address(host_))
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
    return totalSupply_;
  }

  function balanceOf(address account)
    public
    view
    override
    returns (uint256 balance)
  {
    (int256 availableBalance, , , ) = this.realtimeBalanceOfNow(account);
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
  }

  function decreaseAllowance(address spender, uint256 subtractedValue)
    public
    override
    returns (bool)
  {
    revert NOT_TRANSFERABLE();
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

  /**************************************************************************
   * Modifiers
   *************************************************************************/

  modifier onlyAgreement() {
    if (!host_.isAgreementClassListed(ISuperAgreement(msg.sender))) {
      revert SuperfluidErrors.ONLY_LISTED_AGREEMENT(
        SuperfluidErrors.SF_TOKEN_ONLY_LISTED_AGREEMENT
      );
    }
    _;
  }

  modifier onlyHost() {
    if (address(host_) != msg.sender) {
      revert SuperfluidErrors.ONLY_HOST(SuperfluidErrors.SF_TOKEN_ONLY_HOST);
    }
    _;
  }

  modifier onlySelf() {
    if (msg.sender != address(this)) revert ONLY_SELF();
    _;
  }
}
