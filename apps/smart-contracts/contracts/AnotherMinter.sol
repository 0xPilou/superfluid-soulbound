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
 * @title AnotherMinter
 * @author Anotherblock Technical Team
 * @notice Anotherblock NFT contract
 **/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/* Openzeppelin Contract */
import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import { ERC721ABv2 } from "./ERC721ABv2.sol";
import { IABDropManager } from "./interfaces/IABDropManager.sol";
import { ERC721ABErrors } from "./ERC721ABErrors.sol";

contract AnotherMinter is ERC721ABv2, ERC721ABErrors {
  // Base Token URI
  string private baseTokenURI;

  // Denominator used to calculate fees
  uint256 private constant DENOMINATOR = 1e6;

  // Stores the amounts of tokens minted per address and per drop for the public sale
  mapping(uint256 => mapping(address => uint256))
    public mintedPerDropPublicSale;

  // Stores the amounts of tokens minted per address and per drop for the private sale
  mapping(uint256 => mapping(address => uint256))
    public mintedPerDropPrivateSale;

  /**
   * @notice
   *  AnotherMinter contract constructor
   *
   * @param _dropManager : Drop Manager contract address
   * @param _messenger : L2 Messenger contract address
   * @param _relay : Anotherblock Relay contract address (L1 -> L2 message)
   * @param _baseUri : base token URI
   * @param _name : name of the NFT contract
   * @param _symbol : symbol / ticker of the NFT contract
   **/
  constructor(
    address _dropManager,
    address _messenger,
    address _relay,
    string memory _baseUri,
    string memory _name,
    string memory _symbol
  ) ERC721ABv2(_dropManager, _messenger, _relay, _name, _symbol) {
    // Sets the base token URI
    baseTokenURI = _baseUri;
  }

  //     ______     __                        __   ______                 __  _
  //    / ____/  __/ /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
  //   / __/ | |/_/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
  //  / /____>  </ /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
  // /_____/_/|_|\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

  /**
   * @notice
   *  Let a whitelisted user mint `_quantity` token(s) of the given `_dropId`
   *
   * @param _to : address to receive the token
   * @param _dropId : drop identifier
   * @param _quantity : amount of tokens to be minted
   * @param _proof : merkle tree proof used to verify whitelisted user
   */
  function mint(
    address _to,
    uint256 _dropId,
    uint256 _quantity,
    bytes32[] memory _proof
  ) external payable {
    _mintAB(_to, _dropId, _quantity, _proof);
  }

  /**
   * @notice
   *  Let a user mint `_quantity` token(s) of the given `_dropId`
   *
   * @param _userWallet : address to receive the token
   * @param _quantity : amount of tokens to be minted
   * @param _tokenId : drop identifier
   */
  function claimTo(
    address _userWallet,
    uint256 _quantity,
    uint256 _tokenId
  ) external payable {
    bytes32[] memory emptyBytes;
    _mintAB(_userWallet, _tokenId, _quantity, emptyBytes);
  }

  /**
   * @notice
   *  Returns the remaining supply for a given `_dropId`
   *
   * @param _tokenId : drop identifier
   * @return unclaimedSupply : the remaining supply to be minted for `_dropId`
   */
  function unclaimedSupply(uint256 _tokenId) public view returns (uint256) {
    IABDropManager.Drop memory drop = IABDropManager(dropManager).drops(
      _tokenId
    );
    return drop.tokenInfo.supply - drop.sold;
  }

  /**
   * @notice
   *  Returns the mint price for a given `_dropId`
   *
   * @param _tokenId : drop identifier
   * @return price : the mint price for `_dropId`
   */
  function price(uint256 _tokenId) public view returns (uint256) {
    IABDropManager.Drop memory drop = IABDropManager(dropManager).drops(
      _tokenId
    );
    return drop.tokenInfo.price;
  }

  /**
   * @notice
   *  Returns the reason why `_to` cannot mint `_quantity` token from `_dropId`
   *
   * @param _userWallet : wallet to receive the minted NFT(s)
   * @param _quantity : quantity to be minted
   * @param _tokenId : drop identifier
   * @return reason : the reason why the user cannot mint
   */
  function getClaimIneligibilityReason(
    address _userWallet,
    uint256 _quantity,
    uint256 _tokenId
  ) public view returns (string memory) {
    IABDropManager.Drop memory drop = IABDropManager(dropManager).drops(
      _tokenId
    );

    // Check if the drop is not sold-out
    if (drop.sold == drop.tokenInfo.supply) return "DropSoldOut";

    // Check that the whitelisted sale started
    if (block.timestamp < drop.salesInfo.privateSaleTime)
      return "SaleNotStarted";

    // Check that there are enough tokens available for sale
    if (drop.sold + _quantity > drop.tokenInfo.supply)
      return "NotEnoughTokensAvailable";

    if (
      drop.merkleRoot != 0x0 && block.timestamp < drop.salesInfo.publicSaleTime
    ) {
      // Check that user did not mint the maximum amount per address for the private sale
      if (
        mintedPerDropPrivateSale[drop.dropId][_userWallet] + _quantity >
        drop.salesInfo.privateSaleMaxMint
      ) return "MaxMintPerAddress";
    } else {
      // Check that user did not mint the maximum amount per address for the public sale
      if (
        mintedPerDropPublicSale[drop.dropId][_userWallet] + _quantity >
        drop.salesInfo.publicSaleMaxMint
      ) return "MaxMintPerAddress";
    }
    return "";
  }

  /**
   * @notice
   *  Withdraw mint proceeds to Anotherblock Treasury address
   *
   */
  function withdrawAll() external {
    payable(IABDropManager(dropManager).treasury()).transfer(
      address(this).balance
    );
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
   *  Update the Base URI
   *  Only the contract owner can perform this operation
   *
   * @param _newBaseURI : new base URI
   */
  function setBaseURI(string calldata _newBaseURI) external onlyOwner {
    baseTokenURI = _newBaseURI;
  }

  //     ____      __                        __   ______                 __  _
  //    /  _/___  / /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
  //    / // __ \/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
  //  _/ // / / / /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
  // /___/_/ /_/\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

  /**
   * @notice
   *  Let a whitelisted user mint `_quantity` token(s) of the given `_dropId`
   *
   * @param _to : recipient address
   * @param _dropId : drop identifier
   * @param _quantity : amount of tokens to be minted
   * @param _proof : merkle tree proof used to verify whitelisted user
   */
  function _mintAB(
    address _to,
    uint256 _dropId,
    uint256 _quantity,
    bytes32[] memory _proof
  ) internal virtual {
    IABDropManager.Drop memory drop = IABDropManager(dropManager).drops(
      _dropId
    );

    // Check if the drop is not sold-out
    if (drop.sold == drop.tokenInfo.supply) revert DropSoldOut();

    // Check that the whitelisted sale started
    if (block.timestamp < drop.salesInfo.privateSaleTime)
      revert SaleNotStarted();

    // Check that there are enough tokens available for sale
    if (drop.sold + _quantity > drop.tokenInfo.supply)
      revert NotEnoughTokensAvailable();

    // Check that user is sending the correct amount of ETH (will revert if user send too much or not enough)
    if (msg.value != drop.tokenInfo.price * _quantity)
      revert IncorrectETHSent();

    // Check that user is whitelisted in case the public sale did not start yet
    if (
      drop.merkleRoot != 0x0 && block.timestamp < drop.salesInfo.publicSaleTime
    ) {
      // Check that user did not mint the maximum amount per address for the private sale
      if (
        mintedPerDropPrivateSale[drop.dropId][_to] + _quantity >
        drop.salesInfo.privateSaleMaxMint
      ) revert MaxMintPerAddress();

      bool isWhitelisted = MerkleProof.verify(
        _proof,
        drop.merkleRoot,
        keccak256(abi.encodePacked(_to))
      );

      // Revert if user is not whitelisted
      if (!isWhitelisted) {
        revert NotInMerkle();
      }

      mintedPerDropPrivateSale[drop.dropId][_to] += _quantity;
    } else {
      // Check that user did not mint the maximum amount per address for the public sale
      if (
        mintedPerDropPublicSale[drop.dropId][_to] + _quantity >
        drop.salesInfo.publicSaleMaxMint
      ) revert MaxMintPerAddress();
      mintedPerDropPublicSale[drop.dropId][_to] += _quantity;
    }

    uint256 currentDropTokenIndex = drop.firstTokenIndex + drop.sold;
    for (uint256 i = 0; i < _quantity; ++i) {
      dropIdPerToken[currentDropTokenIndex + i] = drop.dropId;
      _safeMint(_to, currentDropTokenIndex + i);
    }

    IABDropManager(dropManager).updateDropCounter(_dropId, _quantity);

    // Send Right Holder Fee to the owner address
    if (msg.value > 0) {
      uint256 feeToRightHolder = (msg.value * drop.rightHolderFee) /
        DENOMINATOR;
      if (feeToRightHolder > 0) {
        payable(drop.owner).transfer(feeToRightHolder);
      }
    }
  }

  /**
   * @notice
   *  Returns the base URI
   *
   * @return baseTokenURI base token URI state
   */
  function _baseURI() internal view virtual override returns (string memory) {
    return baseTokenURI;
  }
}
