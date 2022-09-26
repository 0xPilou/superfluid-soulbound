/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Store, StoreInterface } from "../Store";

const _abi = [
  {
    inputs: [],
    name: "IncorrectItem",
    type: "error",
  },
  {
    inputs: [],
    name: "OutOfStock",
    type: "error",
  },
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
    name: "nbItems",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
    name: "updateItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600060015534801561001557600080fd5b5061001f33610024565b610074565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6106d4806100836000396000f3fe608060405234801561001057600080fd5b506004361061008e5760003560e01c8063144fa6d714610093578063539447d4146100a8578063715018a6146100bb5780637cbc2373146100c35780637d734863146100d65780638da5cb5b146100f2578063a212523214610112578063bfb231d214610125578063f2fde38b14610161578063fc0c546a14610174575b600080fd5b6100a66100a1366004610580565b610187565b005b6100a66100b63660046105b0565b6101fb565b6100a6610287565b6100a66100d13660046105dc565b61029b565b6100df60015481565b6040519081526020015b60405180910390f35b6100fa6103ae565b6040516001600160a01b0390911681526020016100e9565b6100a66101203660046105dc565b6103bd565b61014c6101333660046105fe565b6003602052600090815260409020805460019091015482565b604080519283526020830191909152016100e9565b6100a661016f366004610580565b61043e565b6002546100fa906001600160a01b031681565b61018f6104b7565b6001600160a01b0381166101d95760405162461bcd60e51b815260206004820152600c60248201526b7a65726f206164647265737360a01b60448201526064015b60405180910390fd5b600280546001600160a01b0319166001600160a01b0392909216919091179055565b6102036104b7565b600154831061022557604051636609430360e01b815260040160405180910390fd5b61022d610566565b82815260208082018381526000868152600383526040908190208451815591516001909201919091558051868152918201859052810183905260008051602061067f8339815191529060600160405180910390a150505050565b61028f6104b7565b6102996000610516565b565b600082815260036020526040902080548211156102cb5760405163ade1cb4160e01b815260040160405180910390fd5b60025460018201546001600160a01b0390911690639dc29fac9033906102f1908661062d565b6040516001600160e01b031960e085901b1681526001600160a01b0390921660048301526024820152604401600060405180830381600087803b15801561033757600080fd5b505af115801561034b573d6000803e3d6000fd5b5050505081816000016000828254610363919061064c565b909155505060408051338152602081018590529081018390527ff3a670cd3af7d64b488926880889d08a8585a138ff455227af6737339a1ec2629060600160405180910390a1505050565b6000546001600160a01b031690565b6103c56104b7565b6103cd610566565b82815260208082018381526001805460009081526003845260409081902085518155925192820192909255548151908152918201859052810183905260008051602061067f8339815191529060600160405180910390a16001805490600061043483610665565b9190505550505050565b6104466104b7565b6001600160a01b0381166104ab5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016101d0565b6104b481610516565b50565b336104c06103ae565b6001600160a01b0316146102995760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101d0565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b604051806040016040528060008152602001600081525090565b60006020828403121561059257600080fd5b81356001600160a01b03811681146105a957600080fd5b9392505050565b6000806000606084860312156105c557600080fd5b505081359360208301359350604090920135919050565b600080604083850312156105ef57600080fd5b50508035926020909101359150565b60006020828403121561061057600080fd5b5035919050565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561064757610647610617565b500290565b8181038181111561065f5761065f610617565b92915050565b60006001820161067757610677610617565b506001019056feba08610eb630e5169cc45f7cb0aff657b7ef15d0ea7410ad15f239b7c7640b0aa2646970667358221220a9b32838533fc842eda28b9fe2265ca306f3af79ad701bae150254b2f0a9eebf64736f6c63430008100033";

type StoreConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StoreConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Store__factory extends ContractFactory {
  constructor(...args: StoreConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Store";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Store> {
    return super.deploy(overrides || {}) as Promise<Store>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Store {
    return super.attach(address) as Store;
  }
  connect(signer: Signer): Store__factory {
    return super.connect(signer) as Store__factory;
  }
  static readonly contractName: "Store";
  public readonly contractName: "Store";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StoreInterface {
    return new utils.Interface(_abi) as StoreInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Store {
    return new Contract(address, _abi, signerOrProvider) as Store;
  }
}
