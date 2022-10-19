/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC20PresetMinterPauser,
  ERC20PresetMinterPauserInterface,
} from "../ERC20PresetMinterPauser";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
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
    inputs: [],
    name: "MINTER_ROLE",
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
    inputs: [],
    name: "PAUSER_ROLE",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
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
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001ce238038062001ce28339810160408190526200003491620002f7565b81816005620000448382620003ef565b506006620000538282620003ef565b50506007805460ff19169055506200006d600033620000cd565b620000997f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a633620000cd565b620000c57f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33620000cd565b5050620004bb565b620000d98282620000dd565b5050565b620000f482826200012060201b6200081b1760201c565b60008281526001602090815260409091206200011b9183906200089f620001c0821b17901c565b505050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16620000d9576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556200017c3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000620001d7836001600160a01b038416620001e0565b90505b92915050565b60008181526001830160205260408120546200022957508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155620001da565b506000620001da565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200025a57600080fd5b81516001600160401b038082111562000277576200027762000232565b604051601f8301601f19908116603f01168101908282118183101715620002a257620002a262000232565b81604052838152602092508683858801011115620002bf57600080fd5b600091505b83821015620002e35785820183015181830184015290820190620002c4565b600093810190920192909252949350505050565b600080604083850312156200030b57600080fd5b82516001600160401b03808211156200032357600080fd5b620003318683870162000248565b935060208501519150808211156200034857600080fd5b50620003578582860162000248565b9150509250929050565b600181811c908216806200037657607f821691505b6020821081036200039757634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200011b57600081815260208120601f850160051c81016020861015620003c65750805b601f850160051c820191505b81811015620003e757828155600101620003d2565b505050505050565b81516001600160401b038111156200040b576200040b62000232565b62000423816200041c845462000361565b846200039d565b602080601f8311600181146200045b5760008415620004425750858301515b600019600386901b1c1916600185901b178555620003e7565b600085815260208120601f198616915b828110156200048c578886015182559484019460019091019084016200046b565b5085821015620004ab5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61181780620004cb6000396000f3fe608060405234801561001057600080fd5b50600436106101545760003560e01c806301ffc9a71461015957806306fdde0314610181578063095ea7b31461019657806318160ddd146101a957806323b872dd146101bb578063248a9ca3146101ce5780632f2ff15d146101e1578063313ce567146101f657806336568abe1461020557806339509351146102185780633f4ba83a1461022b57806340c10f191461023357806342966c68146102465780635c975abb1461025957806370a082311461026457806379cc67901461028d5780638456cb59146102a05780639010d07c146102a857806391d14854146102c857806395d89b41146102db578063a217fddf146102e3578063a457c2d7146102eb578063a9059cbb146102fe578063ca15c87314610311578063d539139314610324578063d547741f14610339578063dd62ed3e1461034c578063e63ab1e91461035f575b600080fd5b61016c610167366004611441565b610374565b60405190151581526020015b60405180910390f35b61018961039f565b604051610178919061148f565b61016c6101a43660046114de565b610431565b6004545b604051908152602001610178565b61016c6101c9366004611508565b610449565b6101ad6101dc366004611544565b61046d565b6101f46101ef36600461155d565b610482565b005b60405160128152602001610178565b6101f461021336600461155d565b6104a3565b61016c6102263660046114de565b610526565b6101f4610548565b6101f46102413660046114de565b6105c6565b6101f4610254366004611544565b610641565b60075460ff1661016c565b6101ad610272366004611589565b6001600160a01b031660009081526002602052604090205490565b6101f461029b3660046114de565b61064e565b6101f4610663565b6102bb6102b63660046115a4565b6106dd565b60405161017891906115c6565b61016c6102d636600461155d565b6106fc565b610189610725565b6101ad600081565b61016c6102f93660046114de565b610734565b61016c61030c3660046114de565b6107af565b6101ad61031f366004611544565b6107bd565b6101ad6000805160206117a283398151915281565b6101f461034736600461155d565b6107d4565b6101ad61035a3660046115da565b6107f0565b6101ad60008051602061178283398151915281565b60006001600160e01b03198216635a05180f60e01b14806103995750610399826108b4565b92915050565b6060600580546103ae90611604565b80601f01602080910402602001604051908101604052809291908181526020018280546103da90611604565b80156104275780601f106103fc57610100808354040283529160200191610427565b820191906000526020600020905b81548152906001019060200180831161040a57829003601f168201915b5050505050905090565b60003361043f8185856108e9565b5060019392505050565b600033610457858285610a0d565b610462858585610a87565b506001949350505050565b60009081526020819052604090206001015490565b61048b8261046d565b61049481610c4e565b61049e8383610c58565b505050565b6001600160a01b03811633146105185760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6105228282610c7a565b5050565b60003361043f81858561053983836107f0565b6105439190611654565b6108e9565b610560600080516020611782833981519152336106fc565b6105bc5760405162461bcd60e51b8152602060048201526039602482015260008051602061176283398151915260448201527876652070617573657220726f6c6520746f20756e706175736560381b606482015260840161050f565b6105c4610c9c565b565b6105de6000805160206117a2833981519152336106fc565b6106375760405162461bcd60e51b815260206004820152603660248201526000805160206117628339815191526044820152751d99481b5a5b9d195c881c9bdb19481d1bc81b5a5b9d60521b606482015260840161050f565b6105228282610ce8565b61064b3382610dc1565b50565b610659823383610a0d565b6105228282610dc1565b61067b600080516020611782833981519152336106fc565b6106d55760405162461bcd60e51b8152602060048201526037602482015260008051602061176283398151915260448201527676652070617573657220726f6c6520746f20706175736560481b606482015260840161050f565b6105c4610f09565b60008281526001602052604081206106f59083610f46565b9392505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6060600680546103ae90611604565b6000338161074282866107f0565b9050838110156107a25760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b606482015260840161050f565b61046282868684036108e9565b60003361043f818585610a87565b600081815260016020526040812061039990610f52565b6107dd8261046d565b6107e681610c4e565b61049e8383610c7a565b6001600160a01b03918216600090815260036020908152604080832093909416825291909152205490565b61082582826106fc565b610522576000828152602081815260408083206001600160a01b03851684529091529020805460ff1916600117905561085b3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006106f5836001600160a01b038416610f5c565b60006001600160e01b03198216637965db0b60e01b148061039957506301ffc9a760e01b6001600160e01b0319831614610399565b6001600160a01b03831661094b5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161050f565b6001600160a01b0382166109ac5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161050f565b6001600160a01b0383811660008181526003602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610a1984846107f0565b90506000198114610a815781811015610a745760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161050f565b610a8184848484036108e9565b50505050565b6001600160a01b038316610aeb5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b606482015260840161050f565b6001600160a01b038216610b4d5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161050f565b610b58838383610fab565b6001600160a01b03831660009081526002602052604090205481811015610bd05760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161050f565b6001600160a01b03808516600090815260026020526040808220858503905591851681529081208054849290610c07908490611654565b92505081905550826001600160a01b0316846001600160a01b03166000805160206117c283398151915284604051610c4191815260200190565b60405180910390a3610a81565b61064b8133610fb6565b610c62828261081b565b600082815260016020526040902061049e908261089f565b610c84828261101a565b600082815260016020526040902061049e908261107f565b610ca4611094565b6007805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b604051610cde91906115c6565b60405180910390a1565b6001600160a01b038216610d3e5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161050f565b610d4a60008383610fab565b8060046000828254610d5c9190611654565b90915550506001600160a01b03821660009081526002602052604081208054839290610d89908490611654565b90915550506040518181526001600160a01b038316906000906000805160206117c28339815191529060200160405180910390a35050565b6001600160a01b038216610e215760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b606482015260840161050f565b610e2d82600083610fab565b6001600160a01b03821660009081526002602052604090205481811015610ea15760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b606482015260840161050f565b6001600160a01b0383166000908152600260205260408120838303905560048054849290610ed0908490611667565b90915550506040518281526000906001600160a01b038516906000805160206117c28339815191529060200160405180910390a3505050565b610f116110dd565b6007805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610cd13390565b60006106f58383611123565b6000610399825490565b6000818152600183016020526040812054610fa357508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610399565b506000610399565b61049e83838361114d565b610fc082826106fc565b61052257610fd8816001600160a01b031660146111b3565b610fe38360206111b3565b604051602001610ff492919061167a565b60408051601f198184030181529082905262461bcd60e51b825261050f9160040161148f565b61102482826106fc565b15610522576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60006106f5836001600160a01b03841661134e565b60075460ff166105c45760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015260640161050f565b60075460ff16156105c45760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015260640161050f565b600082600001828154811061113a5761113a6116e9565b9060005260206000200154905092915050565b60075460ff161561049e5760405162461bcd60e51b815260206004820152602a60248201527f45524332305061757361626c653a20746f6b656e207472616e736665722077686044820152691a5b19481c185d5cd95960b21b606482015260840161050f565b606060006111c28360026116ff565b6111cd906002611654565b6001600160401b038111156111e4576111e461171e565b6040519080825280601f01601f19166020018201604052801561120e576020820181803683370190505b509050600360fc1b81600081518110611229576112296116e9565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611258576112586116e9565b60200101906001600160f81b031916908160001a905350600061127c8460026116ff565b611287906001611654565b90505b60018111156112ff576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106112bb576112bb6116e9565b1a60f81b8282815181106112d1576112d16116e9565b60200101906001600160f81b031916908160001a90535060049490941c936112f881611734565b905061128a565b5083156106f55760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161050f565b60008181526001830160205260408120548015611437576000611372600183611667565b855490915060009061138690600190611667565b90508181146113eb5760008660000182815481106113a6576113a66116e9565b90600052602060002001549050808760000184815481106113c9576113c96116e9565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806113fc576113fc61174b565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610399565b6000915050610399565b60006020828403121561145357600080fd5b81356001600160e01b0319811681146106f557600080fd5b60005b8381101561148657818101518382015260200161146e565b50506000910152565b60208152600082518060208401526114ae81604085016020870161146b565b601f01601f19169190910160400192915050565b80356001600160a01b03811681146114d957600080fd5b919050565b600080604083850312156114f157600080fd5b6114fa836114c2565b946020939093013593505050565b60008060006060848603121561151d57600080fd5b611526846114c2565b9250611534602085016114c2565b9150604084013590509250925092565b60006020828403121561155657600080fd5b5035919050565b6000806040838503121561157057600080fd5b82359150611580602084016114c2565b90509250929050565b60006020828403121561159b57600080fd5b6106f5826114c2565b600080604083850312156115b757600080fd5b50508035926020909101359150565b6001600160a01b0391909116815260200190565b600080604083850312156115ed57600080fd5b6115f6836114c2565b9150611580602084016114c2565b600181811c9082168061161857607f821691505b60208210810361163857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b808201808211156103995761039961163e565b818103818111156103995761039961163e565b76020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8152600083516116ac81601785016020880161146b565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516116dd81602884016020880161146b565b01602801949350505050565b634e487b7160e01b600052603260045260246000fd5b60008160001904831182151516156117195761171961163e565b500290565b634e487b7160e01b600052604160045260246000fd5b6000816117435761174361163e565b506000190190565b634e487b7160e01b600052603160045260246000fdfe45524332305072657365744d696e7465725061757365723a206d75737420686165d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa26469706673582212207cfb2256c1055a5bfa9d9c372c56bd194ed68262ac650b4b5fd66f096877695d64736f6c63430008100033";

type ERC20PresetMinterPauserConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20PresetMinterPauserConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20PresetMinterPauser__factory extends ContractFactory {
  constructor(...args: ERC20PresetMinterPauserConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC20PresetMinterPauser";
  }

  deploy(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC20PresetMinterPauser> {
    return super.deploy(
      name,
      symbol,
      overrides || {}
    ) as Promise<ERC20PresetMinterPauser>;
  }
  getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  attach(address: string): ERC20PresetMinterPauser {
    return super.attach(address) as ERC20PresetMinterPauser;
  }
  connect(signer: Signer): ERC20PresetMinterPauser__factory {
    return super.connect(signer) as ERC20PresetMinterPauser__factory;
  }
  static readonly contractName: "ERC20PresetMinterPauser";
  public readonly contractName: "ERC20PresetMinterPauser";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20PresetMinterPauserInterface {
    return new utils.Interface(_abi) as ERC20PresetMinterPauserInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20PresetMinterPauser {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ERC20PresetMinterPauser;
  }
}