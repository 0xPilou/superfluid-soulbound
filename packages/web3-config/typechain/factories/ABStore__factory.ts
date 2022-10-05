/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ABStore, ABStoreInterface } from "../ABStore";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "IncorrectETHSent",
    type: "error",
  },
  {
    inputs: [],
    name: "IncorrectItem",
    type: "error",
  },
  {
    inputs: [],
    name: "IncorrectParameters",
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
        name: "account",
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
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "itemIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "quantities",
        type: "uint256[]",
      },
    ],
    name: "Purchased",
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
        internalType: "uint256[]",
        name: "itemIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "quantities",
        type: "uint256[]",
      },
    ],
    name: "Redeemed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
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
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
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
        name: "priceABT",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "priceETH",
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
        name: "_priceABT",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_priceETH",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
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
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
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
        name: "priceABT",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceETH",
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
        internalType: "uint256[]",
        name: "_itemIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_quantities",
        type: "uint256[]",
      },
    ],
    name: "purchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_itemIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_quantities",
        type: "uint256[]",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
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
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
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
        internalType: "address",
        name: "_abToken",
        type: "address",
      },
    ],
    name: "setToken",
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
        name: "_priceABT",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_priceETH",
        type: "uint256",
      },
    ],
    name: "updateItem",
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
    name: "uri",
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
];

