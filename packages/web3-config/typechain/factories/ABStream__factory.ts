/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ABStream, ABStreamInterface } from "../ABStream";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ISuperfluid",
        name: "_host",
        type: "address",
      },
      {
        internalType: "address",
        name: "_relay",
        type: "address",
      },
      {
        internalType: "address",
        name: "_registry",
        type: "address",
      },
      {
        internalType: "int96",
        name: "_baseFlow",
        type: "int96",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "FORBIDDEN",
    type: "error",
  },
  {
    inputs: [],
    name: "INVALID_PARAMETER",
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
    inputs: [],
    name: "baseFlow",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "boosts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256[]",
            name: "dropIds",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "quantities",
            type: "uint256[]",
          },
        ],
        internalType: "struct ABStream.Condition",
        name: "condition",
        type: "tuple",
      },
      {
        internalType: "int96",
        name: "increase",
        type: "int96",
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
    inputs: [],
    name: "getABRelay",
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
    inputs: [],
    name: "getABToken",
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
        name: "_ABToken",
        type: "address",
      },
    ],
    name: "setABToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int96",
        name: "_baseFlow",
        type: "int96",
      },
    ],
    name: "setBaseFlow",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "_previousReceiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "_newReceiver",
        type: "address",
      },
    ],
    name: "updateStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620014fc380380620014fc8339810160408190526200003491620001fa565b6200003f3362000191565b600081600b0b1315806200005a57506001600160a01b038416155b806200006d57506001600160a01b038316155b156200008c57604051632627b42d60e11b815260040160405180910390fd5b6040805180820182526001600160a01b0386168082529151635b69006f60e11b81527fa9214cc96615e0085d3bb077758db69497dc2dce3b2b1e97bc93c3d18d83efd360048201529091602083019163b6d200de90602401602060405180830381865afa15801562000102573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000128919062000268565b6001600160a01b039081169091528151600180549183166001600160a01b03199283161790556020909201516002805491831691841691909117905560048054948216949092169390931790556001600160601b0316600160a01b02911617600555506200028f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b0381168114620001f757600080fd5b50565b600080600080608085870312156200021157600080fd5b84516200021e81620001e1565b60208601519094506200023181620001e1565b60408601519093506200024481620001e1565b80925050606085015180600b0b81146200025d57600080fd5b939692955090935050565b6000602082840312156200027b57600080fd5b81516200028881620001e1565b9392505050565b61125d806200029f6000396000f3fe608060405234801561001057600080fd5b50600436106100e65760003560e01c8063230dbd29146100eb57806330d9c915146101145780634634cc3e146101275780634afd82e71461013c57806353c11f991461015d57806355586a31146101705780635f9e7d77146101aa578063715018a6146101bd578063884d1f40146101c55780638da5cb5b146101d857806395168382146101ed578063957004d8146102235780639e2d373d1461024a578063b1ec46f81461025d578063d86ed3e51461026e578063ec4cbea614610281578063ef0dc83714610294578063f2fde38b146102a5575b600080fd5b6100fe6100f9366004610c9c565b6102b8565b60405161010b9190610db6565b60405180910390f35b6100fe610122366004610dd0565b61030d565b61013a610135366004610e7d565b61035e565b005b61014f61014a366004610e9a565b6103b2565b60405161010b929190610eee565b6100fe61016b366004610c9c565b610497565b60015460025461018a916001600160a01b03908116911682565b604080516001600160a01b0393841681529290911660208301520161010b565b6100fe6101b8366004610dd0565b6104ea565b61013a610551565b6100fe6101d3366004610dd0565b610565565b6101e06105b6565b60405161010b9190610f3a565b6102006101fb366004610f4e565b6105c5565b60408051948552600b9390930b602085015291830152606082015260800161010b565b60055461023790600160a01b9004600b0b81565b604051600b9190910b815260200161010b565b61013a610258366004610f6b565b610657565b6005546001600160a01b03166101e0565b6100fe61027c366004610c9c565b6106fa565b61013a61028f366004610f4e565b61074a565b6003546001600160a01b03166101e0565b61013a6102b3366004610f4e565b61079b565b60405162461bcd60e51b815260206004820152602e602482015260008051602061120883398151915260448201526d19595b595b9d08155c19185d195960921b60648201526060906084015b60405180910390fd5b60405162461bcd60e51b815260206004820152602f60248201526000805160206111e883398151915260448201526e1c99595b595b9d0810dc99585d1959608a1b6064820152606090608401610304565b610366610814565b600081600b0b1361038a57604051632627b42d60e11b815260040160405180910390fd5b600580546001600160601b03909216600160a01b026001600160a01b03909216919091179055565b600681815481106103c257600080fd5b600091825260209182902060408051600390930290910180546060948102840185018352918301828152909450919284928492909184919084018282801561042957602002820191906000526020600020905b815481526020019060010190808311610415575b505050505081526020016001820180548060200260200160405190810160405280929190818152602001828054801561048157602002820191906000526020600020905b81548152602001906001019080831161046d575b50505091909252505050600290910154600b0b82565b60405162461bcd60e51b8152602060048201526031602482015260008051602061120883398151915260448201527019595b595b9d0815195c9b5a5b985d1959607a1b6064820152606090608401610304565b60405162461bcd60e51b815260206004820152603360248201527f556e737570706f727465642063616c6c6261636b202d20204265666f7265204160448201527219dc99595b595b9d0815195c9b5a5b985d1959606a1b6064820152606090608401610304565b610559610814565b6105636000610873565b565b60405162461bcd60e51b815260206004820152602f60248201526000805160206111e883398151915260448201526e1c99595b595b9d081d5c19185d1959608a1b6064820152606090608401610304565b6000546001600160a01b031690565b600254600354604051631cd43d1160e31b81526000928392839283926001600160a01b039081169263e6a1e88892610607929091169030908a90600401610fa4565b608060405180830381865afa158015610624573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106489190610fc7565b93509350935093509193509193565b6005546001600160a01b031633146106825760405163036be76f60e61b815260040160405180910390fd5b600354604051634dcfa0af60e11b81526001600160a01b0390911690639b9f415e906106b2908490600401610f3a565b600060405180830381600087803b1580156106cc57600080fd5b505af11580156106e0573d6000803e3d6000fd5b505050506106ed826108c3565b6106f681610967565b5050565b60405162461bcd60e51b815260206004820152602e602482015260008051602061120883398151915260448201526d19595b595b9d0810dc99585d195960921b6064820152606090608401610304565b610752610814565b6001600160a01b03811661077957604051632627b42d60e11b815260040160405180910390fd5b600380546001600160a01b0319166001600160a01b0392909216919091179055565b6107a3610814565b6001600160a01b0381166108085760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610304565b61081181610873565b50565b3361081d6105b6565b6001600160a01b0316146105635760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610304565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b306001600160a01b038216036108d65750565b60006108e1826109e4565b600554909150600160a01b9004600b90810b9082900b03610918576003546106f690600190309085906001600160a01b0316610a6c565b600554600160a01b9004600b90810b9082900b13156106f6576003546005546106f69184916001600160a01b039091169061095d90600160a01b9004600b0b8561101b565b6001929190610a92565b6001600160a01b0381166109785750565b6000610983826109e4565b905080600b0b6000036109b8576003546005546106f69160019185916001600160a01b031690600160a01b9004600b0b610ab2565b6003546005546106f69184916001600160a01b039091169061095d90600160a01b9004600b0b8561104e565b600254600354604051631cd43d1160e31b815260009283926001600160a01b039182169263e6a1e88892610a2092169030908890600401610fa4565b608060405180830381865afa158015610a3d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a619190610fc7565b509095945050505050565b604080516000815260208101909152610a8c908590859085908590610ad2565b50505050565b604080516000815260208101909152610a8c908590859085908590610bb1565b604080516000815260208101909152610a8c908590859085908590610c15565b845460018601546040805160008152602081019091526001600160a01b03928316926339255d5b921690819063b4b333c690610b179088908b908b9060448101611091565b60408051808303601f1901815291815260208201805160e094851b6001600160e01b03909116179052519185901b6001600160e01b0319168252610b629392509086906004016110cf565b6000604051808303816000875af1158015610b81573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610ba99190810190611105565b505050505050565b845460018601546001600160a01b03918216916339255d5b9116806350209a6287898860005b6040519080825280601f01601f191660200182016040528015610c01576020820181803683370190505b50604051602401610b1794939291906111b1565b845460018601546001600160a01b03918216916339255d5b9116806362fc305e8789886000610bd7565b6001600160a01b038116811461081157600080fd5b60008083601f840112610c6657600080fd5b5081356001600160401b03811115610c7d57600080fd5b602083019150836020828501011115610c9557600080fd5b9250929050565b600080600080600080600080600060c08a8c031215610cba57600080fd5b8935610cc581610c3f565b985060208a0135610cd581610c3f565b975060408a0135965060608a01356001600160401b0380821115610cf857600080fd5b610d048d838e01610c54565b909850965060808c0135915080821115610d1d57600080fd5b610d298d838e01610c54565b909650945060a08c0135915080821115610d4257600080fd5b50610d4f8c828d01610c54565b915080935050809150509295985092959850929598565b60005b83811015610d81578181015183820152602001610d69565b50506000910152565b60008151808452610da2816020860160208601610d66565b601f01601f19169290920160200192915050565b602081526000610dc96020830184610d8a565b9392505050565b600080600080600080600060a0888a031215610deb57600080fd5b8735610df681610c3f565b96506020880135610e0681610c3f565b95506040880135945060608801356001600160401b0380821115610e2957600080fd5b610e358b838c01610c54565b909650945060808a0135915080821115610e4e57600080fd5b50610e5b8a828b01610c54565b989b979a50959850939692959293505050565b80600b0b811461081157600080fd5b600060208284031215610e8f57600080fd5b8135610dc981610e6e565b600060208284031215610eac57600080fd5b5035919050565b600081518084526020808501945080840160005b83811015610ee357815187529582019590820190600101610ec7565b509495945050505050565b6040815260008351604080840152610f096080840182610eb3565b90506020850151603f19848303016060850152610f268282610eb3565b9250505082600b0b60208301529392505050565b6001600160a01b0391909116815260200190565b600060208284031215610f6057600080fd5b8135610dc981610c3f565b60008060408385031215610f7e57600080fd5b8235610f8981610c3f565b91506020830135610f9981610c3f565b809150509250929050565b6001600160a01b0393841681529183166020830152909116604082015260600190565b60008060008060808587031215610fdd57600080fd5b845193506020850151610fef81610e6e565b6040860151606090960151949790965092505050565b634e487b7160e01b600052601160045260246000fd5b600b82810b9082900b0360016001605f1b0319811260016001605f1b038213171561104857611048611005565b92915050565b600b81810b9083900b0160016001605f1b03811360016001605f1b03198212171561104857611048611005565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0385811682528481166020830152831660408201526080606082018190526000906110c590830184610d8a565b9695505050505050565b6001600160a01b03841681526060602082018190526000906110f390830185610d8a565b82810360408401526110c58185610d8a565b60006020828403121561111757600080fd5b81516001600160401b038082111561112e57600080fd5b818401915084601f83011261114257600080fd5b8151818111156111545761115461107b565b604051601f8201601f19908116603f0116810190838211818310171561117c5761117c61107b565b8160405282815287602084870101111561119557600080fd5b6111a6836020830160208801610d66565b979650505050505050565b6001600160a01b03858116825284166020820152600b83900b60408201526080606082018190526000906110c590830184610d8a56fe556e737570706f727465642063616c6c6261636b202d204265666f7265204167556e737570706f727465642063616c6c6261636b202d20416674657220416772a2646970667358221220ef8be73e0e84ca0373fab3a45b2153828f99baf39ef42762c886bf7fef9407e064736f6c63430008100033";

type ABStreamConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ABStreamConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ABStream__factory extends ContractFactory {
  constructor(...args: ABStreamConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ABStream";
  }

  deploy(
    _host: string,
    _relay: string,
    _registry: string,
    _baseFlow: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ABStream> {
    return super.deploy(
      _host,
      _relay,
      _registry,
      _baseFlow,
      overrides || {}
    ) as Promise<ABStream>;
  }
  getDeployTransaction(
    _host: string,
    _relay: string,
    _registry: string,
    _baseFlow: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _host,
      _relay,
      _registry,
      _baseFlow,
      overrides || {}
    );
  }
  attach(address: string): ABStream {
    return super.attach(address) as ABStream;
  }
  connect(signer: Signer): ABStream__factory {
    return super.connect(signer) as ABStream__factory;
  }
  static readonly contractName: "ABStream";
  public readonly contractName: "ABStream";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ABStreamInterface {
    return new utils.Interface(_abi) as ABStreamInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ABStream {
    return new Contract(address, _abi, signerOrProvider) as ABStream;
  }
}
