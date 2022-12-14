/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IABToken, IABTokenInterface } from "../IABToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_store",
        type: "address",
      },
    ],
    name: "setStore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IABToken__factory {
  static readonly abi = _abi;
  static createInterface(): IABTokenInterface {
    return new utils.Interface(_abi) as IABTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IABToken {
    return new Contract(address, _abi, signerOrProvider) as IABToken;
  }
}
