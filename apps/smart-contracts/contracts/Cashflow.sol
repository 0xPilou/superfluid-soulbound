// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {ISuperfluid, ISuperToken, ISuperApp, ISuperAgreement, SuperAppDefinitions} from '@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol';

import {CFAv1Library} from '@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol';

import {IConstantFlowAgreementV1} from '@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol';

import {SuperAppBase} from '@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol';
import 'hardhat/console.sol';

/// @dev Constant Flow Agreement registration key, used to get the address from the host.
bytes32 constant CFA_ID = keccak256(
    'org.superfluid-finance.agreements.ConstantFlowAgreement.v1'
);

/// @dev Thrown when the receiver is the zero adress.
error InvalidReceiver();

/// @dev Thrown when receiver is also a super app.
error ReceiverIsSuperApp();

/// @dev Thrown when the callback caller is not the host.
error Unauthorized();

/// @dev Thrown when the token being streamed to this contract is invalid
error InvalidToken();

/// @dev Thrown when the agreement is other than the Constant Flow Agreement V1
error InvalidAgreement();

contract Cashflow is SuperAppBase {
    // CFA library setup
    using CFAv1Library for CFAv1Library.InitData;
    CFAv1Library.InitData public cfaV1Lib;

    /// @dev Super token that may be streamed to this contract
    ISuperToken internal immutable acceptedToken;

    mapping(uint256 => int96) public flowRates;

    constructor(ISuperfluid host, ISuperToken _acceptedToken) {
        assert(address(host) != address(0));
        assert(address(_acceptedToken) != address(0));

        acceptedToken = _acceptedToken;

        cfaV1Lib = CFAv1Library.InitData({
            host: host,
            cfa: IConstantFlowAgreementV1(
                address(host.getAgreementClass(CFA_ID))
            )
        });
    }

    modifier onlyExpected(ISuperToken superToken, address agreementClass) {
        if (superToken != acceptedToken) revert InvalidToken();
        if (agreementClass != address(cfaV1Lib.cfa)) revert InvalidAgreement();
        _;
    }

    modifier onlyHost() {
        if (msg.sender != address(cfaV1Lib.host)) revert Unauthorized();
        _;
    }

    function issueNFT(
        address receiver,
        int96 flowRate,
        uint256 tokenId
    ) external {
        _issueNFT(receiver, flowRate, tokenId);
    }

    function _issueNFT(
        address receiver,
        int96 flowRate,
        uint256 tokenId
    ) internal {
        require(receiver != address(this), 'Issue to a new address');
        require(flowRate > 0, 'flowRatee must be positive!');

        flowRates[tokenId] = flowRate;
    }

    function updateHolder(
        address oldReceiver,
        address newReceiver,
        uint256 tokenId
    ) external {
        _reduceFlow(oldReceiver, flowRates[tokenId]);
        _increaseFlow(newReceiver, flowRates[tokenId]);
    }

    function getFlow(address _receiver)
        external
        view
        returns (
            uint256 timestamp,
            int96 flowRate,
            uint256 deposit,
            uint256 owedDeposit
        )
    {
        return cfaV1Lib.cfa.getFlow(acceptedToken, address(this), _receiver);
    }

    function editNFT(
        uint256 tokenId,
        int96 flowRate,
        address receiver
    ) external {
        require(flowRate >= 0, 'flowRate must be positive!');

        if (flowRate == 0) {
            // subtract previous flowrate
            _reduceFlow(receiver, flowRates[tokenId]);
        } else {
            // add new flowRate
            _increaseFlow(receiver, flowRate - flowRates[tokenId]);
        }

        flowRates[tokenId] = flowRate;
    }

    function _reduceFlow(address to, int96 flowRate) internal {
        if (to == address(this)) return;

        (, int96 outFlowRate, , ) = cfaV1Lib.cfa.getFlow(
            acceptedToken,
            address(this),
            to
        );

        if (outFlowRate == flowRate) {
            cfaV1Lib.deleteFlow(address(this), to, acceptedToken);
        } else if (outFlowRate > flowRate) {
            // reduce the outflow by flowRate;
            // shouldn't overflow, because we just checked that it was bigger.
            cfaV1Lib.updateFlow(to, acceptedToken, outFlowRate - flowRate);
        }
        // won't do anything if outFlowRate < flowRate
    }

    //this will increase the flow or create it
    function _increaseFlow(address to, int96 flowRate) internal {
        if (to == address(0)) return;

        (, int96 outFlowRate, , ) = cfaV1Lib.cfa.getFlow(
            acceptedToken,
            address(this),
            to
        ); //returns 0 if stream doesn't exist
        if (outFlowRate == 0) {
            cfaV1Lib.createFlow(to, acceptedToken, flowRate);
        } else {
            // increase the outflow by flowRates[tokenId]
            cfaV1Lib.updateFlow(to, acceptedToken, outFlowRate + flowRate);
        }
    }
}