const _bytecode =
  "0x608060405260006004553480156200001657600080fd5b50604080516020810190915260008152620000318162000043565b506200003d3362000055565b62000218565b60026200005182826200014c565b5050565b600380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620000d257607f821691505b602082108103620000f357634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200014757600081815260208120601f850160051c81016020861015620001225750805b601f850160051c820191505b8181101562000143578281556001016200012e565b5050505b505050565b81516001600160401b03811115620001685762000168620000a7565b6200018081620001798454620000bd565b84620000f9565b602080601f831160018114620001b857600084156200019f5750858301515b600019600386901b1c1916600185901b17855562000143565b600085815260208120601f198616915b82811015620001e957888601518255948401946001909101908401620001c8565b5085821015620002085787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61203880620002286000396000f3fe6080604052600436106100d85760003560e01c8062fdd58e146100dd57806301ffc9a7146101105780630e89341c14610140578063144fa6d71461016d57806327cac9251461018f5780632ca51e22146101af5780632eb2c2d6146101cf5780634e1273f4146101ef578063715018a61461021c578063798a712a146102315780637d7348631461025157806386f3b23d146102675780638da5cb5b1461027a578063a22cb465146102a7578063bfb231d2146102c7578063e985e9c51461031e578063f242432a14610367578063f2fde38b14610387575b600080fd5b3480156100e957600080fd5b506100fd6100f836600461162a565b6103a7565b6040519081526020015b60405180910390f35b34801561011c57600080fd5b5061013061012b36600461166a565b610440565b6040519015158152602001610107565b34801561014c57600080fd5b5061016061015b36600461168e565b610490565b60405161010791906116ed565b34801561017957600080fd5b5061018d610188366004611700565b610524565b005b34801561019b57600080fd5b5061018d6101aa36600461171b565b610593565b3480156101bb57600080fd5b5061018d6101ca366004611823565b61062c565b3480156101db57600080fd5b5061018d6101ea3660046118f9565b610698565b3480156101fb57600080fd5b5061020f61020a3660046119a2565b6106e4565b6040516101079190611a90565b34801561022857600080fd5b5061018d61080d565b34801561023d57600080fd5b5061018d61024c366004611aa3565b610821565b34801561025d57600080fd5b506100fd60045481565b61018d610275366004611823565b6108b1565b34801561028657600080fd5b5061028f610ae1565b6040516001600160a01b039091168152602001610107565b3480156102b357600080fd5b5061018d6102c2366004611acf565b610af0565b3480156102d357600080fd5b506103036102e236600461168e565b60066020526000908152604090208054600182015460029092015490919083565b60408051938452602084019290925290820152606001610107565b34801561032a57600080fd5b50610130610339366004611b0b565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b34801561037357600080fd5b5061018d610382366004611b3e565b610aff565b34801561039357600080fd5b5061018d6103a2366004611700565b610b44565b60006001600160a01b0383166104175760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a2061646472657373207a65726f206973206e6f742061207660448201526930b634b21037bbb732b960b11b60648201526084015b60405180910390fd5b506000818152602081815260408083206001600160a01b03861684529091529020545b92915050565b60006001600160e01b03198216636cdb3d1360e11b148061047157506001600160e01b031982166303a24d0760e21b145b8061043a57506301ffc9a760e01b6001600160e01b031983161461043a565b60606002805461049f90611ba2565b80601f01602080910402602001604051908101604052809291908181526020018280546104cb90611ba2565b80156105185780601f106104ed57610100808354040283529160200191610518565b820191906000526020600020905b8154815290600101906020018083116104fb57829003601f168201915b50505050509050919050565b61052c610bbd565b6001600160a01b0381166105715760405162461bcd60e51b815260206004820152600c60248201526b7a65726f206164647265737360a01b604482015260640161040e565b600580546001600160a01b0319166001600160a01b0392909216919091179055565b61059b610bbd565b60045484106105bd57604051636609430360e01b815260040160405180910390fd5b6105c56115ed565b838152602080820184815260408084018581526000898152600690945292819020845181559151600183015591516002909101556004549051600080516020611fe38339815191529161061d91879087908790611bdc565b60405180910390a15050505050565b805182511461064e5760405163c4718a2d60e01b815260040160405180910390fd5b610659338383610c1c565b7f9936d6fe250f96d281bb580bb32e850a6ff520fb7b9ebe6c46a80713a36b8b8f33838360405161068c93929190611bf7565b60405180910390a15050565b6001600160a01b0385163314806106b457506106b48533610339565b6106d05760405162461bcd60e51b815260040161040e90611c37565b6106dd8585858585610e0d565b5050505050565b606081518351146107495760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e677468604482015268040dad2e6dac2e8c6d60bb1b606482015260840161040e565b600083516001600160401b038111156107645761076461174d565b60405190808252806020026020018201604052801561078d578160200160208202803683370190505b50905060005b8451811015610805576107d88582815181106107b1576107b1611c86565b60200260200101518583815181106107cb576107cb611c86565b60200260200101516103a7565b8282815181106107ea576107ea611c86565b60209081029190910101526107fe81611cb2565b9050610793565b509392505050565b610815610bbd565b61081f6000610f97565b565b610829610bbd565b6108316115ed565b8381526020808201848152604080840185815260048054600090815260069095529382902085518155925160018401555160029092019190915590549051600080516020611fe38339815191529161088e91879087908790611bdc565b60405180910390a1600480549060006108a683611cb2565b919050555050505050565b80518251146108d35760405163c4718a2d60e01b815260040160405180910390fd5b60008060005b8451811015610a00576000600660008784815181106108fa576108fa611c86565b60200260200101518152602001908152602001600020905084828151811061092457610924611c86565b6020026020010151816000015410156109505760405163ade1cb4160e01b815260040160405180910390fd5b84828151811061096257610962611c86565b602002602001015181600001600082825461097d9190611ccb565b92505081905550806001015485838151811061099b5761099b611c86565b60200260200101516109ad9190611cde565b6109b79085611cfd565b935080600201548583815181106109d0576109d0611c86565b60200260200101516109e29190611cde565b6109ec9084611cfd565b925050806109f990611cb2565b90506108d9565b50803414610a21576040516322790dad60e01b815260040160405180910390fd5b600554604051632770a7eb60e21b8152336004820152602481018490526001600160a01b0390911690639dc29fac90604401600060405180830381600087803b158015610a6d57600080fd5b505af1158015610a81573d6000803e3d6000fd5b50505050610aa033858560405180602001604052806000815250610fe9565b7f0b377c5768bbccb00d9290f71b66eecff8331381e24275ec8a7fb93227e80a4b338585604051610ad393929190611bf7565b60405180910390a150505050565b6003546001600160a01b031690565b610afb33838361115c565b5050565b6001600160a01b038516331480610b1b5750610b1b8533610339565b610b375760405162461bcd60e51b815260040161040e90611c37565b6106dd858585858561123c565b610b4c610bbd565b6001600160a01b038116610bb15760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161040e565b610bba81610f97565b50565b33610bc6610ae1565b6001600160a01b03161461081f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161040e565b6001600160a01b038316610c7e5760405162461bcd60e51b815260206004820152602360248201527f455243313135353a206275726e2066726f6d20746865207a65726f206164647260448201526265737360e81b606482015260840161040e565b8051825114610c9f5760405162461bcd60e51b815260040161040e90611d10565b604080516020810190915260009081905233905b8351811015610db1576000848281518110610cd057610cd0611c86565b602002602001015190506000848381518110610cee57610cee611c86565b602090810291909101810151600084815280835260408082206001600160a01b038c168352909352919091205490915081811015610d7a5760405162461bcd60e51b8152602060048201526024808201527f455243313135353a206275726e20616d6f756e7420657863656564732062616c604482015263616e636560e01b606482015260840161040e565b6000928352602083815260408085206001600160a01b038b1686529091529092209103905580610da981611cb2565b915050610cb3565b5060006001600160a01b0316846001600160a01b0316826001600160a01b0316600080516020611fc38339815191528686604051610df0929190611d58565b60405180910390a460408051602081019091526000905250505050565b8151835114610e2e5760405162461bcd60e51b815260040161040e90611d10565b6001600160a01b038416610e545760405162461bcd60e51b815260040161040e90611d86565b3360005b8451811015610f3b576000858281518110610e7557610e75611c86565b602002602001015190506000858381518110610e9357610e93611c86565b602090810291909101810151600084815280835260408082206001600160a01b038e168352909352919091205490915081811015610ee35760405162461bcd60e51b815260040161040e90611dcb565b6000838152602081815260408083206001600160a01b038e8116855292528083208585039055908b16825281208054849290610f20908490611cfd565b9250508190555050505080610f3490611cb2565b9050610e58565b50846001600160a01b0316866001600160a01b0316826001600160a01b0316600080516020611fc38339815191528787604051610f79929190611d58565b60405180910390a4610f8f818787878787611366565b505050505050565b600380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0384166110495760405162461bcd60e51b815260206004820152602160248201527f455243313135353a206d696e7420746f20746865207a65726f206164647265736044820152607360f81b606482015260840161040e565b815183511461106a5760405162461bcd60e51b815260040161040e90611d10565b3360005b84518110156111065783818151811061108957611089611c86565b60200260200101516000808784815181106110a6576110a6611c86565b602002602001015181526020019081526020016000206000886001600160a01b03166001600160a01b0316815260200190815260200160002060008282546110ee9190611cfd565b909155508190506110fe81611cb2565b91505061106e565b50846001600160a01b031660006001600160a01b0316826001600160a01b0316600080516020611fc38339815191528787604051611145929190611d58565b60405180910390a46106dd81600087878787611366565b816001600160a01b0316836001600160a01b0316036111cf5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604482015268103337b91039b2b63360b91b606482015260840161040e565b6001600160a01b03838116600081815260016020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0384166112625760405162461bcd60e51b815260040161040e90611d86565b33600061126e856114d1565b9050600061127b856114d1565b90506000868152602081815260408083206001600160a01b038c168452909152902054858110156112be5760405162461bcd60e51b815260040161040e90611dcb565b6000878152602081815260408083206001600160a01b038d8116855292528083208985039055908a168252812080548892906112fb908490611cfd565b909155505060408051888152602081018890526001600160a01b03808b16928c821692918816917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a461135b848a8a8a8a8a61151c565b505050505050505050565b611378846001600160a01b03166115de565b15610f8f5760405163bc197c8160e01b81526001600160a01b0385169063bc197c81906113b19089908990889088908890600401611e15565b6020604051808303816000875af19250505080156113ec575060408051601f3d908101601f191682019092526113e991810190611e73565b60015b611498576113f8611e90565b806308c379a003611431575061140c611eac565b806114175750611433565b8060405162461bcd60e51b815260040161040e91906116ed565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e20455243313135356044820152732932b1b2b4bb32b91034b6b83632b6b2b73a32b960611b606482015260840161040e565b6001600160e01b0319811663bc197c8160e01b146114c85760405162461bcd60e51b815260040161040e90611f35565b50505050505050565b6040805160018082528183019092526060916000919060208083019080368337019050509050828160008151811061150b5761150b611c86565b602090810291909101015292915050565b61152e846001600160a01b03166115de565b15610f8f5760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e61906115679089908990889088908890600401611f7d565b6020604051808303816000875af19250505080156115a2575060408051601f3d908101601f1916820190925261159f91810190611e73565b60015b6115ae576113f8611e90565b6001600160e01b0319811663f23a6e6160e01b146114c85760405162461bcd60e51b815260040161040e90611f35565b6001600160a01b03163b151590565b60405180606001604052806000815260200160008152602001600081525090565b80356001600160a01b038116811461162557600080fd5b919050565b6000806040838503121561163d57600080fd5b6116468361160e565b946020939093013593505050565b6001600160e01b031981168114610bba57600080fd5b60006020828403121561167c57600080fd5b813561168781611654565b9392505050565b6000602082840312156116a057600080fd5b5035919050565b6000815180845260005b818110156116cd576020818501810151868301820152016116b1565b506000602082860101526020601f19601f83011685010191505092915050565b60208152600061168760208301846116a7565b60006020828403121561171257600080fd5b6116878261160e565b6000806000806080858703121561173157600080fd5b5050823594602084013594506040840135936060013592509050565b634e487b7160e01b600052604160045260246000fd5b601f8201601f191681016001600160401b03811182821017156117885761178861174d565b6040525050565b60006001600160401b038211156117a8576117a861174d565b5060051b60200190565b600082601f8301126117c357600080fd5b813560206117d08261178f565b6040516117dd8282611763565b83815260059390931b85018201928281019150868411156117fd57600080fd5b8286015b848110156118185780358352918301918301611801565b509695505050505050565b6000806040838503121561183657600080fd5b82356001600160401b038082111561184d57600080fd5b611859868387016117b2565b9350602085013591508082111561186f57600080fd5b5061187c858286016117b2565b9150509250929050565b600082601f83011261189757600080fd5b81356001600160401b038111156118b0576118b061174d565b6040516118c7601f8301601f191660200182611763565b8181528460208386010111156118dc57600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a0868803121561191157600080fd5b61191a8661160e565b94506119286020870161160e565b935060408601356001600160401b038082111561194457600080fd5b61195089838a016117b2565b9450606088013591508082111561196657600080fd5b61197289838a016117b2565b9350608088013591508082111561198857600080fd5b5061199588828901611886565b9150509295509295909350565b600080604083850312156119b557600080fd5b82356001600160401b03808211156119cc57600080fd5b818501915085601f8301126119e057600080fd5b813560206119ed8261178f565b6040516119fa8282611763565b83815260059390931b8501820192828101915089841115611a1a57600080fd5b948201945b83861015611a3f57611a308661160e565b82529482019490820190611a1f565b9650508601359250508082111561186f57600080fd5b600081518084526020808501945080840160005b83811015611a8557815187529582019590820190600101611a69565b509495945050505050565b6020815260006116876020830184611a55565b600080600060608486031215611ab857600080fd5b505081359360208301359350604090920135919050565b60008060408385031215611ae257600080fd5b611aeb8361160e565b915060208301358015158114611b0057600080fd5b809150509250929050565b60008060408385031215611b1e57600080fd5b611b278361160e565b9150611b356020840161160e565b90509250929050565b600080600080600060a08688031215611b5657600080fd5b611b5f8661160e565b9450611b6d6020870161160e565b9350604086013592506060860135915060808601356001600160401b03811115611b9657600080fd5b61199588828901611886565b600181811c90821680611bb657607f821691505b602082108103611bd657634e487b7160e01b600052602260045260246000fd5b50919050565b93845260208401929092526040830152606082015260800190565b6001600160a01b0384168152606060208201819052600090611c1b90830185611a55565b8281036040840152611c2d8185611a55565b9695505050505050565b6020808252602f908201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60408201526e195c881b9bdc88185c1c1c9bdd9959608a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201611cc457611cc4611c9c565b5060010190565b8181038181111561043a5761043a611c9c565b6000816000190483118215151615611cf857611cf8611c9c565b500290565b8082018082111561043a5761043a611c9c565b60208082526028908201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206040820152670dad2e6dac2e8c6d60c31b606082015260800190565b604081526000611d6b6040830185611a55565b8281036020840152611d7d8185611a55565b95945050505050565b60208082526025908201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252602a908201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60408201526939103a3930b739b332b960b11b606082015260800190565b6001600160a01b0386811682528516602082015260a060408201819052600090611e4190830186611a55565b8281036060840152611e538186611a55565b90508281036080840152611e6781856116a7565b98975050505050505050565b600060208284031215611e8557600080fd5b815161168781611654565b600060033d1115611ea95760046000803e5060005160e01c5b90565b600060443d1015611eba5790565b6040516003193d81016004833e81513d6001600160401b038083116024840183101715611ee957505050505090565b8285019150815181811115611f015750505050505090565b843d8701016020828501011115611f1b5750505050505090565b611f2a60208286010187611763565b509095945050505050565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b6001600160a01b03868116825285166020820152604081018490526060810183905260a060808201819052600090611fb7908301846116a7565b97965050505050505056fe4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fbed96142fee261309b466958156e2f1a8fa4e0cc2f36a458023e77837918b38bda2646970667358221220d7abd180255f20a1d0bd9086cd79fa73cefa45d7193c4b766add45990608246564736f6c63430008100033";

type ABStoreConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ABStoreConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ABStore__factory extends ContractFactory {
  constructor(...args: ABStoreConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ABStore";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ABStore> {
    return super.deploy(overrides || {}) as Promise<ABStore>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ABStore {
    return super.attach(address) as ABStore;
  }
  connect(signer: Signer): ABStore__factory {
    return super.connect(signer) as ABStore__factory;
  }
  static readonly contractName: "ABStore";
  public readonly contractName: "ABStore";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ABStoreInterface {
    return new utils.Interface(_abi) as ABStoreInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ABStore {
    return new Contract(address, _abi, signerOrProvider) as ABStore;
  }
}
