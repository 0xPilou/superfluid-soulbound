/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
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
        internalType: "uint256[]",
        name: "_dropIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_quantities",
        type: "uint256[]",
      },
      {
        internalType: "int96",
        name: "_increase",
        type: "int96",
      },
    ],
    name: "addBoost",
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
    name: "getABRegistry",
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
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserBoost",
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
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "int96",
        name: "_specialBoost",
        type: "int96",
      },
    ],
    name: "grantSpecialBoost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nbBoost",
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
        name: "_from",
        type: "address",
      },
      {
        internalType: "int96",
        name: "_specialBoost",
        type: "int96",
      },
    ],
    name: "revokeSpecialBoost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ABRegistry",
        type: "address",
      },
    ],
    name: "setABRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_ABRelay",
        type: "address",
      },
    ],
    name: "setABRelay",
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
      {
        internalType: "uint256",
        name: "_dropId",
        type: "uint256",
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
        internalType: "uint256",
        name: "_boostId",
        type: "uint256",
      },
      {
        internalType: "int96",
        name: "_increase",
        type: "int96",
      },
    ],
    name: "updateBoost",
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
      {
        internalType: "uint256",
        name: "_dropId",
        type: "uint256",
      },
    ],
    name: "updateStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526000600a553480156200001657600080fd5b506040516200203f3803806200203f8339810160408190526200003991620001ea565b620000443362000181565b6001600160a01b03831615806200006257506001600160a01b038216155b156200008157604051632627b42d60e11b815260040160405180910390fd5b6040805180820182526001600160a01b0385168082529151635b69006f60e11b81527fa9214cc96615e0085d3bb077758db69497dc2dce3b2b1e97bc93c3d18d83efd360048201529091602083019163b6d200de90602401602060405180830381865afa158015620000f7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200011d91906200023e565b6001600160a01b039081169091528151600180549183166001600160a01b0319928316179055602090920151600280549183169184169190911790556004805493821693831693909317909255600580549390921692169190911790555062000265565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b0381168114620001e757600080fd5b50565b6000806000606084860312156200020057600080fd5b83516200020d81620001d1565b60208501519093506200022081620001d1565b60408501519092506200023381620001d1565b809150509250925092565b6000602082840312156200025157600080fd5b81516200025e81620001d1565b9392505050565b611dca80620002756000396000f3fe608060405234801561001057600080fd5b506004361061013e5760003560e01c80630763773b14610143578063230dbd291461015f57806323634e7a1461017f57806330d9c915146101945780633f8d151f146101a757806343447946146101ba5780634afd82e7146101cd57806353c11f99146101ee57806355586a3114610201578063581b73a51461023b5780635f9e7d771461025557806367af9d1514610268578063715018a61461027b578063884d1f40146102835780638902920d146102965780638da5cb5b146102a957806391a84c60146102b157806395168382146102c45780639581372b146102fa578063b1ec46f814610320578063b3624a3b14610331578063d86ed3e514610344578063ec4cbea614610357578063ef0dc8371461036a578063f2fde38b1461037b578063fa51453f1461038e575b600080fd5b61014c600a5481565b6040519081526020015b60405180910390f35b61017261016d366004611628565b6103a1565b6040516101569190611742565b61019261018d36600461176b565b6103f6565b005b6101726101a23660046117a4565b6104ef565b6101926101b536600461176b565b610540565b6101926101c8366004611842565b610670565b6101e06101db366004611883565b610716565b6040516101569291906118d7565b6101726101fc366004611628565b6107fb565b60015460025461021b916001600160a01b03908116911682565b604080516001600160a01b03938416815292909116602083015201610156565b6004546001600160a01b03165b6040516101569190611923565b6101726102633660046117a4565b61084e565b6101926102763660046119fc565b6108b5565b6101926109d9565b6101726102913660046117a4565b6109ed565b6101926102a4366004611a73565b610a3e565b610248610ab2565b6101926102bf366004611a98565b610ac1565b6102d76102d2366004611ac4565b610b3e565b60408051948552600b9390930b6020850152918301526060820152608001610156565b61030d610308366004611ac4565b610bd0565b604051600b9190910b8152602001610156565b6005546001600160a01b0316610248565b61019261033f366004611ac4565b610d1a565b610172610352366004611628565b610d6b565b610192610365366004611ac4565b610dbb565b6003546001600160a01b0316610248565b610192610389366004611ac4565b610e0c565b61019261039c366004611ac4565b610e85565b60405162461bcd60e51b815260206004820152602e6024820152600080516020611d7583398151915260448201526d19595b595b9d08155c19185d195960921b60648201526060906084015b60405180910390fd5b6103fe610ed6565b6001600160a01b03821615806104185750600081600b0b13155b1561043657604051632627b42d60e11b815260040160405180910390fd5b600061044183610f35565b9050600061044f8383611af7565b905081600b0b60000361047c576003546104779060019086906001600160a01b031684610fbd565b610497565b6003546104979060019086906001600160a01b031684610fe3565b6001600160a01b038416600090815260086020526040812080548592906104c2908490600b0b611af7565b92506101000a8154816001600160601b030219169083600b0b6001600160601b0316021790555050505050565b60405162461bcd60e51b815260206004820152602f6024820152600080516020611d5583398151915260448201526e1c99595b595b9d0810dc99585d1959608a1b60648201526060906084016103ed565b610548610ed6565b6001600160a01b03821615806105625750600081600b0b13155b8061058b57506001600160a01b038216600090815260086020526040902054600b82810b91900b125b156105a957604051632627b42d60e11b815260040160405180910390fd5b60006105b483610f35565b905060006105c28383611b24565b600b0b12156105e457604051632627b42d60e11b815260040160405180910390fd5b60006105f08383611b24565b905080600b0b60000361061e5760035461061990600190309087906001600160a01b0316611003565b610645565b600081600b0b1315610645576003546106459060019086906001600160a01b031684610fe3565b6001600160a01b038416600090815260086020526040812080548592906104c2908490600b0b611b24565b6005546001600160a01b0316331461069b5760405163036be76f60e61b815260040160405180910390fd5b600354604051634dcfa0af60e11b81526001600160a01b0390911690639b9f415e906106cb908590600401611923565b600060405180830381600087803b1580156106e557600080fd5b505af11580156106f9573d6000803e3d6000fd5b505050506107078382611023565b6107118282611191565b505050565b6009818154811061072657600080fd5b600091825260209182902060408051600390930290910180546060948102840185018352918301828152909450919284928492909184919084018282801561078d57602002820191906000526020600020905b815481526020019060010190808311610779575b50505050508152602001600182018054806020026020016040519081016040528092919081815260200182805480156107e557602002820191906000526020600020905b8154815260200190600101908083116107d1575b50505091909252505050600290910154600b0b82565b60405162461bcd60e51b81526020600482015260316024820152600080516020611d7583398151915260448201527019595b595b9d0815195c9b5a5b985d1959607a1b60648201526060906084016103ed565b60405162461bcd60e51b815260206004820152603360248201527f556e737570706f727465642063616c6c6261636b202d20204265666f7265204160448201527219dc99595b595b9d0815195c9b5a5b985d1959606a1b60648201526060906084016103ed565b6108bd610ed6565b81518351146108df57604051632627b42d60e11b815260040160405180910390fd5b600081600b0b1361090357604051632627b42d60e11b815260040160405180910390fd5b60408051608081018252908101848152606082018490528152600b82900b6020808301919091526009805460018101825560009190915282518051805160039093027f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af01939192849261097a92849291019061156b565b506020828101518051610993926001850192019061156b565b50505060209190910151600290910180546001600160601b0319166001600160601b03909216919091179055600a80549060006109cf83611b51565b9190505550505050565b6109e1610ed6565b6109eb60006112ae565b565b60405162461bcd60e51b815260206004820152602f6024820152600080516020611d5583398151915260448201526e1c99595b595b9d081d5c19185d1959608a1b60648201526060906084016103ed565b610a46610ed6565b600954821115610a6957604051632627b42d60e11b815260040160405180910390fd5b8060098381548110610a7d57610a7d611b6a565b6000918252602090912060039091020160020180546001600160601b0319166001600160601b03929092169190911790555050565b6000546001600160a01b031690565b6005546001600160a01b03163314610aec5760405163036be76f60e61b815260040160405180910390fd5b600082600b0b13610b1057604051632627b42d60e11b815260040160405180910390fd5b600090815260066020526040902080546001600160601b0319166001600160601b0392909216919091179055565b600254600354604051631cd43d1160e31b81526000928392839283926001600160a01b039081169263e6a1e88892610b80929091169030908a90600401611b80565b608060405180830381865afa158015610b9d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bc19190611ba3565b93509350935093509193509193565b600080805b600a54811015610d1357610cc78460098381548110610bf657610bf6611b6a565b906000526020600020906003020160000160405180604001604052908160008201805480602002602001604051908101604052809291908181526020018280548015610c6157602002820191906000526020600020905b815481526020019060010190808311610c4d575b5050505050815260200160018201805480602002602001604051908101604052809291908181526020018280548015610cb957602002820191906000526020600020905b815481526020019060010190808311610ca5575b5050505050815250506112fe565b15610d035760098181548110610cdf57610cdf611b6a565b6000918252602090912060026003909202010154610d0090600b0b83611af7565b91505b610d0c81611b51565b9050610bd5565b5092915050565b610d22610ed6565b6001600160a01b038116610d4957604051632627b42d60e11b815260040160405180910390fd5b600580546001600160a01b0319166001600160a01b0392909216919091179055565b60405162461bcd60e51b815260206004820152602e6024820152600080516020611d7583398151915260448201526d19595b595b9d0810dc99585d195960921b60648201526060906084016103ed565b610dc3610ed6565b6001600160a01b038116610dea57604051632627b42d60e11b815260040160405180910390fd5b600380546001600160a01b0319166001600160a01b0392909216919091179055565b610e14610ed6565b6001600160a01b038116610e795760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103ed565b610e82816112ae565b50565b610e8d610ed6565b6001600160a01b038116610eb457604051632627b42d60e11b815260040160405180910390fd5b600480546001600160a01b0319166001600160a01b0392909216919091179055565b33610edf610ab2565b6001600160a01b0316146109eb5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103ed565b600254600354604051631cd43d1160e31b815260009283926001600160a01b039182169263e6a1e88892610f7192169030908890600401611b80565b608060405180830381865afa158015610f8e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fb29190611ba3565b509095945050505050565b604080516000815260208101909152610fdd9085908590859085906113fe565b50505050565b604080516000815260208101909152610fdd9085908590859085906114fc565b604080516000815260208101909152610fdd908590859085908590611526565b306001600160a01b03831603611037575050565b600061104283610f35565b604051639581372b60e01b81529091506000903090639581372b9061106b908790600401611923565b602060405180830381865afa158015611088573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110ac9190611be1565b6001600160a01b03851660009081526007602090815260408083205487845260069092528220549293509091600b91820b9184916110eb910b86611b24565b6110f59190611af7565b6110ff9190611b24565b905080600b0b60000361112d5760035461112890600190309088906001600160a01b0316611003565b611154565b600081600b0b1315611154576003546111549060019087906001600160a01b031684610fe3565b506001600160a01b0393909316600090815260076020526040902080546001600160601b0319166001600160601b03909416939093179092555050565b6001600160a01b0382166111a3575050565b60006111ae83610f35565b604051639581372b60e01b81529091506000903090639581372b906111d7908790600401611923565b602060405180830381865afa1580156111f4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112189190611be1565b6001600160a01b03851660009081526007602090815260408083205487845260069092528220549293509091600b91820b918491611257910b86611af7565b6112619190611af7565b61126b9190611b24565b905082600b0b600003611293576003546111289060019087906001600160a01b031684610fbd565b6003546111549060019087906001600160a01b031684610fe3565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000805b8251518110156113f2578260200151818151811061132257611322611b6a565b6020908102919091010151600454845180516001600160a01b039092169163e04cc2d79188918690811061135857611358611b6a565b60200260200101516040518363ffffffff1660e01b81526004016113919291906001600160a01b03929092168252602082015260400190565b602060405180830381865afa1580156113ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113d29190611bfe565b10156113e25760009150506113f8565b6113eb81611b51565b9050611302565b50600190505b92915050565b845460018601546001600160a01b03918216916339255d5b9116806362fc305e87898860005b6040519080825280601f01601f19166020018201604052801561144e576020820181803683370190505b506040516024016114629493929190611c17565b60408051808303601f1901815291815260208201805160e094851b6001600160e01b03909116179052519185901b6001600160e01b03191682526114ad939250908690600401611c57565b6000604051808303816000875af11580156114cc573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526114f49190810190611c8d565b505050505050565b845460018601546001600160a01b03918216916339255d5b9116806350209a628789886000611424565b845460018601546040805160008152602081019091526001600160a01b03928316926339255d5b921690819063b4b333c6906114629088908b908b9060448101611d20565b8280548282559060005260206000209081019282156115a6579160200282015b828111156115a657825182559160200191906001019061158b565b506115b29291506115b6565b5090565b5b808211156115b257600081556001016115b7565b6001600160a01b0381168114610e8257600080fd5b60008083601f8401126115f257600080fd5b5081356001600160401b0381111561160957600080fd5b60208301915083602082850101111561162157600080fd5b9250929050565b600080600080600080600080600060c08a8c03121561164657600080fd5b8935611651816115cb565b985060208a0135611661816115cb565b975060408a0135965060608a01356001600160401b038082111561168457600080fd5b6116908d838e016115e0565b909850965060808c01359150808211156116a957600080fd5b6116b58d838e016115e0565b909650945060a08c01359150808211156116ce57600080fd5b506116db8c828d016115e0565b915080935050809150509295985092959850929598565b60005b8381101561170d5781810151838201526020016116f5565b50506000910152565b6000815180845261172e8160208601602086016116f2565b601f01601f19169290920160200192915050565b6020815260006117556020830184611716565b9392505050565b80600b0b8114610e8257600080fd5b6000806040838503121561177e57600080fd5b8235611789816115cb565b915060208301356117998161175c565b809150509250929050565b600080600080600080600060a0888a0312156117bf57600080fd5b87356117ca816115cb565b965060208801356117da816115cb565b95506040880135945060608801356001600160401b03808211156117fd57600080fd5b6118098b838c016115e0565b909650945060808a013591508082111561182257600080fd5b5061182f8a828b016115e0565b989b979a50959850939692959293505050565b60008060006060848603121561185757600080fd5b8335611862816115cb565b92506020840135611872816115cb565b929592945050506040919091013590565b60006020828403121561189557600080fd5b5035919050565b600081518084526020808501945080840160005b838110156118cc578151875295820195908201906001016118b0565b509495945050505050565b60408152600083516040808401526118f2608084018261189c565b90506020850151603f1984830301606085015261190f828261189c565b9250505082600b0b60208301529392505050565b6001600160a01b0391909116815260200190565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b038111828210171561197557611975611937565b604052919050565b600082601f83011261198e57600080fd5b813560206001600160401b038211156119a9576119a9611937565b8160051b6119b882820161194d565b92835284810182019282810190878511156119d257600080fd5b83870192505b848310156119f1578235825291830191908301906119d8565b979650505050505050565b600080600060608486031215611a1157600080fd5b83356001600160401b0380821115611a2857600080fd5b611a348783880161197d565b94506020860135915080821115611a4a57600080fd5b50611a578682870161197d565b9250506040840135611a688161175c565b809150509250925092565b60008060408385031215611a8657600080fd5b8235915060208301356117998161175c565b60008060408385031215611aab57600080fd5b8235611ab68161175c565b946020939093013593505050565b600060208284031215611ad657600080fd5b8135611755816115cb565b634e487b7160e01b600052601160045260246000fd5b600b81810b9083900b0160016001605f1b03811360016001605f1b0319821217156113f8576113f8611ae1565b600b82810b9082900b0360016001605f1b0319811260016001605f1b03821317156113f8576113f8611ae1565b600060018201611b6357611b63611ae1565b5060010190565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b0393841681529183166020830152909116604082015260600190565b60008060008060808587031215611bb957600080fd5b845193506020850151611bcb8161175c565b6040860151606090960151949790965092505050565b600060208284031215611bf357600080fd5b81516117558161175c565b600060208284031215611c1057600080fd5b5051919050565b6001600160a01b03858116825284166020820152600b83900b6040820152608060608201819052600090611c4d90830184611716565b9695505050505050565b6001600160a01b0384168152606060208201819052600090611c7b90830185611716565b8281036040840152611c4d8185611716565b600060208284031215611c9f57600080fd5b81516001600160401b0380821115611cb657600080fd5b818401915084601f830112611cca57600080fd5b815181811115611cdc57611cdc611937565b611cef601f8201601f191660200161194d565b9150808252856020828501011115611d0657600080fd5b611d178160208401602086016116f2565b50949350505050565b6001600160a01b038581168252848116602083015283166040820152608060608201819052600090611c4d9083018461171656fe556e737570706f727465642063616c6c6261636b202d204265666f7265204167556e737570706f727465642063616c6c6261636b202d20416674657220416772a2646970667358221220457d4e124b73928a1b71eed22d3a4568c4c8a89f2cd7044332fe6adca63f6ac064736f6c63430008100033";

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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ABStream> {
    return super.deploy(
      _host,
      _relay,
      _registry,
      overrides || {}
    ) as Promise<ABStream>;
  }
  getDeployTransaction(
    _host: string,
    _relay: string,
    _registry: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _host,
      _relay,
      _registry,
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
