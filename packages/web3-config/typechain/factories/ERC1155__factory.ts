/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC1155, ERC1155Interface } from "../ERC1155";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
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
  "0x60806040523480156200001157600080fd5b50604051620016313803806200163183398101604081905262000034916200006e565b6200003f8162000046565b506200029e565b6002620000548282620001d2565b5050565b634e487b7160e01b600052604160045260246000fd5b600060208083850312156200008257600080fd5b82516001600160401b03808211156200009a57600080fd5b818501915085601f830112620000af57600080fd5b815181811115620000c457620000c462000058565b604051601f8201601f19908116603f01168101908382118183101715620000ef57620000ef62000058565b8160405282815288868487010111156200010857600080fd5b600093505b828410156200012c57848401860151818501870152928501926200010d565b600086848301015280965050505050505092915050565b600181811c908216806200015857607f821691505b6020821081036200017957634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620001cd57600081815260208120601f850160051c81016020861015620001a85750805b601f850160051c820191505b81811015620001c957828155600101620001b4565b5050505b505050565b81516001600160401b03811115620001ee57620001ee62000058565b6200020681620001ff845462000143565b846200017f565b602080601f8311600181146200023e5760008415620002255750858301515b600019600386901b1c1916600185901b178555620001c9565b600085815260208120601f198616915b828110156200026f578886015182559484019460019091019084016200024e565b50858210156200028e5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61138380620002ae6000396000f3fe608060405234801561001057600080fd5b50600436106100775760003560e01c8062fdd58e1461007c57806301ffc9a7146100a25780630e89341c146100c55780632eb2c2d6146100e55780634e1273f4146100fa578063a22cb4651461011a578063e985e9c51461012d578063f242432a14610169575b600080fd5b61008f61008a366004610b4c565b61017c565b6040519081526020015b60405180910390f35b6100b56100b0366004610b8f565b610215565b6040519015158152602001610099565b6100d86100d3366004610bb3565b610265565b6040516100999190610c12565b6100f86100f3366004610d6e565b6102f9565b005b61010d610108366004610e17565b610345565b6040516100999190610f1c565b6100f8610128366004610f2f565b61046e565b6100b561013b366004610f6b565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b6100f8610177366004610f9e565b61047d565b60006001600160a01b0383166101ec5760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a2061646472657373207a65726f206973206e6f742061207660448201526930b634b21037bbb732b960b11b60648201526084015b60405180910390fd5b506000818152602081815260408083206001600160a01b03861684529091529020545b92915050565b60006001600160e01b03198216636cdb3d1360e11b148061024657506001600160e01b031982166303a24d0760e21b145b8061020f57506301ffc9a760e01b6001600160e01b031983161461020f565b60606002805461027490611002565b80601f01602080910402602001604051908101604052809291908181526020018280546102a090611002565b80156102ed5780601f106102c2576101008083540402835291602001916102ed565b820191906000526020600020905b8154815290600101906020018083116102d057829003601f168201915b50505050509050919050565b6001600160a01b0385163314806103155750610315853361013b565b6103315760405162461bcd60e51b81526004016101e39061103c565b61033e85858585856104c2565b5050505050565b606081518351146103aa5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e677468604482015268040dad2e6dac2e8c6d60bb1b60648201526084016101e3565b600083516001600160401b038111156103c5576103c5610c25565b6040519080825280602002602001820160405280156103ee578160200160208202803683370190505b50905060005b8451811015610466576104398582815181106104125761041261108b565b602002602001015185838151811061042c5761042c61108b565b602002602001015161017c565b82828151811061044b5761044b61108b565b602090810291909101015261045f816110b7565b90506103f4565b509392505050565b61047933838361069f565b5050565b6001600160a01b0385163314806104995750610499853361013b565b6104b55760405162461bcd60e51b81526004016101e39061103c565b61033e858585858561077f565b81518351146105245760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206044820152670dad2e6dac2e8c6d60c31b60648201526084016101e3565b6001600160a01b03841661054a5760405162461bcd60e51b81526004016101e3906110d0565b3360005b845181101561063157600085828151811061056b5761056b61108b565b6020026020010151905060008583815181106105895761058961108b565b602090810291909101810151600084815280835260408082206001600160a01b038e1683529093529190912054909150818110156105d95760405162461bcd60e51b81526004016101e390611115565b6000838152602081815260408083206001600160a01b038e8116855292528083208585039055908b1682528120805484929061061690849061115f565b925050819055505050508061062a906110b7565b905061054e565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610681929190611172565b60405180910390a46106978187878787876108a9565b505050505050565b816001600160a01b0316836001600160a01b0316036107125760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604482015268103337b91039b2b63360b91b60648201526084016101e3565b6001600160a01b03838116600081815260016020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0384166107a55760405162461bcd60e51b81526004016101e3906110d0565b3360006107b185610a14565b905060006107be85610a14565b90506000868152602081815260408083206001600160a01b038c168452909152902054858110156108015760405162461bcd60e51b81526004016101e390611115565b6000878152602081815260408083206001600160a01b038d8116855292528083208985039055908a1682528120805488929061083e90849061115f565b909155505060408051888152602081018890526001600160a01b03808b16928c821692918816917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a461089e848a8a8a8a8a610a5f565b505050505050505050565b6108bb846001600160a01b0316610b21565b156106975760405163bc197c8160e01b81526001600160a01b0385169063bc197c81906108f490899089908890889088906004016111a0565b6020604051808303816000875af192505050801561092f575060408051601f3d908101601f1916820190925261092c918101906111fe565b60015b6109db5761093b61121b565b806308c379a003610974575061094f611237565b8061095a5750610976565b8060405162461bcd60e51b81526004016101e39190610c12565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e20455243313135356044820152732932b1b2b4bb32b91034b6b83632b6b2b73a32b960611b60648201526084016101e3565b6001600160e01b0319811663bc197c8160e01b14610a0b5760405162461bcd60e51b81526004016101e3906112c0565b50505050505050565b60408051600180825281830190925260609160009190602080830190803683370190505090508281600081518110610a4e57610a4e61108b565b602090810291909101015292915050565b610a71846001600160a01b0316610b21565b156106975760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e6190610aaa9089908990889088908890600401611308565b6020604051808303816000875af1925050508015610ae5575060408051601f3d908101601f19168201909252610ae2918101906111fe565b60015b610af15761093b61121b565b6001600160e01b0319811663f23a6e6160e01b14610a0b5760405162461bcd60e51b81526004016101e3906112c0565b6001600160a01b03163b151590565b80356001600160a01b0381168114610b4757600080fd5b919050565b60008060408385031215610b5f57600080fd5b610b6883610b30565b946020939093013593505050565b6001600160e01b031981168114610b8c57600080fd5b50565b600060208284031215610ba157600080fd5b8135610bac81610b76565b9392505050565b600060208284031215610bc557600080fd5b5035919050565b6000815180845260005b81811015610bf257602081850181015186830182015201610bd6565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610bac6020830184610bcc565b634e487b7160e01b600052604160045260246000fd5b601f8201601f191681016001600160401b0381118282101715610c6057610c60610c25565b6040525050565b60006001600160401b03821115610c8057610c80610c25565b5060051b60200190565b600082601f830112610c9b57600080fd5b81356020610ca882610c67565b604051610cb58282610c3b565b83815260059390931b8501820192828101915086841115610cd557600080fd5b8286015b84811015610cf05780358352918301918301610cd9565b509695505050505050565b600082601f830112610d0c57600080fd5b81356001600160401b03811115610d2557610d25610c25565b604051610d3c601f8301601f191660200182610c3b565b818152846020838601011115610d5157600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a08688031215610d8657600080fd5b610d8f86610b30565b9450610d9d60208701610b30565b935060408601356001600160401b0380821115610db957600080fd5b610dc589838a01610c8a565b94506060880135915080821115610ddb57600080fd5b610de789838a01610c8a565b93506080880135915080821115610dfd57600080fd5b50610e0a88828901610cfb565b9150509295509295909350565b60008060408385031215610e2a57600080fd5b82356001600160401b0380821115610e4157600080fd5b818501915085601f830112610e5557600080fd5b81356020610e6282610c67565b604051610e6f8282610c3b565b83815260059390931b8501820192828101915089841115610e8f57600080fd5b948201945b83861015610eb457610ea586610b30565b82529482019490820190610e94565b96505086013592505080821115610eca57600080fd5b50610ed785828601610c8a565b9150509250929050565b600081518084526020808501945080840160005b83811015610f1157815187529582019590820190600101610ef5565b509495945050505050565b602081526000610bac6020830184610ee1565b60008060408385031215610f4257600080fd5b610f4b83610b30565b915060208301358015158114610f6057600080fd5b809150509250929050565b60008060408385031215610f7e57600080fd5b610f8783610b30565b9150610f9560208401610b30565b90509250929050565b600080600080600060a08688031215610fb657600080fd5b610fbf86610b30565b9450610fcd60208701610b30565b9350604086013592506060860135915060808601356001600160401b03811115610ff657600080fd5b610e0a88828901610cfb565b600181811c9082168061101657607f821691505b60208210810361103657634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602f908201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60408201526e195c881b9bdc88185c1c1c9bdd9959608a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016110c9576110c96110a1565b5060010190565b60208082526025908201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252602a908201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60408201526939103a3930b739b332b960b11b606082015260800190565b8082018082111561020f5761020f6110a1565b6040815260006111856040830185610ee1565b82810360208401526111978185610ee1565b95945050505050565b6001600160a01b0386811682528516602082015260a0604082018190526000906111cc90830186610ee1565b82810360608401526111de8186610ee1565b905082810360808401526111f28185610bcc565b98975050505050505050565b60006020828403121561121057600080fd5b8151610bac81610b76565b600060033d11156112345760046000803e5060005160e01c5b90565b600060443d10156112455790565b6040516003193d81016004833e81513d6001600160401b03808311602484018310171561127457505050505090565b828501915081518181111561128c5750505050505090565b843d87010160208285010111156112a65750505050505090565b6112b560208286010187610c3b565b509095945050505050565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b6001600160a01b03868116825285166020820152604081018490526060810183905260a06080820181905260009061134290830184610bcc565b97965050505050505056fea2646970667358221220299fec7448d1db64bd42262221474f93de77ed4eacfbef348e883bdf9858c00d64736f6c63430008100033";

type ERC1155ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155__factory extends ContractFactory {
  constructor(...args: ERC1155ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC1155";
  }

  deploy(
    uri_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC1155> {
    return super.deploy(uri_, overrides || {}) as Promise<ERC1155>;
  }
  getDeployTransaction(
    uri_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(uri_, overrides || {});
  }
  attach(address: string): ERC1155 {
    return super.attach(address) as ERC1155;
  }
  connect(signer: Signer): ERC1155__factory {
    return super.connect(signer) as ERC1155__factory;
  }
  static readonly contractName: "ERC1155";
  public readonly contractName: "ERC1155";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155Interface {
    return new utils.Interface(_abi) as ERC1155Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155 {
    return new Contract(address, _abi, signerOrProvider) as ERC1155;
  }
}
