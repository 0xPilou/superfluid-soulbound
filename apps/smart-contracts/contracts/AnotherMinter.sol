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
 * @title AnotherMinter
 * @author Anotherblock Technical Team
 * @notice Anotherblock NFT contract
 **/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/* Openzeppelin Contract */
import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import { ERC721ABv2 } from "./ERC721ABv2.sol";
import { IABDropManager } from "./interfaces/IABDropManager.sol";
import { ERC721ABErrors } from "./ERC721ABErrors.sol";

contract AnotherMinter is ERC721ABv2, ERC721ABErrors {
  // Base Token URI
  string private baseTokenURI;

  // Denominator used to calculate fees
  uint256 private constant DENOMINATOR = 1e6;

  mapping(uint256 => IABDropManager.Phase[]) public phasesPerDrop;

  // Stores the amounts of tokens minted per address and per drop for the public sale
  mapping(uint256 => mapping(address => mapping(uint256 => uint256)))
    public mintedPerDropPerPhase;

  /**
   * @notice
   *  AnotherMinter contract constructor
   *
   * @param _dropManager : Drop Manager contract address
   * @param _messenger : L2 Messenger contract address
   * @param _relay : Anotherblock Relay contract address (L1 -> L2 message)
   * @param _baseUri : base token URI
   * @param _name : name of the NFT contract
   * @param _symbol : symbol / ticker of the NFT contract
   **/
  constructor(
    address _dropManager,
    address _messenger,
    address _relay,
    string memory _baseUri,
    string memory _name,
    string memory _symbol
  ) ERC721ABv2(_dropManager, _messenger, _relay, _name, _symbol) {
    // Sets the base token URI
    baseTokenURI = _baseUri;
  }

  //     ______     __                        __   ______                 __  _
  //    / ____/  __/ /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
  //   / __/ | |/_/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
  //  / /____>  </ /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
  // /_____/_/|_|\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

  /**
   * @notice
   *  Let a whitelisted user mint `_quantity` token(s) of the given `_dropId`
   *
   * @param _to : address to receive the token
   * @param _dropId : drop identifier
   * @param _quantity : amount of tokens to be minted
   * @param _proof : merkle tree proof used to verify whitelisted user
   */
  function mint(
    address _to,
    uint256 _dropId,
    uint256 _quantity,
    bytes32[] memory _proof
  ) external payable {
    _mintAB(_to, _dropId, _quantity, _proof);
  }

  /**
   * @notice
   *  Withdraw mint proceeds to Anotherblock Treasury address
   *
   */
  function withdrawAll() external {
    (bool success, ) = IABDropManager(dropManager).treasury().call{
      value: address(this).balance
    }("");
    if (!success) revert TransferFailed();
  }

  /**
   * @notice
   *  Set the sale phases for drop `_dropId`
   *
   * @param _dropId : drop identifier
   * @param _phases : array of phases to be set
   */
  function setDropPhases(uint256 _dropId, IABDropManager.Phase[] memory _phases)
    external
  {
    if (msg.sender != dropManager) revert Forbidden();

    for (uint256 i = 0; i < _phases.length; ++i) {
      phasesPerDrop[_dropId].push(_phases[i]);
    }
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
   *  Update the Base URI
   *  Only the contract owner can perform this operation
   *
   * @param _newBaseURI : new base URI
   */
  function setBaseURI(string calldata _newBaseURI) external onlyOwner {
    baseTokenURI = _newBaseURI;
  }

  //     ____      __                        __   ______                 __  _
  //    /  _/___  / /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
  //    / // __ \/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
  //  _/ // / / / /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
  // /___/_/ /_/\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

  /**
   * @notice
   *  Let a whitelisted user mint `_quantity` token(s) of the given `_dropId`
   *
   * @param _to : recipient address
   * @param _dropId : drop identifier
   * @param _quantity : amount of tokens to be minted
   * @param _proof : merkle tree proof used to verify whitelisted user
   */
  function _mintAB(
    address _to,
    uint256 _dropId,
    uint256 _quantity,
    bytes32[] memory _proof
  ) internal virtual {
    IABDropManager.Drop memory drop = IABDropManager(dropManager).drops(
      _dropId
    );

    // Check if the drop is not sold-out
    if (drop.sold == drop.tokenInfo.supply) revert DropSoldOut();

    // Check that there are enough tokens available for sale
    if (drop.sold + _quantity > drop.tokenInfo.supply)
      revert NotEnoughTokensAvailable();

    // Check that user is sending the correct amount of ETH (will revert if user send too much or not enough)
    if (msg.value != drop.tokenInfo.price * _quantity)
      revert IncorrectETHSent();

    IABDropManager.Phase[] memory phases = phasesPerDrop[_dropId];

    // Check that the first phase has started (revert otherwise)
    if (block.timestamp < phases[0].phaseStart) revert SaleNotStarted();

    uint256 currentPhase = 0;

    // Detect the current phase
    for (uint256 i = 1; i < phases.length; ++i) {
      if (block.timestamp >= phases[i].phaseStart) {
        currentPhase = i;
      }
    }

    // Check that user did not mint the maximum amount per address for the current phase
    if (
      mintedPerDropPerPhase[drop.dropId][_to][currentPhase] + _quantity >
      phases[currentPhase].maxMint
    ) revert MaxMintPerAddress();

    // If the current phase is public sale (merkle = 0x0), bypass merkle verification
    if (phases[currentPhase].merkle != 0x0) {
      bool isWhitelisted = MerkleProof.verify(
        _proof,
        phases[currentPhase].merkle,
        keccak256(abi.encodePacked(_to))
      );

      // Revert if user is not whitelisted
      if (!isWhitelisted) {
        revert NotInMerkle();
      }
    }
    mintedPerDropPerPhase[drop.dropId][_to][currentPhase] += _quantity;

    uint256 tokenIndex;
    for (uint256 i = 0; i < _quantity; ++i) {
      tokenIndex = uint256(keccak256(abi.encodePacked(drop.sold + i, _dropId)));
      dropIdPerToken[tokenIndex] = drop.dropId;
      _safeMint(_to, tokenIndex);
    }

    IABDropManager(dropManager).updateDropCounter(_dropId, _quantity);

    // Send Right Holder Fee to the owner address
    if (msg.value > 0) {
      uint256 feeToRightHolder = (msg.value * drop.rightHolderFee) /
        DENOMINATOR;
      if (feeToRightHolder > 0) {
        (bool success, ) = drop.owner.call{ value: feeToRightHolder }("");
        if (!success) revert TransferFailed();
      }
    }
  }

  /**
   * @notice
   *  Returns the base URI
   *
   * @return baseTokenURI base token URI state
   */
  function _baseURI() internal view virtual override returns (string memory) {
    return baseTokenURI;
  }
}
