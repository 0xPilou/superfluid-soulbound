/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IABDropManager,
  IABDropManagerInterface,
} from "../IABDropManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_nft",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_supply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_royaltySharePerToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rightHolderFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxAmountPerAddress",
        type: "uint256",
      },
      {
        internalType: "uint256[2]",
        name: "_salesInfo",
        type: "uint256[2]",
      },
      {
        internalType: "bytes32",
        name: "_merkle",
        type: "bytes32",
      },
    ],
    name: "create",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dropId",
        type: "uint256",
      },
    ],
    name: "drops",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "dropId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sold",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rightHolderFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "firstTokenIndex",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "price",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "supply",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "royaltySharePerToken",
                type: "uint256",
              },
            ],
            internalType: "struct IABDropManager.TokenInfo",
            name: "tokenInfo",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "privateSaleMaxMint",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "privateSaleTime",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "publicSaleMaxMint",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "publicSaleTime",
                type: "uint256",
              },
            ],
            internalType: "struct IABDropManager.SaleInfo",
            name: "salesInfo",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "currencyPayout",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "nft",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "merkleRoot",
            type: "bytes32",
          },
        ],
        internalType: "struct IABDropManager.Drop",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dropId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rightHolderFee",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "setRightHolderInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dropId",
        type: "uint256",
      },
      {
        internalType: "uint256[4]",
        name: "_saleInfo",
        type: "uint256[4]",
      },
    ],
    name: "setSalesInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dropId",
        type: "uint256",
      },
      {
        internalType: "uint256[3]",
        name: "_tokenInfo",
        type: "uint256[3]",
      },
    ],
    name: "setTokenInfo",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newTreasury",
        type: "address",
      },
    ],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dropId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
    ],
    name: "updateDropCounter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IABDropManager__factory {
  static readonly abi = _abi;
  static createInterface(): IABDropManagerInterface {
    return new utils.Interface(_abi) as IABDropManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IABDropManager {
    return new Contract(address, _abi, signerOrProvider) as IABDropManager;
  }
}
