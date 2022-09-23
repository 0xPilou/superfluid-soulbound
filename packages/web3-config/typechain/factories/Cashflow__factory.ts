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
  "0x608060405234801561001057600080fd5b506040516200130a3803806200130a83398101604081905261003191610139565b6001600160a01b0381166100475761004761015d565b6040805180820182526001600160a01b0383168082529151635b69006f60e11b81527fa9214cc96615e0085d3bb077758db69497dc2dce3b2b1e97bc93c3d18d83efd360048201529091602083019163b6d200de90602401602060405180830381865afa1580156100bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100e09190610139565b6001600160a01b039081169091528151600080546001600160a01b031990811692841692909217905560209092015160018054909316911617905550610173565b6001600160a01b038116811461013657600080fd5b50565b60006020828403121561014b57600080fd5b815161015681610121565b9392505050565b634e487b7160e01b600052600160045260246000fd5b61118780620001836000396000f3fe608060405234801561001057600080fd5b50600436106100db5760003560e01c806306fa0220146100e0578063230dbd29146100f557806330d9c9151461011e5780634ab847711461013157806353c11f991461014457806355586a31146101575780635f9e7d77146101915780637141ca4a146101a45780637487f528146101b757806378755295146101ca57806379bcb8df146101fd578063884d1f40146102335780639516838214610246578063a18f4ba01461027c578063c9e0817214610297578063cce2d71014610303578063d86ed3e51461031a575b600080fd5b6100f36100ee366004610bb5565b61032d565b005b610108610103366004610c3e565b61033d565b6040516101159190610d58565b60405180910390f35b61010861012c366004610d72565b610392565b6100f361013f366004610e10565b6103e3565b610108610152366004610c3e565b61041d565b600054600154610171916001600160a01b03908116911682565b604080516001600160a01b03938416815292909116602083015201610115565b61010861019f366004610d72565b610470565b6100f36101b2366004610e40565b6104d7565b6100f36101c5366004610e82565b6105ab565b6101ed6101d8366004610e9f565b60009081526004602052604090205460ff1690565b6040519015158152602001610115565b61022061020b366004610e9f565b600360205260009081526040902054600b0b81565b604051600b9190910b8152602001610115565b610108610241366004610d72565b6105e3565b610259610254366004610e82565b610634565b60408051948552600b9390930b6020850152918301526060820152608001610115565b6002546040516001600160a01b039091168152602001610115565b6100f36102a5366004610e82565b6040516001600160601b031930606090811b8216602084015283901b16603482015260009060480160408051601f198184030181529181528151602092830120600081815260049093529120805460ff191660011790556005555050565b61030c60055481565b604051908152602001610115565b610108610328366004610c3e565b6106c6565b610338838383610716565b505050565b60405162461bcd60e51b815260206004820152602e602482015260008051602061113283398151915260448201526d19595b595b9d08155c19185d195960921b60648201526060906084015b60405180910390fd5b60405162461bcd60e51b815260206004820152602f602482015260008051602061111283398151915260448201526e1c99595b595b9d0810dc99585d1959608a1b6064820152606090608401610389565b600081815260036020526040902054610400908490600b0b6107e7565b600081815260036020526040902054610338908390600b0b6108da565b60405162461bcd60e51b8152602060048201526031602482015260008051602061113283398151915260448201527019595b595b9d0815195c9b5a5b985d1959607a1b6064820152606090608401610389565b60405162461bcd60e51b815260206004820152603360248201527f556e737570706f727465642063616c6c6261636b202d20204265666f7265204160448201527219dc99595b595b9d0815195c9b5a5b985d1959606a1b6064820152606090608401610389565b600082600b0b12156105285760405162461bcd60e51b815260206004820152601a602482015279666c6f7752617465206d75737420626520706f7369746976652160301b6044820152606401610389565b81600b0b60000361055557600083815260036020526040902054610550908290600b0b6107e7565b61057c565b60008381526003602052604090205461057c90829061057790600b0b85610ece565b6108da565b5060009182526003602052604090912080546001600160601b0319166001600160601b03909216919091179055565b6001600160a01b0381166105c1576105c1610f01565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b60405162461bcd60e51b815260206004820152602f602482015260008051602061111283398151915260448201526e1c99595b595b9d081d5c19185d1959608a1b6064820152606090608401610389565b600154600254604051631cd43d1160e31b81526000928392839283926001600160a01b039081169263e6a1e88892610676929091169030908a90600401610f17565b608060405180830381865afa158015610693573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b79190610f3a565b93509350935093509193509193565b60405162461bcd60e51b815260206004820152602e602482015260008051602061113283398151915260448201526d19595b595b9d0810dc99585d195960921b6064820152606090608401610389565b306001600160a01b038416036107675760405162461bcd60e51b8152602060048201526016602482015275497373756520746f2061206e6577206164647265737360501b6044820152606401610389565b600082600b0b136107b85760405162461bcd60e51b815260206004820152601b60248201527a666c6f775261746565206d75737420626520706f7369746976652160281b6044820152606401610389565b600090815260036020526040902080546001600160601b0319166001600160601b039290921691909117905550565b306001600160a01b038316036107fb575050565b600154600254604051631cd43d1160e31b81526000926001600160a01b039081169263e6a1e88892610837929091169030908890600401610f17565b608060405180830381865afa158015610854573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108789190610f3a565b505091505081600b0b81600b0b036108a65760025461033890600090309086906001600160a01b031661099f565b81600b0b81600b0b1315610338576002546103389084906001600160a01b03166108d08585610ece565b60009291906109c5565b6001600160a01b0382166108ec575050565b600154600254604051631cd43d1160e31b81526000926001600160a01b039081169263e6a1e88892610928929091169030908890600401610f17565b608060405180830381865afa158015610945573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109699190610f3a565b505091505080600b0b6000036109835761033883836109e5565b6002546103389084906001600160a01b03166108d08585610f78565b6040805160008152602081019091526109bf908590859085908590610a04565b50505050565b6040805160008152602081019091526109bf908590859085908590610ae3565b600254610a009060009084906001600160a01b031684610b47565b5050565b845460018601546040805160008152602081019091526001600160a01b03928316926339255d5b921690819063b4b333c690610a499088908b908b9060448101610fbb565b60408051808303601f1901815291815260208201805160e094851b6001600160e01b03909116179052519185901b6001600160e01b0319168252610a94939250908690600401610ff9565b6000604051808303816000875af1158015610ab3573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610adb919081019061102f565b505050505050565b845460018601546001600160a01b03918216916339255d5b9116806350209a6287898860005b6040519080825280601f01601f191660200182016040528015610b33576020820181803683370190505b50604051602401610a4994939291906110db565b604080516000808252602082019092526109bf91869186918691869150845460018601546001600160a01b03918216916339255d5b9116806362fc305e8789886000610b09565b6001600160a01b0381168114610ba357600080fd5b50565b80600b0b8114610ba357600080fd5b600080600060608486031215610bca57600080fd5b8335610bd581610b8e565b92506020840135610be581610ba6565b929592945050506040919091013590565b60008083601f840112610c0857600080fd5b5081356001600160401b03811115610c1f57600080fd5b602083019150836020828501011115610c3757600080fd5b9250929050565b600080600080600080600080600060c08a8c031215610c5c57600080fd5b8935610c6781610b8e565b985060208a0135610c7781610b8e565b975060408a0135965060608a01356001600160401b0380821115610c9a57600080fd5b610ca68d838e01610bf6565b909850965060808c0135915080821115610cbf57600080fd5b610ccb8d838e01610bf6565b909650945060a08c0135915080821115610ce457600080fd5b50610cf18c828d01610bf6565b915080935050809150509295985092959850929598565b60005b83811015610d23578181015183820152602001610d0b565b50506000910152565b60008151808452610d44816020860160208601610d08565b601f01601f19169290920160200192915050565b602081526000610d6b6020830184610d2c565b9392505050565b600080600080600080600060a0888a031215610d8d57600080fd5b8735610d9881610b8e565b96506020880135610da881610b8e565b95506040880135945060608801356001600160401b0380821115610dcb57600080fd5b610dd78b838c01610bf6565b909650945060808a0135915080821115610df057600080fd5b50610dfd8a828b01610bf6565b989b979a50959850939692959293505050565b600080600060608486031215610e2557600080fd5b8335610e3081610b8e565b92506020840135610be581610b8e565b600080600060608486031215610e5557600080fd5b833592506020840135610e6781610ba6565b91506040840135610e7781610b8e565b809150509250925092565b600060208284031215610e9457600080fd5b8135610d6b81610b8e565b600060208284031215610eb157600080fd5b5035919050565b634e487b7160e01b600052601160045260246000fd5b600b82810b9082900b0360016001605f1b0319811260016001605f1b0382131715610efb57610efb610eb8565b92915050565b634e487b7160e01b600052600160045260246000fd5b6001600160a01b0393841681529183166020830152909116604082015260600190565b60008060008060808587031215610f5057600080fd5b845193506020850151610f6281610ba6565b6040860151606090960151949790965092505050565b600b81810b9083900b0160016001605f1b03811360016001605f1b031982121715610efb57610efb610eb8565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038581168252848116602083015283166040820152608060608201819052600090610fef90830184610d2c565b9695505050505050565b6001600160a01b038416815260606020820181905260009061101d90830185610d2c565b8281036040840152610fef8185610d2c565b60006020828403121561104157600080fd5b81516001600160401b038082111561105857600080fd5b818401915084601f83011261106c57600080fd5b81518181111561107e5761107e610fa5565b604051601f8201601f19908116603f011681019083821181831017156110a6576110a6610fa5565b816040528281528760208487010111156110bf57600080fd5b6110d0836020830160208801610d08565b979650505050505050565b6001600160a01b03858116825284166020820152600b83900b6040820152608060608201819052600090610fef90830184610d2c56fe556e737570706f727465642063616c6c6261636b202d204265666f7265204167556e737570706f727465642063616c6c6261636b202d20416674657220416772a2646970667358221220d84d94b2e3cd81d3e8c95a1493dba9bd8112e88d78a914e53fd74dad0ee29e0064736f6c63430008100033";

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
