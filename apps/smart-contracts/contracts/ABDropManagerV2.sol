//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ██████████████████████████████████
//                            ████████████████████████          ██████████
//                            ████████████████████████          ██████████
//                            ████████████████████████          ██████████
//                            ████████████████████████          ██████████
//                                                    ████████████████████
//                                                    ████████████████████
//                                                    ████████████████████
//                                                    ████████████████████
//
//
//  █████╗ ███╗   ██╗ ██████╗ ████████╗██╗  ██╗███████╗██████╗ ██████╗ ██╗      ██████╗  ██████╗██╗  ██╗
// ██╔══██╗████╗  ██║██╔═══██╗╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝
// ███████║██╔██╗ ██║██║   ██║   ██║   ███████║█████╗  ██████╔╝██████╔╝██║     ██║   ██║██║     █████╔╝
// ██╔══██║██║╚██╗██║██║   ██║   ██║   ██╔══██║██╔══╝  ██╔══██╗██╔══██╗██║     ██║   ██║██║     ██╔═██╗
// ██║  ██║██║ ╚████║╚██████╔╝   ██║   ██║  ██║███████╗██║  ██║██████╔╝███████╗╚██████╔╝╚██████╗██║  ██╗
// ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝
//
/**
 * @title ABDropManager
 * @author Anotherblock Technical Team
 * @notice This contract is responsible for creating and administrating new drops related to anotherblock.io
 **/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/* Openzeppelin Contract */
import "@openzeppelin/contracts/utils/introspection/ERC165Storage.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/* Optimism Contracts */
import { L1CrossDomainMessenger } from "@eth-optimism/contracts/L1/messaging/L1CrossDomainMessenger.sol";
import { IL1CrossDomainMessenger } from "@eth-optimism/contracts/L1/messaging/IL1CrossDomainMessenger.sol";

/* Custom Imports */
import "./interfaces/IABDropManager.sol";
import "./interfaces/IAnotherMinter.sol";
import "./ABErrors.sol";

