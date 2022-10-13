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
 * @title ERC721ABv2
 * @author Anotherblock Technical Team
 * @notice Anotherblock NFT standard
 **/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/* Openzeppelin Contract */
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/* Optimism Contracts */
import { L1CrossDomainMessenger } from "@eth-optimism/contracts/L1/messaging/L1CrossDomainMessenger.sol";
import { IL1CrossDomainMessenger } from "@eth-optimism/contracts/L1/messaging/IL1CrossDomainMessenger.sol";

/* Custom Imports */

abstract contract ERC721ABv2 is ERC721, Ownable {
  // AB Drop Manager address
  address public dropManager;

  // AB Relay Address
  address private relay;

  // L1 to L2 Messenger Contract
  IL1CrossDomainMessenger private messenger;

  // Stores the drop ID for a given Token ID
  mapping(uint256 => uint256) public dropIdPerToken;

  /**
   * @notice
   *  ERC721AB contract constructor
   *
   * @param _dropManager : Drop Manager contract address
   * @param _name : name of the NFT contract
   * @param _symbol : symbol / ticker of the NFT contract
   **/
  constructor(
    address _dropManager,
    address _messenger,
    address _relay,
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) {
    dropManager = _dropManager;
    relay = _relay;
    messenger = L1CrossDomainMessenger(_messenger);
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
   *  Update dropManager address
   *  Only the contract owner can perform this operation
   *
   * @param _dropManager : new dropManager address
   */
  function setDropManager(address _dropManager) external onlyOwner {
    dropManager = _dropManager;
  }

  //     ____      __                        __   ______                 __  _
  //    /  _/___  / /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
  //    / // __ \/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
  //  _/ // / / / /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
  // /___/_/ /_/\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

  /**
   * @dev See {ERC721Enumerable-beforeTokenTransfer}.
   */
  function _beforeTokenTransfer(
    address _from,
    address _to,
    uint256 _tokenId
  ) internal override(ERC721) {
    super._beforeTokenTransfer(_from, _to, _tokenId);
    messenger.sendMessage(
      relay,
      abi.encodeWithSignature(
        "transferredNFT(address,address,uint256)",
        _from,
        _to,
        dropIdPerToken[_tokenId]
      ),
      10000001
    );
  }
}
