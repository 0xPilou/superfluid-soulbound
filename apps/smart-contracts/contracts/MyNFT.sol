// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { L1CrossDomainMessenger } from "@eth-optimism/contracts/L1/messaging/L1CrossDomainMessenger.sol";
import { IL1CrossDomainMessenger } from "@eth-optimism/contracts/L1/messaging/IL1CrossDomainMessenger.sol";

contract MyNFT is ERC721 {
  uint256 public mintCount = 0;
  uint256 public MAX_MINT = 100;

  address public AB_RELAY;
  IL1CrossDomainMessenger private messenger;

  constructor(
    string memory _name,
    string memory _symbol,
    address _optimisticContractAddress,
    address _ABRelay
  ) ERC721(_name, _symbol) {
    messenger = L1CrossDomainMessenger(_optimisticContractAddress);
    AB_RELAY = _ABRelay;
  }

  uint256 private constant DENOMINATOR = 1e6;

  function mintNft(address subscriber, uint256 quantity) external {
    require(mintCount + quantity <= MAX_MINT, "not enought to mint");

    for (uint256 i = 0; i < quantity; i++) {
      _safeMint(subscriber, mintCount + i);
    }
    mintCount += quantity;
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override {
    messenger.sendMessage(
      AB_RELAY,
      abi.encodeWithSignature(
        "transferredNFT(address,address,uint256)",
        from,
        to,
        tokenId
      ),
      10000001
    );
  }
}
