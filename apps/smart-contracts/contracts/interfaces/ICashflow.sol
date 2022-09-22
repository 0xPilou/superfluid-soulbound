// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

interface ICashflow {
  function issueNFT(
    address receiver,
    int96 flowRate,
    uint256 tokenId
  ) external;

  function updateHolder(
    address oldReceiver,
    address newReceiver,
    uint256 tokenId
  ) external;

  function getFlow(address _receiver)
    external
    view
    returns (
      uint256 timestamp,
      int96 flowRate,
      uint256 deposit,
      uint256 owedDeposit
    );

  function editNFT(
    uint256 tokenId,
    int96 flowRate,
    address receiver
  ) external;

  function isAllowed(bytes32 _id) external view returns (bool);

  function setAcceptedToken(address _acceptedToken) external;

  function getAcceptedToken() external view returns (address);
}
