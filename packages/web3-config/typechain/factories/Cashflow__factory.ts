/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Cashflow, CashflowInterface } from "../Cashflow";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ISuperfluid",
        name: "host",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "_setAllowedId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "afterAgreementCreated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "afterAgreementTerminated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "afterAgreementUpdated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "beforeAgreementCreated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "beforeAgreementTerminated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "beforeAgreementUpdated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cfaV1Lib",
    outputs: [
      {
        internalType: "contract ISuperfluid",
        name: "host",
        type: "address",
      },
      {
        internalType: "contract IConstantFlowAgreementV1",
        name: "cfa",
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
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "int96",
        name: "flowRate",
        type: "int96",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "editNFT",
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
    name: "flowRates",
    outputs: [
      {
        internalType: "int96",
        name: "",
        type: "int96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAcceptedToken",
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
        name: "_receiver",
        type: "address",
      },
    ],
    name: "getFlow",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "int96",
        name: "flowRate",
        type: "int96",
      },
      {
        internalType: "uint256",
        name: "deposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "owedDeposit",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_id",
        type: "bytes32",
      },
    ],
    name: "isAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "int96",
        name: "flowRate",
        type: "int96",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "issueNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lastAllowedID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_acceptedToken",
        type: "address",
      },
    ],
    name: "setAcceptedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "oldReceiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "newReceiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "updateHolder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051620013043803806200130483398101604081905261003191610139565b6001600160a01b0381166100475761004761015d565b6040805180820182526001600160a01b0383168082529151635b69006f60e11b81527fa9214cc96615e0085d3bb077758db69497dc2dce3b2b1e97bc93c3d18d83efd360048201529091602083019163b6d200de90602401602060405180830381865afa1580156100bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100e09190610139565b6001600160a01b039081169091528151600080546001600160a01b031990811692841692909217905560209092015160018054909316911617905550610173565b6001600160a01b038116811461013657600080fd5b50565b60006020828403121561014b57600080fd5b815161015681610121565b9392505050565b634e487b7160e01b600052600160045260246000fd5b61118180620001836000396000f3fe608060405234801561001057600080fd5b50600436106100db5760003560e01c806306fa0220146100e0578063230dbd29146100f557806330d9c9151461011e5780634ab847711461013157806353c11f991461014457806355586a31146101575780635f9e7d771461017f5780637141ca4a146101925780637487f528146101a557806378755295146101b857806379bcb8df146101eb578063884d1f40146102215780639516838214610234578063a18f4ba01461026a578063c9e0817214610285578063cce2d71014610298578063d86ed3e5146102af575b600080fd5b6100f36100ee366004610b95565b6102c2565b005b610108610103366004610c1e565b6102d2565b6040516101159190610d38565b60405180910390f35b61010861012c366004610d52565b610327565b6100f361013f366004610df0565b610378565b610108610152366004610c1e565b6103b2565b600054600154610171916001600160a01b03908116911682565b604051610115929190610e20565b61010861018d366004610d52565b610405565b6100f36101a0366004610e3a565b61046c565b6100f36101b3366004610e7c565b610540565b6101db6101c6366004610e99565b60009081526004602052604090205460ff1690565b6040519015158152602001610115565b61020e6101f9366004610e99565b600360205260009081526040902054600b0b81565b604051600b9190910b8152602001610115565b61010861022f366004610d52565b610578565b610247610242366004610e7c565b6105c9565b60408051948552600b9390930b6020850152918301526060820152608001610115565b6002546040516001600160a01b039091168152602001610115565b6100f3610293366004610e7c565b61065b565b6102a160055481565b604051908152602001610115565b6101086102bd366004610c1e565b6106a6565b6102cd8383836106f6565b505050565b60405162461bcd60e51b815260206004820152602e602482015260008051602061112c83398151915260448201526d19595b595b9d08155c19185d195960921b60648201526060906084015b60405180910390fd5b60405162461bcd60e51b815260206004820152602f602482015260008051602061110c83398151915260448201526e1c99595b595b9d0810dc99585d1959608a1b606482015260609060840161031e565b600081815260036020526040902054610395908490600b0b6107c7565b6000818152600360205260409020546102cd908390600b0b6108ba565b60405162461bcd60e51b8152602060048201526031602482015260008051602061112c83398151915260448201527019595b595b9d0815195c9b5a5b985d1959607a1b606482015260609060840161031e565b60405162461bcd60e51b815260206004820152603360248201527f556e737570706f727465642063616c6c6261636b202d20204265666f7265204160448201527219dc99595b595b9d0815195c9b5a5b985d1959606a1b606482015260609060840161031e565b600082600b0b12156104bd5760405162461bcd60e51b815260206004820152601a602482015279666c6f7752617465206d75737420626520706f7369746976652160301b604482015260640161031e565b81600b0b6000036104ea576000838152600360205260409020546104e5908290600b0b6107c7565b610511565b60008381526003602052604090205461051190829061050c90600b0b85610ec8565b6108ba565b5060009182526003602052604090912080546001600160601b0319166001600160601b03909216919091179055565b6001600160a01b03811661055657610556610efb565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b60405162461bcd60e51b815260206004820152602f602482015260008051602061110c83398151915260448201526e1c99595b595b9d081d5c19185d1959608a1b606482015260609060840161031e565b600154600254604051631cd43d1160e31b81526000928392839283926001600160a01b039081169263e6a1e8889261060b929091169030908a90600401610f11565b608060405180830381865afa158015610628573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061064c9190610f34565b93509350935093509193509193565b60003082604051602001610670929190610e20565b60408051601f198184030181529181528151602092830120600081815260049093529120805460ff191660011790556005555050565b60405162461bcd60e51b815260206004820152602e602482015260008051602061112c83398151915260448201526d19595b595b9d0810dc99585d195960921b606482015260609060840161031e565b306001600160a01b038416036107475760405162461bcd60e51b8152602060048201526016602482015275497373756520746f2061206e6577206164647265737360501b604482015260640161031e565b600082600b0b136107985760405162461bcd60e51b815260206004820152601b60248201527a666c6f775261746565206d75737420626520706f7369746976652160281b604482015260640161031e565b600090815260036020526040902080546001600160601b0319166001600160601b039290921691909117905550565b306001600160a01b038316036107db575050565b600154600254604051631cd43d1160e31b81526000926001600160a01b039081169263e6a1e88892610817929091169030908890600401610f11565b608060405180830381865afa158015610834573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108589190610f34565b505091505081600b0b81600b0b03610886576002546102cd90600090309086906001600160a01b031661097f565b81600b0b81600b0b13156102cd576002546102cd9084906001600160a01b03166108b08585610ec8565b60009291906109a5565b6001600160a01b0382166108cc575050565b600154600254604051631cd43d1160e31b81526000926001600160a01b039081169263e6a1e88892610908929091169030908890600401610f11565b608060405180830381865afa158015610925573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109499190610f34565b505091505080600b0b600003610963576102cd83836109c5565b6002546102cd9084906001600160a01b03166108b08585610f72565b60408051600081526020810190915261099f9085908590859085906109e4565b50505050565b60408051600081526020810190915261099f908590859085908590610ac3565b6002546109e09060009084906001600160a01b031684610b27565b5050565b845460018601546040805160008152602081019091526001600160a01b03928316926339255d5b921690819063b4b333c690610a299088908b908b9060448101610fb5565b60408051808303601f1901815291815260208201805160e094851b6001600160e01b03909116179052519185901b6001600160e01b0319168252610a74939250908690600401610ff3565b6000604051808303816000875af1158015610a93573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610abb9190810190611029565b505050505050565b845460018601546001600160a01b03918216916339255d5b9116806350209a6287898860005b6040519080825280601f01601f191660200182016040528015610b13576020820181803683370190505b50604051602401610a2994939291906110d5565b6040805160008082526020820190925261099f91869186918691869150845460018601546001600160a01b03918216916339255d5b9116806362fc305e8789886000610ae9565b6001600160a01b0381168114610b8357600080fd5b50565b80600b0b8114610b8357600080fd5b600080600060608486031215610baa57600080fd5b8335610bb581610b6e565b92506020840135610bc581610b86565b929592945050506040919091013590565b60008083601f840112610be857600080fd5b5081356001600160401b03811115610bff57600080fd5b602083019150836020828501011115610c1757600080fd5b9250929050565b600080600080600080600080600060c08a8c031215610c3c57600080fd5b8935610c4781610b6e565b985060208a0135610c5781610b6e565b975060408a0135965060608a01356001600160401b0380821115610c7a57600080fd5b610c868d838e01610bd6565b909850965060808c0135915080821115610c9f57600080fd5b610cab8d838e01610bd6565b909650945060a08c0135915080821115610cc457600080fd5b50610cd18c828d01610bd6565b915080935050809150509295985092959850929598565b60005b83811015610d03578181015183820152602001610ceb565b50506000910152565b60008151808452610d24816020860160208601610ce8565b601f01601f19169290920160200192915050565b602081526000610d4b6020830184610d0c565b9392505050565b600080600080600080600060a0888a031215610d6d57600080fd5b8735610d7881610b6e565b96506020880135610d8881610b6e565b95506040880135945060608801356001600160401b0380821115610dab57600080fd5b610db78b838c01610bd6565b909650945060808a0135915080821115610dd057600080fd5b50610ddd8a828b01610bd6565b989b979a50959850939692959293505050565b600080600060608486031215610e0557600080fd5b8335610e1081610b6e565b92506020840135610bc581610b6e565b6001600160a01b0392831681529116602082015260400190565b600080600060608486031215610e4f57600080fd5b833592506020840135610e6181610b86565b91506040840135610e7181610b6e565b809150509250925092565b600060208284031215610e8e57600080fd5b8135610d4b81610b6e565b600060208284031215610eab57600080fd5b5035919050565b634e487b7160e01b600052601160045260246000fd5b600b82810b9082900b0360016001605f1b0319811260016001605f1b0382131715610ef557610ef5610eb2565b92915050565b634e487b7160e01b600052600160045260246000fd5b6001600160a01b0393841681529183166020830152909116604082015260600190565b60008060008060808587031215610f4a57600080fd5b845193506020850151610f5c81610b86565b6040860151606090960151949790965092505050565b600b81810b9083900b0160016001605f1b03811360016001605f1b031982121715610ef557610ef5610eb2565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038581168252848116602083015283166040820152608060608201819052600090610fe990830184610d0c565b9695505050505050565b6001600160a01b038416815260606020820181905260009061101790830185610d0c565b8281036040840152610fe98185610d0c565b60006020828403121561103b57600080fd5b81516001600160401b038082111561105257600080fd5b818401915084601f83011261106657600080fd5b81518181111561107857611078610f9f565b604051601f8201601f19908116603f011681019083821181831017156110a0576110a0610f9f565b816040528281528760208487010111156110b957600080fd5b6110ca836020830160208801610ce8565b979650505050505050565b6001600160a01b03858116825284166020820152600b83900b6040820152608060608201819052600090610fe990830184610d0c56fe556e737570706f727465642063616c6c6261636b202d204265666f7265204167556e737570706f727465642063616c6c6261636b202d20416674657220416772a26469706673582212201890845e865c6fa5b665e0ab9f8531f32f6ddd275096e269465aca762d09239d64736f6c63430008100033";

type CashflowConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CashflowConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Cashflow__factory extends ContractFactory {
  constructor(...args: CashflowConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Cashflow";
  }

  deploy(
    host: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Cashflow> {
    return super.deploy(host, overrides || {}) as Promise<Cashflow>;
  }
  getDeployTransaction(
    host: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(host, overrides || {});
  }
  attach(address: string): Cashflow {
    return super.attach(address) as Cashflow;
  }
  connect(signer: Signer): Cashflow__factory {
    return super.connect(signer) as Cashflow__factory;
  }
  static readonly contractName: "Cashflow";
  public readonly contractName: "Cashflow";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CashflowInterface {
    return new utils.Interface(_abi) as CashflowInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Cashflow {
    return new Contract(address, _abi, signerOrProvider) as Cashflow;
  }
}
