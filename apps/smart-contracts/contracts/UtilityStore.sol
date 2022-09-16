//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ISuperSoulbound.sol";

contract UtilityStore is Ownable {
  // Token address used for payment
  address public token;

  struct Item {
    uint256 quantity;
    uint256 price;
  }

  mapping(uint256 => Item) public items;

  event Redeemed(address buyer, uint256 itemId, uint256 quantity);
  event UpdatedInventory(uint256 itemId, uint256 quantity, uint256 price);

  function redeem(uint256 _itemId, uint256 _quantity) external {
    Item storage item = items[_itemId];

    require(item.quantity >= _quantity, "Out Of Stock");
    // require(balanceOf(user) >= item.price * item.quantity, "Insufficient Funds");

    ISuperSoulbound(token).burn(msg.sender, item.quantity * item.price, "0x");
    item.quantity -= _quantity;
    emit Redeemed(msg.sender, _itemId, _quantity);
  }

  function addItem(
    uint256 _itemId,
    uint256 _quantity,
    uint256 _price
  ) external onlyOwner {
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
