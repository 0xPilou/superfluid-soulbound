// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import { L1CrossDomainMessenger } from "@eth-optimism/contracts/L1/messaging/L1CrossDomainMessenger.sol";
import { IL1CrossDomainMessenger } from "@eth-optimism/contracts/L1/messaging/IL1CrossDomainMessenger.sol";

contract HackerMock {
  IL1CrossDomainMessenger private messenger;
  address public relay;

  constructor(address _optimisticContractAddress, address _relay) {
    messenger = L1CrossDomainMessenger(_optimisticContractAddress);
    relay = _relay;
  }

  function hackFlow(address subscriber) external {
    messenger.sendMessage(
      relay,
      abi.encodeWithSignature(
        "issuedNFT(int96,uint256)",
        int96(1000000000000),
        666
      ),
      10000000
    );
  }
}
