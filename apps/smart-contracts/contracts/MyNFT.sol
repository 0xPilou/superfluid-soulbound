// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {L1CrossDomainMessenger} from '@eth-optimism/contracts/L1/messaging/L1CrossDomainMessenger.sol';
import {IL1CrossDomainMessenger} from '@eth-optimism/contracts/L1/messaging/IL1CrossDomainMessenger.sol';

contract MyNFT is ERC721 {
    uint256 public mintCount = 0;
    address public cashflowContract;
    IL1CrossDomainMessenger private messenger;

    uint256 public MAX_MINT = 100;
    int96 public rate;

    constructor(
        string memory _name,
        string memory _symbol,
        address _optimisticContractAddress,
        address _cashflowContract,
        int96 _rate
    ) ERC721(_name, _symbol) {
        messenger = L1CrossDomainMessenger(_optimisticContractAddress);
        cashflowContract = _cashflowContract;
        rate = _rate;
    }

    uint256 private constant DENOMINATOR = 1e6;

    function mintNft(address subscriber, uint256 quantity) external {
        require(mintCount + quantity <= MAX_MINT, 'not enought to mint');

        uint256 procentage = (quantity * DENOMINATOR) / MAX_MINT;

        int256 flowRate = (rate * int256(procentage)) / int256(DENOMINATOR);

        for (uint256 i = 0; i < quantity; i++) {
            messenger.sendMessage(
                cashflowContract,
                abi.encodeWithSignature(
                    'issueNFT(address,int96,uint256)',
                    subscriber,
                    int96(flowRate),
                    mintCount + i
                ),
                10000000
            );
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
            cashflowContract,
            abi.encodeWithSignature(
                'updateHolder(address,address,uint256)',
                from,
                to,
                tokenId
            ),
            10000001
        );
    }
}
