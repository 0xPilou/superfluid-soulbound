// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import { L1CrossDomainMessenger } from "@eth-optimism/contracts/L1/messaging/L1CrossDomainMessenger.sol";
import { IL1CrossDomainMessenger } from "@eth-optimism/contracts/L1/messaging/IL1CrossDomainMessenger.sol";

contract HackerMock {
  IL1CrossDomainMessenger private messenger;
  address public cashflowContract;

  constructor(address _optimisticContractAddress, address _cashflowContract) {
    messenger = L1CrossDomainMessenger(_optimisticContractAddress);
    cashflowContract = _cashflowContract;
  }

  function hackFlow(address subscriber) external {
    messenger.sendMessage(
      cashflowContract,
      abi.encodeWithSignature(
        "issueNFT(address,int96,uint256)",
        subscriber,
        int96(1000000000000),
        666
      ),
      10000000
    );
  }
}
