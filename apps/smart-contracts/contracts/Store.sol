//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IABToken.sol";

contract Store is Ownable {
  // Token address used for payment
  address public token;

  uint256 public nbItems = 0;

  struct Item {
    uint256 quantity;
    uint256 price;
  }
  error OutOfStock();
  error IncorrectItem();

  mapping(uint256 => Item) public items;

  event UpdatedInventory(uint256 itemId, uint256 quantity, uint256 price);
  event Redeemed(address buyer, uint256 itemId, uint256 quantity);

  function redeem(uint256 _itemId, uint256 _quantity) external {
    Item storage item = items[_itemId];

    if (item.quantity < _quantity) revert OutOfStock();

    IABToken(token).burn(msg.sender, _quantity * item.price);
    item.quantity -= _quantity;
    emit Redeemed(msg.sender, _itemId, _quantity);
  }

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
