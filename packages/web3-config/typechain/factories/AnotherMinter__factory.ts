/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { AnotherMinter, AnotherMinterInterface } from "../AnotherMinter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_dropManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_messenger",
        type: "address",
      },
      {
        internalType: "address",
        name: "_relay",
        type: "address",
      },
      {
        internalType: "string",
        name: "_baseUri",
        type: "string",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "DropSoldOut",
    type: "error",
  },
  {
    inputs: [],
    name: "Forbidden",
    type: "error",
  },
  {
    inputs: [],
    name: "IncorrectETHSent",
    type: "error",
  },
  {
    inputs: [],
    name: "IncorrectInterface",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxMintPerAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "NotEnoughTokensAvailable",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInMerkle",
    type: "error",
  },
  {
    inputs: [],
    name: "NothingToWithdraw",
    type: "error",
  },
  {
    inputs: [],
    name: "SaleNotStarted",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFailed",
    type: "error",
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
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
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
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "dropIdPerToken",
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
    name: "dropManager",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
        name: "_to",
        type: "address",
      },
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
      {
        internalType: "bytes32[]",
        name: "_proof",
        type: "bytes32[]",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "mintedPerDropPerPhase",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "phasesPerDrop",
    outputs: [
      {
        internalType: "uint256",
        name: "phaseStart",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxMint",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "merkle",
        type: "bytes32",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
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
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_newBaseURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dropManager",
        type: "address",
      },
    ],
    name: "setDropManager",
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
        components: [
          {
            internalType: "uint256",
            name: "phaseStart",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxMint",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "merkle",
            type: "bytes32",
          },
        ],
        internalType: "struct IABDropManager.Phase[]",
        name: "_phases",
        type: "tuple[]",
      },
    ],
    name: "setDropPhases",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
    inputs: [],
    name: "withdrawAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620028a3380380620028a3833981016040819052620000349162000207565b8585858484818160006200004983826200035f565b5060016200005882826200035f565b505050620000756200006f620000cf60201b60201c565b620000d3565b5050600780546001600160a01b039485166001600160a01b031991821617909155600880549285169282169290921790915560098054929093169116179055600b620000c284826200035f565b505050505050506200042b565b3390565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80516001600160a01b03811681146200013d57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200016a57600080fd5b81516001600160401b038082111562000187576200018762000142565b604051601f8301601f19908116603f01168101908282118183101715620001b257620001b262000142565b81604052838152602092508683858801011115620001cf57600080fd5b600091505b83821015620001f35785820183015181830184015290820190620001d4565b600093810190920192909252949350505050565b60008060008060008060c087890312156200022157600080fd5b6200022c8762000125565b95506200023c6020880162000125565b94506200024c6040880162000125565b60608801519094506001600160401b03808211156200026a57600080fd5b620002788a838b0162000158565b945060808901519150808211156200028f57600080fd5b6200029d8a838b0162000158565b935060a0890151915080821115620002b457600080fd5b50620002c389828a0162000158565b9150509295509295509295565b600181811c90821680620002e557607f821691505b6020821081036200030657634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200035a57600081815260208120601f850160051c81016020861015620003355750805b601f850160051c820191505b81811015620003565782815560010162000341565b5050505b505050565b81516001600160401b038111156200037b576200037b62000142565b62000393816200038c8454620002d0565b846200030c565b602080601f831160018114620003cb5760008415620003b25750858301515b600019600386901b1c1916600185901b17855562000356565b600085815260208120601f198616915b82811015620003fc57888601518255948401946001909101908401620003db565b50858210156200041b5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b612468806200043b6000396000f3fe6080604052600436106101265760003560e01c806301ffc9a71461012b57806306fdde0314610160578063081812fc14610182578063095ea7b3146101ba57806320a8755a146101dc57806323b872dd146101fc57806342842e0e1461021c57806355f804b31461023c578063597d78e11461025c5780636096a2781461026f5780636352211e146102aa578063657fd0ea146102ca57806370a0823114610305578063715018a614610325578063853828b61461033a5780638da5cb5b1461034f5780638f53bc9e1461036457806395d89b4114610384578063a22cb46514610399578063a706ed95146103b9578063b88d4fde146103d9578063c87b56dd146103f9578063e510a88e14610419578063e985e9c514610457578063f2fde38b14610477575b600080fd5b34801561013757600080fd5b5061014b61014636600461199c565b610497565b60405190151581526020015b60405180910390f35b34801561016c57600080fd5b506101756104e9565b6040516101579190611a09565b34801561018e57600080fd5b506101a261019d366004611a1c565b61057b565b6040516001600160a01b039091168152602001610157565b3480156101c657600080fd5b506101da6101d5366004611a4a565b6105a2565b005b3480156101e857600080fd5b506101da6101f7366004611a76565b6106bc565b34801561020857600080fd5b506101da610217366004611a93565b6106e6565b34801561022857600080fd5b506101da610237366004611a93565b610717565b34801561024857600080fd5b506101da610257366004611ad4565b610732565b6101da61026a366004611bf9565b610747565b34801561027b57600080fd5b5061029c61028a366004611a1c565b600a6020526000908152604090205481565b604051908152602001610157565b3480156102b657600080fd5b506101a26102c5366004611a1c565b610759565b3480156102d657600080fd5b506102ea6102e5366004611cb4565b61078e565b60408051938452602084019290925290820152606001610157565b34801561031157600080fd5b5061029c610320366004611a76565b6107d0565b34801561033157600080fd5b506101da610856565b34801561034657600080fd5b506101da61086a565b34801561035b57600080fd5b506101a261094c565b34801561037057600080fd5b506007546101a2906001600160a01b031681565b34801561039057600080fd5b5061017561095b565b3480156103a557600080fd5b506101da6103b4366004611cd6565b61096a565b3480156103c557600080fd5b506101da6103d4366004611d14565b610979565b3480156103e557600080fd5b506101da6103f4366004611ddd565b610a22565b34801561040557600080fd5b50610175610414366004611a1c565b610a54565b34801561042557600080fd5b5061029c610434366004611ea0565b600d60209081526000938452604080852082529284528284209052825290205481565b34801561046357600080fd5b5061014b610472366004611ec7565b610abb565b34801561048357600080fd5b506101da610492366004611a76565b610ae9565b60006001600160e01b031982166380ac58cd60e01b14806104c857506001600160e01b03198216635b5e139f60e01b145b806104e357506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546104f890611ef5565b80601f016020809104026020016040519081016040528092919081815260200182805461052490611ef5565b80156105715780601f1061054657610100808354040283529160200191610571565b820191906000526020600020905b81548152906001019060200180831161055457829003601f168201915b5050505050905090565b600061058682610b5f565b506000908152600460205260409020546001600160a01b031690565b60006105ad82610759565b9050806001600160a01b0316836001600160a01b03160361061f5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b038216148061063b575061063b8133610abb565b6106ad5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c00006064820152608401610616565b6106b78383610b84565b505050565b6106c4610bf2565b600780546001600160a01b0319166001600160a01b0392909216919091179055565b6106f03382610c51565b61070c5760405162461bcd60e51b815260040161061690611f2f565b6106b7838383610cb0565b6106b783838360405180602001604052806000815250610a22565b61073a610bf2565b600b6106b7828483611fcb565b61075384848484610e45565b50505050565b6000818152600260205260408120546001600160a01b0316806104e35760405162461bcd60e51b81526004016106169061208b565b600c60205281600052604060002081815481106107aa57600080fd5b600091825260209091206003909102018054600182015460029092015490935090915083565b60006001600160a01b03821661083a5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610616565b506001600160a01b031660009081526003602052604090205490565b61085e610bf2565b610868600061133a565b565b600754604080516361d027b360e01b815290516000926001600160a01b0316916361d027b39160048083019260209291908290030181865afa1580156108b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108d891906120cd565b6001600160a01b03164760405160006040518083038185875af1925050503d8060008114610922576040519150601f19603f3d011682016040523d82523d6000602084013e610927565b606091505b5050905080610949576040516312171d8360e31b815260040160405180910390fd5b50565b6006546001600160a01b031690565b6060600180546104f890611ef5565b61097533838361138c565b5050565b6007546001600160a01b031633146109a457604051631dd2188d60e31b815260040160405180910390fd5b60005b81518110156106b7576000838152600c6020526040902082518390839081106109d2576109d26120ea565b60209081029190910181015182546001818101855560009485529383902082516003909202019081559181015192820192909255604090910151600290910155610a1b81612116565b90506109a7565b610a2c3383610c51565b610a485760405162461bcd60e51b815260040161061690611f2f565b61075384848484611456565b6060610a5f82610b5f565b6000610a69611489565b90506000815111610a895760405180602001604052806000815250610ab4565b80610a9384611498565b604051602001610aa492919061212f565b6040516020818303038152906040525b9392505050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b610af1610bf2565b6001600160a01b038116610b565760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610616565b6109498161133a565b610b6881611598565b6109495760405162461bcd60e51b81526004016106169061208b565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610bb982610759565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b33610bfb61094c565b6001600160a01b0316146108685760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610616565b600080610c5d83610759565b9050806001600160a01b0316846001600160a01b03161480610c845750610c848185610abb565b80610ca85750836001600160a01b0316610c9d8461057b565b6001600160a01b0316145b949350505050565b826001600160a01b0316610cc382610759565b6001600160a01b031614610d275760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610616565b6001600160a01b038216610d895760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610616565b610d948383836115b5565b610d9f600082610b84565b6001600160a01b0383166000908152600360205260408120805460019290610dc890849061215e565b90915550506001600160a01b0382166000908152600360205260408120805460019290610df6908490612171565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03868116918217909255915184939187169160008051602061241383398151915291a4505050565b600754604051630bd6732d60e31b8152600481018590526000916001600160a01b031690635eb39968906024016101e060405180830381865afa158015610e90573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eb49190612223565b9050806080015160200151816020015103610ee2576040516306d6b15160e51b815260040160405180910390fd5b806080015160200151838260200151610efb9190612171565b1115610f1a57604051632d400a1b60e01b815260040160405180910390fd5b608081015151610f2b9084906122cf565b3414610f4a576040516322790dad60e01b815260040160405180910390fd5b6000848152600c6020908152604080832080548251818502810185019093528083529192909190849084015b82821015610fc65783829060005260206000209060030201604051806060016040529081600082015481526020016001820154815260200160028201548152505081526020019060010190610f76565b50505050905080600081518110610fdf57610fdf6120ea565b60200260200101516000015142101561100b576040516316851a3760e11b815260040160405180910390fd5b600060015b82518110156110515782818151811061102b5761102b6120ea565b6020026020010151600001514210611041578091505b61104a81612116565b9050611010565b50818181518110611064576110646120ea565b60209081029190910181015181015184516000908152600d835260408082206001600160a01b038c168352845280822085835290935291909120546110aa908790612171565b11156110c9576040516369f0a9d960e11b815260040160405180910390fd5b8181815181106110db576110db6120ea565b6020026020010151604001516000801b1461117557600061115385848481518110611108576111086120ea565b6020026020010151604001518a604051602001611138919060609190911b6001600160601b031916815260140190565b6040516020818303038152906040528051906020012061167d565b9050806111735760405163452c2df160e11b815260040160405180910390fd5b505b82516000908152600d602090815260408083206001600160a01b038b1684528252808320848452909152812080548792906111b1908490612171565b9091555050602083015160608401516000916111cc91612171565b905060005b8681101561121d578451600a60006111e98486612171565b815260208101919091526040016000205561120d896112088385612171565b611693565b61121681612116565b90506111d1565b50600754604051632844d0e360e21b815260048101899052602481018890526001600160a01b039091169063a113438c90604401600060405180830381600087803b15801561126b57600080fd5b505af115801561127f573d6000803e3d6000fd5b505050506000341115611330576000620f42408560400151346112a291906122cf565b6112ac9190612304565b9050801561132e5760008560e001516001600160a01b03168260405160006040518083038185875af1925050503d8060008114611305576040519150601f19603f3d011682016040523d82523d6000602084013e61130a565b606091505b505090508061132c576040516312171d8360e31b815260040160405180910390fd5b505b505b5050505050505050565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b0316036113e95760405162461bcd60e51b815260206004820152601960248201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b6044820152606401610616565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611461848484610cb0565b61146d848484846116ad565b6107535760405162461bcd60e51b815260040161061690612318565b6060600b80546104f890611ef5565b6060816000036114bf5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156114e957806114d381612116565b91506114e29050600a83612304565b91506114c3565b6000816001600160401b0381111561150357611503611b45565b6040519080825280601f01601f19166020018201604052801561152d576020820181803683370190505b5090505b8415610ca85761154260018361215e565b915061154f600a8661236a565b61155a906030612171565b60f81b81838151811061156f5761156f6120ea565b60200101906001600160f81b031916908160001a905350611591600a86612304565b9450611531565b6000908152600260205260409020546001600160a01b0316151590565b6009546008546000838152600a60209081526040918290205482516001600160a01b0389811660248301528881166044830152606480830193909352845180830390930183526084909101845291810180516001600160e01b0316632a73d54560e21b1790529151633dbb202b60e01b815293811693633dbb202b936116469392169190629896819060040161237e565b600060405180830381600087803b15801561166057600080fd5b505af1158015611674573d6000803e3d6000fd5b50505050505050565b60008261168a85846117ae565b14949350505050565b6109758282604051806020016040528060008152506117fb565b60006001600160a01b0384163b156117a357604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906116f19033908990889088906004016123b8565b6020604051808303816000875af192505050801561172c575060408051601f3d908101601f19168201909252611729918101906123f5565b60015b611789573d80801561175a576040519150601f19603f3d011682016040523d82523d6000602084013e61175f565b606091505b5080516000036117815760405162461bcd60e51b815260040161061690612318565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610ca8565b506001949350505050565b600081815b84518110156117f3576117df828683815181106117d2576117d26120ea565b602002602001015161182e565b9150806117eb81612116565b9150506117b3565b509392505050565b611805838361185a565b61181260008484846116ad565b6106b75760405162461bcd60e51b815260040161061690612318565b600081831061184a576000828152602084905260409020610ab4565b5060009182526020526040902090565b6001600160a01b0382166118b05760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610616565b6118b981611598565b156119055760405162461bcd60e51b815260206004820152601c60248201527b115490cdcc8c4e881d1bdad95b88185b1c9958591e481b5a5b9d195960221b6044820152606401610616565b611911600083836115b5565b6001600160a01b038216600090815260036020526040812080546001929061193a908490612171565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386169081179091559051839290600080516020612413833981519152908290a45050565b6001600160e01b03198116811461094957600080fd5b6000602082840312156119ae57600080fd5b8135610ab481611986565b60005b838110156119d45781810151838201526020016119bc565b50506000910152565b600081518084526119f58160208601602086016119b9565b601f01601f19169290920160200192915050565b602081526000610ab460208301846119dd565b600060208284031215611a2e57600080fd5b5035919050565b6001600160a01b038116811461094957600080fd5b60008060408385031215611a5d57600080fd5b8235611a6881611a35565b946020939093013593505050565b600060208284031215611a8857600080fd5b8135610ab481611a35565b600080600060608486031215611aa857600080fd5b8335611ab381611a35565b92506020840135611ac381611a35565b929592945050506040919091013590565b60008060208385031215611ae757600080fd5b82356001600160401b0380821115611afe57600080fd5b818501915085601f830112611b1257600080fd5b813581811115611b2157600080fd5b866020828501011115611b3357600080fd5b60209290920196919550909350505050565b634e487b7160e01b600052604160045260246000fd5b604051606081016001600160401b0381118282101715611b7d57611b7d611b45565b60405290565b60405161014081016001600160401b0381118282101715611b7d57611b7d611b45565b604051601f8201601f191681016001600160401b0381118282101715611bce57611bce611b45565b604052919050565b60006001600160401b03821115611bef57611bef611b45565b5060051b60200190565b60008060008060808587031215611c0f57600080fd5b8435611c1a81611a35565b935060208581013593506040860135925060608601356001600160401b03811115611c4457600080fd5b8601601f81018813611c5557600080fd5b8035611c68611c6382611bd6565b611ba6565b81815260059190911b8201830190838101908a831115611c8757600080fd5b928401925b82841015611ca557833582529284019290840190611c8c565b979a9699509497505050505050565b60008060408385031215611cc757600080fd5b50508035926020909101359150565b60008060408385031215611ce957600080fd5b8235611cf481611a35565b915060208301358015158114611d0957600080fd5b809150509250929050565b6000806040808486031215611d2857600080fd5b833592506020808501356001600160401b03811115611d4657600080fd5b8501601f81018713611d5757600080fd5b8035611d65611c6382611bd6565b8181526060918202830184019184820191908a841115611d8457600080fd5b938501935b83851015611dcc5780858c031215611da15760008081fd5b611da9611b5b565b853581528686013587820152878601358882015283529384019391850191611d89565b508096505050505050509250929050565b60008060008060808587031215611df357600080fd5b8435611dfe81611a35565b9350602085810135611e0f81611a35565b93506040860135925060608601356001600160401b0380821115611e3257600080fd5b818801915088601f830112611e4657600080fd5b813581811115611e5857611e58611b45565b611e6a601f8201601f19168501611ba6565b91508082528984828501011115611e8057600080fd5b808484018584013760008482840101525080935050505092959194509250565b600080600060608486031215611eb557600080fd5b833592506020840135611ac381611a35565b60008060408385031215611eda57600080fd5b8235611ee581611a35565b91506020830135611d0981611a35565b600181811c90821680611f0957607f821691505b602082108103611f2957634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b601f8211156106b757600081815260208120601f850160051c81016020861015611fa45750805b601f850160051c820191505b81811015611fc357828155600101611fb0565b505050505050565b6001600160401b03831115611fe257611fe2611b45565b611ff683611ff08354611ef5565b83611f7d565b6000601f84116001811461202a57600085156120125750838201355b600019600387901b1c1916600186901b178355612084565b600083815260209020601f19861690835b8281101561205b578685013582556020948501946001909201910161203b565b50868210156120785760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b602080825260189082015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604082015260600190565b80516120c881611a35565b919050565b6000602082840312156120df57600080fd5b8151610ab481611a35565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60006001820161212857612128612100565b5060010190565b600083516121418184602088016119b9565b8351908301906121558183602088016119b9565b01949350505050565b818103818111156104e3576104e3612100565b808201808211156104e3576104e3612100565b60006060828403121561219657600080fd5b61219e611b5b565b905081518152602082015160208201526040820151604082015292915050565b6000608082840312156121d057600080fd5b604051608081016001600160401b03811182821017156121f2576121f2611b45565b8060405250809150825181526020830151602082015260408301516040820152606083015160608201525092915050565b60006101e0828403121561223657600080fd5b61223e611b83565b8251815260208301516020820152604083015160408201526060830151606082015261226d8460808501612184565b608082015261227f8460e085016121be565b60a082015261229161016084016120bd565b60c08201526122a361018084016120bd565b60e08201526122b56101a084016120bd565b6101008201526101c0929092015161012083015250919050565b60008160001904831182151516156122e9576122e9612100565b500290565b634e487b7160e01b600052601260045260246000fd5b600082612313576123136122ee565b500490565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b600082612379576123796122ee565b500690565b6001600160a01b03841681526060602082018190526000906123a2908301856119dd565b905063ffffffff83166040830152949350505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906123eb908301846119dd565b9695505050505050565b60006020828403121561240757600080fd5b8151610ab48161198656feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa2646970667358221220004df1d091e79bae27de45bafbb85d716e63d7a68d227c6dff03e606ae936dc964736f6c63430008100033";

type AnotherMinterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AnotherMinterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AnotherMinter__factory extends ContractFactory {
  constructor(...args: AnotherMinterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "AnotherMinter";
  }

  deploy(
    _dropManager: string,
    _messenger: string,
    _relay: string,
    _baseUri: string,
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AnotherMinter> {
    return super.deploy(
      _dropManager,
      _messenger,
      _relay,
      _baseUri,
      _name,
      _symbol,
      overrides || {}
    ) as Promise<AnotherMinter>;
  }
  getDeployTransaction(
    _dropManager: string,
    _messenger: string,
    _relay: string,
    _baseUri: string,
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _dropManager,
      _messenger,
      _relay,
      _baseUri,
      _name,
      _symbol,
      overrides || {}
    );
  }
  attach(address: string): AnotherMinter {
    return super.attach(address) as AnotherMinter;
  }
  connect(signer: Signer): AnotherMinter__factory {
    return super.connect(signer) as AnotherMinter__factory;
  }
  static readonly contractName: "AnotherMinter";
  public readonly contractName: "AnotherMinter";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AnotherMinterInterface {
    return new utils.Interface(_abi) as AnotherMinterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AnotherMinter {
    return new Contract(address, _abi, signerOrProvider) as AnotherMinter;
  }
}
