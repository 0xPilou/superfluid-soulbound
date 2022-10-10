// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/* Openzeppelin Contract */
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/* Optimism Contracts */
import { L1CrossDomainMessenger } from "@eth-optimism/contracts/L1/messaging/L1CrossDomainMessenger.sol";
import { IL1CrossDomainMessenger } from "@eth-optimism/contracts/L1/messaging/IL1CrossDomainMessenger.sol";

/* Custom Imports */
import { IABDropManager } from "./interfaces/IABDropManager.sol";
import { IERC721AB } from "./interfaces/IERC721AB.sol";
import { ERC721ABErrors } from "./ERC721ABErrors.sol";

contract ABWrapper is ERC721, ERC721ABErrors, Ownable {
  // AB Drop Manager address
  address public dropManager;

  // AB Relay Address
  address private relay;

  // Underlying ERC-721 token address
  address private underlying;

  // L1 to L2 Messenger Contract
  IL1CrossDomainMessenger private messenger;

  // Drop Identifier
  uint256 private dropId;

  // Denominator used to calculate fees
  uint256 private constant DENOMINATOR = 1e6;

  /**
   * @notice
   *  AB Wrapper contract constructor
   *
   * @param _messenger : L1 to L2 Messenger contract address
   * @param _relay : Anotherblock Relay contract address on L2
   * @param _underlying : Underlying NFT contract address
   * @param _name : name of the NFT contract
   * @param _symbol : symbol / ticker of the NFT contract
   **/
  constructor(
    address _messenger,
    address _relay,
    address _underlying,
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) {
    messenger = L1CrossDomainMessenger(_messenger);
    relay = _relay;
    underlying = _underlying;
  }

  //     ______     __                        __   ______                 __  _
  //    / ____/  __/ /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
  //   / __/ | |/_/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
  //  / /____>  </ /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
  // /_____/_/|_|\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

  /**
   * @notice
   *  Wrap the corresponding token ID into an AB NFT token of the same ID
   *
   * @param _tokenId : token identifier to be wrapped
   */
  function wrap(uint256 _tokenId) external {
    IERC721(underlying).transferFrom(msg.sender, address(this), _tokenId);
    _safeMint(msg.sender, _tokenId);
  }

  /**
   * @notice
   *  Unwrap the corresponding AB NFT token ID into its underlying token of the same ID
   *
   * @param _tokenId : token identifier to be wrapped
   */
  function unwrap(uint256 _tokenId) external {
    IERC721(address(this)).transferFrom(msg.sender, address(this), _tokenId);
    IERC721(underlying).transferFrom(address(this), msg.sender, _tokenId);
    _burn(_tokenId);
  }

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
    // Check that the new address corresponds to IABDropManager interface
    if (
      !ERC165Checker.supportsInterface(
        _dropManager,
        type(IABDropManager).interfaceId
      )
    ) revert IncorrectInterface();
    dropManager = _dropManager;
  }

  //     ____      __                        __   ______                 __  _
  //    /  _/___  / /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
  //    / // __ \/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
  //  _/ // / / / /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
  // /___/_/ /_/\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

  /**
   * @dev See {ERC721-beforeTokenTransfer}.
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
        dropId
      ),
      10000001
    );
  }
}
