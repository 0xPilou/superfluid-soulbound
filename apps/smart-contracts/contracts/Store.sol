//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/* Openzeppelin Contracts */
import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/* Custom Imports */
import { IABToken } from "./interfaces/IABToken.sol";

contract Store is ERC1155, Ownable {
  uint256 public nbItems = 0;

  address public token;

  struct Item {
    uint256 quantity;
    uint256 price;
  }
  error OutOfStock();
  error IncorrectItem();
  error IncorrectParameters();

  mapping(uint256 => Item) public items;

  event UpdatedInventory(uint256 itemId, uint256 quantity, uint256 price);
  event Purchased(address buyer, uint256[] itemIds, uint256[] quantities);
  event Redeemed(address buyer, uint256[] itemIds, uint256[] quantities);

  constructor() ERC1155("") {}

  /**************************************************************************
   *                            PUBLIC FUNCTIONS
   *************************************************************************/

  function purchase(uint256[] memory _itemIds, uint256[] memory _quantities)
    external
  {
    if (_itemIds.length != _quantities.length) revert IncorrectParameters();
    uint256 totalPrice = 0;
    for (uint256 i = 0; i < _itemIds.length; ++i) {
      Item storage item = items[_itemIds[i]];
      if (item.quantity < _quantities[i]) revert OutOfStock();
      item.quantity -= _quantities[i];
      totalPrice += _quantities[i] * item.price;
    }
    IABToken(token).burn(msg.sender, totalPrice);
    _mintBatch(msg.sender, _itemIds, _quantities, "");

    emit Purchased(msg.sender, _itemIds, _quantities);
  }

  function redeem(uint256[] memory _itemIds, uint256[] memory _quantities)
    external
  {
    if (_itemIds.length != _quantities.length) revert IncorrectParameters();
    _burnBatch(msg.sender, _itemIds, _quantities);
    emit Redeemed(msg.sender, _itemIds, _quantities);
  }

  /**************************************************************************
   *                              ONLY OWNER
   *************************************************************************/

  function addItem(uint256 _quantity, uint256 _price) external onlyOwner {
    Item memory item;
    item.quantity = _quantity;
    item.price = _price;

    items[nbItems] = item;

    emit UpdatedInventory(nbItems, _quantity, _price);

    nbItems++;
  }

  function updateItem(
    uint256 _itemId,
    uint256 _quantity,
    uint256 _price
  ) external onlyOwner {
    if (_itemId >= nbItems) revert IncorrectItem();

    Item memory item;
    item.quantity = _quantity;
    item.price = _price;

    items[_itemId] = item;

    emit UpdatedInventory(_itemId, _quantity, _price);
  }

  function setToken(address _token) external onlyOwner {
    require(_token != address(0), "zero address");
    token = _token;
  }
}
