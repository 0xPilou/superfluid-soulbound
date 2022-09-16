/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { UtilityStore, UtilityStoreInterface } from "../UtilityStore";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "Redeemed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "UpdatedInventory",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "addItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "items",
    outputs: [
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
        name: "_itemId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
    ],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "setToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
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
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061002d61002261003260201b60201c565b61003a60201b60201c565b6100fe565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b610c518061010d6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638da5cb5b1161005b5780638da5cb5b146100eb578063bfb231d214610109578063f2fde38b1461013a578063fc0c546a1461015657610088565b8063144fa6d71461008d578063715018a6146100a9578063798a712a146100b35780637cbc2373146100cf575b600080fd5b6100a760048036038101906100a291906106eb565b610174565b005b6100b161022f565b005b6100cd60048036038101906100c8919061074e565b610243565b005b6100e960048036038101906100e491906107a1565b6102d3565b005b6100f361042e565b60405161010091906107f0565b60405180910390f35b610123600480360381019061011e919061080b565b610457565b604051610131929190610847565b60405180910390f35b610154600480360381019061014f91906106eb565b61047b565b005b61015e6104fe565b60405161016b91906107f0565b60405180910390f35b61017c610524565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036101eb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101e2906108cd565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b610237610524565b61024160006105a2565b565b61024b610524565b61025361066e565b8281600001818152505081816020018181525050806002600086815260200190815260200160002060008201518160000155602082015181600101559050507fba08610eb630e5169cc45f7cb0aff657b7ef15d0ea7410ad15f239b7c7640b0a8484846040516102c5939291906108ed565b60405180910390a150505050565b60006002600084815260200190815260200160002090508181600001541015610331576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032890610970565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166344d17187338360010154846000015461038491906109bf565b6040518363ffffffff1660e01b81526004016103a1929190610a76565b600060405180830381600087803b1580156103bb57600080fd5b505af11580156103cf573d6000803e3d6000fd5b50505050818160000160008282546103e79190610ab2565b925050819055507ff3a670cd3af7d64b488926880889d08a8585a138ff455227af6737339a1ec26233848460405161042193929190610ae6565b60405180910390a1505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60026020528060005260406000206000915090508060000154908060010154905082565b610483610524565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036104f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104e990610b8f565b60405180910390fd5b6104fb816105a2565b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61052c610666565b73ffffffffffffffffffffffffffffffffffffffff1661054a61042e565b73ffffffffffffffffffffffffffffffffffffffff16146105a0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059790610bfb565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b604051806040016040528060008152602001600081525090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006106b88261068d565b9050919050565b6106c8816106ad565b81146106d357600080fd5b50565b6000813590506106e5816106bf565b92915050565b60006020828403121561070157610700610688565b5b600061070f848285016106d6565b91505092915050565b6000819050919050565b61072b81610718565b811461073657600080fd5b50565b60008135905061074881610722565b92915050565b60008060006060848603121561076757610766610688565b5b600061077586828701610739565b935050602061078686828701610739565b925050604061079786828701610739565b9150509250925092565b600080604083850312156107b8576107b7610688565b5b60006107c685828601610739565b92505060206107d785828601610739565b9150509250929050565b6107ea816106ad565b82525050565b600060208201905061080560008301846107e1565b92915050565b60006020828403121561082157610820610688565b5b600061082f84828501610739565b91505092915050565b61084181610718565b82525050565b600060408201905061085c6000830185610838565b6108696020830184610838565b9392505050565b600082825260208201905092915050565b7f7a65726f20616464726573730000000000000000000000000000000000000000600082015250565b60006108b7600c83610870565b91506108c282610881565b602082019050919050565b600060208201905081810360008301526108e6816108aa565b9050919050565b60006060820190506109026000830186610838565b61090f6020830185610838565b61091c6040830184610838565b949350505050565b7f4f7574204f662053746f636b0000000000000000000000000000000000000000600082015250565b600061095a600c83610870565b915061096582610924565b602082019050919050565b600060208201905081810360008301526109898161094d565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006109ca82610718565b91506109d583610718565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610a0e57610a0d610990565b5b828202905092915050565b600082825260208201905092915050565b7f3078000000000000000000000000000000000000000000000000000000000000600082015250565b6000610a60600283610a19565b9150610a6b82610a2a565b602082019050919050565b6000606082019050610a8b60008301856107e1565b610a986020830184610838565b8181036040830152610aa981610a53565b90509392505050565b6000610abd82610718565b9150610ac883610718565b925082821015610adb57610ada610990565b5b828203905092915050565b6000606082019050610afb60008301866107e1565b610b086020830185610838565b610b156040830184610838565b949350505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000610b79602683610870565b9150610b8482610b1d565b604082019050919050565b60006020820190508181036000830152610ba881610b6c565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610be5602083610870565b9150610bf082610baf565b602082019050919050565b60006020820190508181036000830152610c1481610bd8565b905091905056fea2646970667358221220c1c97b86d5c6b0632862cd14600315c90acf7cd433ec8e468f4499471d4e766b64736f6c634300080e0033";

type UtilityStoreConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UtilityStoreConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UtilityStore__factory extends ContractFactory {
  constructor(...args: UtilityStoreConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "UtilityStore";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<UtilityStore> {
    return super.deploy(overrides || {}) as Promise<UtilityStore>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): UtilityStore {
    return super.attach(address) as UtilityStore;
  }
  connect(signer: Signer): UtilityStore__factory {
    return super.connect(signer) as UtilityStore__factory;
  }
  static readonly contractName: "UtilityStore";
  public readonly contractName: "UtilityStore";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UtilityStoreInterface {
    return new utils.Interface(_abi) as UtilityStoreInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UtilityStore {
    return new Contract(address, _abi, signerOrProvider) as UtilityStore;
  }
}
