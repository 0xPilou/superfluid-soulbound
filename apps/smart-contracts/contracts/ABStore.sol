//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/* Openzeppelin Contracts */
import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/* Custom Imports */
import { IABToken } from "./interfaces/IABToken.sol";

/// @dev Thrown when the requested item is no longer available
error OUT_OF_STOCK();

/// @dev Thrown when the requested item does not exists in store
error INCORRECT_ITEM();

/// @dev Thrown when the passed parameter is invalid
error INVALID_PARAMETER();

/// @dev Thrown when the amount of Ether sent to the contract is incorrect
error INCORRECT_ETH_SENT();

contract ABStore is ERC1155, Ownable {
  /// @dev Total number of items in store
  uint256 public nbItems = 0;

  /// @dev Anotherblock Token used to purchase items in store
  IABToken internal AB_TOKEN;

  /**
   * @notice
   *  Item Structure format
   *
   * @param quantity : Quantity of items available
   * @param priceABT : Price component denominated in ABT
   * @param priceETH : Price component denominated in ETH
   */
  struct Item {
    uint256 quantity;
    uint256 priceABT;
    uint256 priceETH;
  }

  /// @dev Stores the items details for a given item ID
  mapping(uint256 => Item) public items;

  event UpdatedInventory(
    uint256 itemId,
    uint256 quantity,
    uint256 priceABT,
    uint256 priceETH
  );
  event Purchased(address buyer, uint256[] itemIds, uint256[] quantities);
  event Redeemed(address buyer, uint256[] itemIds, uint256[] quantities);

  /**
   * @notice
   *  Contract Constructor
   *
   * @param _uri : The ERC1155 token URI
   */
  constructor(string memory _uri) ERC1155(_uri) {}

  /**************************************************************************
   *                            PUBLIC FUNCTIONS
   *************************************************************************/

  /**
   * @notice
   *  Purchase items from the store
   *
   * @param _itemIds : Array of items to be purchased
   * @param _quantities : Array of quantity for each item to be purchased
   */
  function purchase(uint256[] memory _itemIds, uint256[] memory _quantities)
    external
    payable
  {
    // Ensure that the parameters are correct
    if (_itemIds.length != _quantities.length) revert INVALID_PARAMETER();
    uint256 totalPriceAB = 0;
    uint256 totalPriceETH = 0;

    for (uint256 i = 0; i < _itemIds.length; ++i) {
      Item storage item = items[_itemIds[i]];

      // Ensure that the item is in stock
      if (item.quantity < _quantities[i]) revert OUT_OF_STOCK();

      // Decrement total available quantity
      item.quantity -= _quantities[i];
      totalPriceAB += _quantities[i] * item.priceABT;
      totalPriceETH += _quantities[i] * item.priceETH;
    }

    // Ensure that the user sent the correct amount of ETH
    if (msg.value != totalPriceETH) revert INCORRECT_ETH_SENT();

    // Burn the user AB Tokens
    AB_TOKEN.burn(msg.sender, totalPriceAB);

    // Mint the items requested
    _mintBatch(msg.sender, _itemIds, _quantities, "");

    emit Purchased(msg.sender, _itemIds, _quantities);
  }

  /**
   * @notice
   *  Redeem the physical item from the store
   *
   * @param _itemIds : Array of items to be redeemed
   * @param _quantities : Array of quantity for each item to be redeemed
   */
  function redeem(uint256[] memory _itemIds, uint256[] memory _quantities)
    external
  {
    // Ensure that the parameters are correct
    if (_itemIds.length != _quantities.length) revert INVALID_PARAMETER();

    // Burn the ERC1155 corresponding to the items to be redeemed
    _burnBatch(msg.sender, _itemIds, _quantities);
    emit Redeemed(msg.sender, _itemIds, _quantities);
  }

  /**************************************************************************
   *                              ONLY OWNER
   *************************************************************************/

  /**
   * @notice
   *  Add new purchasable item to the store
   * @dev
   *  Only the contract owner can perform this operation
   *
   * @param _quantity : Quantity of item available
   * @param _priceABT : Price component denominated in ABT
   * @param _priceETH : Price component denominated in ETH
   */
  function addItem(
    uint256 _quantity,
    uint256 _priceABT,
    uint256 _priceETH
  ) external onlyOwner {
    Item memory item;
    // Assign item quantity
    item.quantity = _quantity;

    // Assign item prices
    item.priceABT = _priceABT;
    item.priceETH = _priceETH;

    // Save item
    items[nbItems] = item;

    emit UpdatedInventory(nbItems, _quantity, _priceABT, _priceETH);

    // Increment item counter
    nbItems++;
  }

  /**
   * @notice
   *  Update existing purchasable item in the store
   * @dev
   *  Only the contract owner can perform this operation
   *
   * @param _itemId : Identifier of the item to be updated
   * @param _quantity : Quantity of item available
   * @param _priceABT : Price component denominated in ABT
   * @param _priceETH : Price component denominated in ETH
   */
  function updateItem(
    uint256 _itemId,
    uint256 _quantity,
    uint256 _priceABT,
    uint256 _priceETH
  ) external onlyOwner {
    // Ensure that the item exists
    if (_itemId >= nbItems) revert INCORRECT_ITEM();

    Item memory item;

    // Assign item quantity
    item.quantity = _quantity;

    // Assign item prices
    item.priceABT = _priceABT;
    item.priceETH = _priceETH;

    // Save item
    items[_itemId] = item;

    emit UpdatedInventory(nbItems, _quantity, _priceABT, _priceETH);
  }

  /**
   * @notice
   *  Set Anotherblock Token Address
   *
   * @dev
   *  Only the contract owner can perform this operation
   *
   * @param _ABToken Anotherblock Token Address
   */
  function setToken(address _ABToken) external onlyOwner {
    // Ensure the given address is not the zero-address
    if (_ABToken == address(0)) revert INVALID_PARAMETER();
    AB_TOKEN = IABToken(_ABToken);
  }

  /**
   * @notice
   *  Withdraw Ether from this contract to the given address
   *
   * @dev
   *  Only the contract owner can perform this operation
   *
   * @param _treasury Anotherblock Treasury Address
   */
  function withdraw(address _treasury) external onlyOwner {
    payable(_treasury).transfer(address(this).balance);
  }
}
