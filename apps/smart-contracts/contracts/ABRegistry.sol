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
 * @title ABRegistry
 * @author Anotherblock Technical Team
 * @notice Registry Contract on Optimism, used to store Anotherblock drops related details
 **/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

/* Openzeppelin Contract */
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/// @dev Thrown when the caller is not authorized to call the function
error FORBIDDEN();

/// @dev Thrown when the passed parameter is invalid
error INVALID_PARAMETER();

contract ABRegistry is Ownable {
  /// @dev Address of Anotherblock Relay (used to control the streams destination based on L1 messages)
  address internal AB_RELAY;

  /// @dev Mapping storing the user balance for a given drop
  mapping(address => mapping(uint256 => uint256)) private userBalancePerDrop;

  /// @dev Mapping storing the rightholder address for a given drop
  mapping(uint256 => address) private rightHolderPerDrop;

  /**
   * @notice
   *  Contract Constructor
   *
   * @param _relay : Anotherblock Relay address
   */
  constructor(address _relay) {
    if (_relay == address(0)) revert INVALID_PARAMETER();
    AB_RELAY = _relay;
  }

  /**
   * @notice
   *  Decrement the balance of `_from` and increment the balance of `_to` for the given `_dropId`
   *
   *  This function can only be called by Anotherblock Relay Contract
   *
   * @param _from : Previous holder address
   * @param _to : New holder address
   * @param _dropId : Drop ID associated to the token transferred
   */
  function updateBalance(
    address _from,
    address _to,
    uint256 _dropId
  ) external {
    // Ensure the caller is Anotherblock Relay
    if (msg.sender != AB_RELAY) revert FORBIDDEN();

    // Decrement the balance of `_from` if it is not the zero-address
    if (_from != address(0)) userBalancePerDrop[_from][_dropId] -= 1;

    // Increment the balance of `_to` if it is not the zero-address
    if (_to != address(0)) userBalancePerDrop[_to][_dropId] += 1;
  }

  /**
   * @notice
   *  Update the `_rightholder` address for the given `_dropId`
   *
   *  This function can only be called by Anotherblock Relay Contract
   *
   * @param _dropId : Drop ID associated to the token transferred
   * @param _rightholder : Rightholder address
   */
  function updateDropRightholder(uint256 _dropId, address _rightholder)
    external
  {
    // Ensure the caller is Anotherblock Relay
    if (msg.sender != AB_RELAY) revert FORBIDDEN();

    // Ensure the `_rightholder` address is not the zero-address
    if (_rightholder == address(0)) revert INVALID_PARAMETER();

    // Update the right holder address associated to the drop ID
    rightHolderPerDrop[_dropId] = _rightholder;
  }

  /**
   * @notice
   *  Get the `_user` balance for the given `_dropId`
   *
   * @param _user user address to be queried
   * @param _dropId : Drop ID to be queried
   *
   * @return : the number of NFT corresponding the `_dropId` held by the `_user`
   */
  function getUserBalancePerDrop(address _user, uint256 _dropId)
    external
    view
    returns (uint256)
  {
    return userBalancePerDrop[_user][_dropId];
  }

  /**
   * @notice
   *  Get the rightholder address for the given `_dropId`
   *
   * @param _dropId : Drop ID to be queried
   *
   * @return : the rightholder address corresponding to `_dropId`
   */
  function getDropRightholder(uint256 _dropId) external view returns (address) {
    return rightHolderPerDrop[_dropId];
  }
}