contract ABDropManager is
  Initializable,
  OwnableUpgradeable,
  ABErrors,
  ERC165Storage
{
  // Array of existing Drops
  Drop[] public drops;

  // Address of anotherblock multisig
  address public treasury;

  // Drop count since genesis
  uint256 private totalDrop;

  // Address of anotherblock relay on Optimism
  address private relay;

  // L1 to L2 Messenger Contract
  IL1CrossDomainMessenger private messenger;

  // Event emitted upon Drop creation
  event DropCreated(uint256 dropId);

  // Event emitted upon Drop update
  event DropUpdated(uint256 dropId);

  /**
   * @notice
   *  Drop Structure format
   *
   * @param dropId : drop unique identifier
   * @param sold : total number of sold tokens for this drop
   * @param rightHolderFee : right Holder fee on each mint (to be divided by 1e6)
   * @param firstTokenIndex : TokenId at which this drop starts
   * @param salesInfo : Sale Info struct defining the private and public sales opening date (see SaleInfo structure)
   * @param tokenInfo : Token Info struct defining the token information (see TokenInfo structure)
   * @param currencyPayout : address of the currency used for the royalty payout (zero-address if ETH)
   * @param owner : right holder address
   * @param nft :  NFT contract address
   * @param merkleRoot : merkle tree root used for allowlist
   */
  struct Drop {
    uint256 dropId;
    uint256 sold;
    uint256 rightHolderFee;
    uint256 firstTokenIndex;
    TokenInfo tokenInfo;
    SaleInfo salesInfo;
    address currencyPayout;
    address owner;
    address nft;
    bytes32 merkleRoot;
  }

  /**
   * @notice
   *  TokenInfo Structure format
   *
   * @param price : initial price in ETH of 1 token
   * @param supply : total number of tokens for this drop
   * @param royaltySharePerToken : total percentage of royalty evenly distributed among tokens holders (to be divided by 1e6)
   */
  struct TokenInfo {
    uint256 price;
    uint256 supply;
    uint256 royaltySharePerToken;
  }

  /**
   * @notice
   *  SaleInfo Structure format
   *
   * @param privateSaleMaxMint : maximum number of token to be minted per address for the private sale
   * @param privateSaleTime : timestamp at which the private sale is opened
   * @param publicSaleMaxMint : maximum number of token to be minted per address for the public sale
   * @param publicSaleTime : timestamp at which the public sale is opened
   */
  struct SaleInfo {
    uint256 privateSaleMaxMint;
    uint256 privateSaleTime;
    uint256 publicSaleMaxMint;
    uint256 publicSaleTime;
  }

  /**
   * @notice
   *  Phase Structure format
   *
   * @param phaseStart : timestamp at which the phase
   * @param maxMint : maximum number of token to be minted per user during the phase
   * @param merkle : merkle tree root containing user address and associated parameters
   */
  struct Phase {
    uint256 phaseStart;
    uint256 maxMint;
    bytes32 merkle;
  }

  /**
   * Contract Initializer
   *
   * @param _treasury : treasury address
   */
  function initialize(address _treasury) public initializer {
    // Check that the treasury address is not the zero-address
    if (_treasury == address(0)) revert ZeroAddress();
    treasury = _treasury;
    totalDrop = 0;
    // Register ABDropManager interface
    __Ownable_init();
  }

  /**
   * Contract Initializer V2
   *
   * @param _messenger : L2 messenger address
   * @param _relay : anotherblock relay address
   */
  function initializeV2(address _messenger, address _relay)
    public
    reinitializer(2)
  {
    // Check that the treasury address is not the zero-address
    if (_messenger == address(0)) revert ZeroAddress();
    if (_relay == address(0)) revert ZeroAddress();
    messenger = L1CrossDomainMessenger(_messenger);
    relay = _relay;
  }

  //     ______     __                        __   ______                 __  _
  //    / ____/  __/ /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
  //   / __/ | |/_/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
  //  / /____>  </ /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
  // /_____/_/|_|\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

  /**
   * @notice
   *  Update the Drop `_dropId` with new `_quantity` recently sold
   *
   * @param _dropId : drop identifier
   * @param _quantity : quantity of NFT sold
   */
  function updateDropCounter(uint256 _dropId, uint256 _quantity) external {
    Drop storage drop = drops[_dropId];

    // Ensure that the caller is the NFT contract associated to this drop
    if (msg.sender != drop.nft) revert UnauthorizedUpdate();

    // Increment the sold quantity
    drop.sold += _quantity;
  }

  //
  //     ____        __         ____                              ______                 __  _
  //    / __ \____  / /_  __   / __ \_      ______  ___  _____   / ____/_  ______  _____/ /_(_)___  ____  _____
  //   / / / / __ \/ / / / /  / / / / | /| / / __ \/ _ \/ ___/  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
  //  / /_/ / / / / / /_/ /  / /_/ /| |/ |/ / / / /  __/ /     / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
  //  \____/_/ /_/_/\__, /   \____/ |__/|__/_/ /_/\___/_/     /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/
  //               /____/

  /**
   * @notice
   *  Create a Drop
   *  Only the contract owner can perform this operation
   *
   * @param _currencyPayout : address of the currency used for the royalty payout (zero-address if ETH)
   * @param _owner : right holder address
   * @param _nft : NFT contract address
   * @param _price : initial price in ETH of 1 NFT
   * @param _supply : total number of NFT for this drop
   * @param _royaltySharePerToken : total percentage of royalty evenly distributed among NFT holders (to be divided by 1e6)
   * @param _rightHolderFee : right Holder fee on each mint (to be divided by 1e6)
   */
  function create(
    address _currencyPayout,
    address _owner,
    address _nft,
    uint256 _price,
    uint256 _supply,
    uint256 _royaltySharePerToken,
    uint256 _rightHolderFee,
    Phase[] memory phases
  ) external onlyOwner {
    // Enforce non-null royalty shares for this drop
    if (_royaltySharePerToken <= 0) revert InsufficientRoyalties();

    // Enforce non-null supply
    if (_supply <= 0) revert InsufficientSupply();

    // Ensure right holder address is not the zero address
    if (_owner == address(0)) revert ZeroAddress();

    // Create the drop
    _createDrop(
      _currencyPayout,
      _owner,
      _nft,
      _rightHolderFee,
      TokenInfo(_price, _supply, _royaltySharePerToken),
      SaleInfo(0, 0, 0, 0),
      phases
    );
  }

  /**
   * @notice
   *  Update the treasury address
   *  Only the contract owner can perform this operation
   *
   * @param _newTreasury : new treasury address
   */
  function setTreasury(address _newTreasury) external onlyOwner {
    if (_newTreasury == address(0)) revert ZeroAddress();
    treasury = _newTreasury;
  }

  /**
   * @notice
   *  Update the Drop `_dropId` token information
   *  Only the contract owner can perform this operation
   *
   *  Return true if `tokenCount` and `supply` are updated, false otherwise
   *
   * @param _dropId :  drop identifier of the drop to be updated
   * @param _tokenInfo : array containing the new informations to be updated
   */
  function setTokenInfo(uint256 _dropId, uint256[3] calldata _tokenInfo)
    external
    onlyOwner
  {
    // Ensure supply non-null
    if (_tokenInfo[1] <= 0) revert InsufficientSupply();

    // Enfore non-null royalty shares for this drop
    if (_tokenInfo[2] <= 0) revert InsufficientRoyalties();

    // Get the drop to be updated
    Drop storage drop = drops[_dropId];

    // Update the price info
    drop.tokenInfo.price = _tokenInfo[0];

    // Update the royalty share info
    drop.tokenInfo.royaltySharePerToken = _tokenInfo[2];

    // Check if the Drop has never been minted and if it is the last drop created
    if (drop.sold == 0 && _dropId == drops[drops.length - 1].dropId) {
      // Update the supply info
      drop.tokenInfo.supply = _tokenInfo[1];
    }
    // Emit Drop Update event
    emit DropUpdated(_dropId);
  }

  /**
   * @notice
   *  Update the Drop `_dropId` drop information
   *  Only the contract owner can perform this operation
   *
   * @param _dropId :  drop identifier of the drop to be updated
   * @param _rightHolderFee : fees paid to right holder
   * @param _owner : right holder address
   */
  function setRightHolderInfo(
    uint256 _dropId,
    uint256 _rightHolderFee,
    address _owner
  ) external onlyOwner {
    // Ensure right holder address is not the zero address
    if (_owner == address(0)) revert ZeroAddress();

    Drop storage drop = drops[_dropId];
    drop.rightHolderFee = _rightHolderFee;
    drop.owner = _owner;

    // Emit Drop Update event
    emit DropUpdated(_dropId);
  }

  //     ____      __                        __   ______                 __  _
  //    /  _/___  / /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
  //    / // __ \/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
  //  _/ // / / / /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
  // /___/_/ /_/\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

  /**
   * @notice
   *  Register the Drop information
   *
   * @param _currencyPayout : address of the currency used for the royalty payout (zero-address if ETH)
   * @param _owner : right holder address
   * @param _nft : NFT contract address
   * @param _rightHolderFee : right Holder fee on each mint expressed
   * @param _tokenInfo : token information structure (see TokenInfo struct details)
   */
  function _createDrop(
    address _currencyPayout,
    address _owner,
    address _nft,
    uint256 _rightHolderFee,
    TokenInfo memory _tokenInfo,
    SaleInfo memory _salesInfo,
    Phase[] memory phases
  ) internal {
    uint256 startTokenIndex;
    if (totalDrop > 0) {
      startTokenIndex =
        drops[totalDrop - 1].firstTokenIndex +
        drops[totalDrop - 1].tokenInfo.supply;
    } else {
      startTokenIndex = 0;
    }
    drops.push(
      Drop(
        totalDrop,
        0,
        _rightHolderFee,
        startTokenIndex,
        _tokenInfo,
        _salesInfo,
        _currencyPayout,
        _owner,
        _nft,
        0x0
      )
    );

    /// NOTE : Do not call this line here, will call from the frontend instead
    IAnotherMinter(_nft).setDropPhases(totalDrop, phases);

    /// NOTE : change baseFlow to a parameter of the create drop function.
    int256 baseFlow = (int256(_tokenInfo.price) * 10) / 86400;
    messenger.sendMessage(
      relay,
      abi.encodeWithSignature(
        "createdDrop(int96,uint256,address)",
        int96(baseFlow),
        totalDrop,
        _owner
      ),
      10000000
    );

    // Emit Drop Creation event
    emit DropCreated(totalDrop);

    // Increment the total drop count
    totalDrop++;
  }
}
