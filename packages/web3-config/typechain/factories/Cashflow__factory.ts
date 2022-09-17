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
      {
        internalType: "contract ISuperToken",
        name: "_acceptedToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
  "0x60a06040523480156200001157600080fd5b50604051620025ff380380620025ff833981810160405281019062000037919062000327565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036200007757620000766200036e565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620000b757620000b66200036e565b5b8073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff168152505060405180604001604052808373ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1663b6d200de7fa9214cc96615e0085d3bb077758db69497dc2dce3b2b1e97bc93c3d18d83efd36040518263ffffffff1660e01b81526004016200016d9190620003b8565b602060405180830381865afa1580156200018b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001b191906200041a565b73ffffffffffffffffffffffffffffffffffffffff168152506000808201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505050506200044c565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002968262000269565b9050919050565b6000620002aa8262000289565b9050919050565b620002bc816200029d565b8114620002c857600080fd5b50565b600081519050620002dc81620002b1565b92915050565b6000620002ef8262000289565b9050919050565b6200030181620002e2565b81146200030d57600080fd5b50565b6000815190506200032181620002f6565b92915050565b6000806040838503121562000341576200034062000264565b5b60006200035185828601620002cb565b9250506020620003648582860162000310565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b6000819050919050565b620003b2816200039d565b82525050565b6000602082019050620003cf6000830184620003a7565b92915050565b6000620003e28262000289565b9050919050565b620003f481620003d5565b81146200040057600080fd5b50565b6000815190506200041481620003e9565b92915050565b60006020828403121562000433576200043262000264565b5b6000620004438482850162000403565b91505092915050565b60805161216d620004926000396000818161060501528181610847015281816108e00152818161092a015281816109e801528181610a7e0152610abb015261216d6000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80635f9e7d77116100715780635f9e7d77146101a05780637141ca4a146101d057806379bcb8df146101ec578063884d1f401461021c578063951683821461024c578063d86ed3e51461027f576100b4565b806306fa0220146100b9578063230dbd29146100d557806330d9c915146101055780634ab847711461013557806353c11f991461015157806355586a3114610181575b600080fd5b6100d360048036038101906100ce919061122e565b6102af565b005b6100ef60048036038101906100ea919061135a565b6102bf565b6040516100fc91906114e2565b60405180910390f35b61011f600480360381019061011a9190611504565b6102fc565b60405161012c91906114e2565b60405180910390f35b61014f600480360381019061014a91906115c0565b610339565b005b61016b6004803603810190610166919061135a565b610392565b60405161017891906114e2565b60405180910390f35b6101896103cf565b604051610197929190611693565b60405180910390f35b6101ba60048036038101906101b59190611504565b610421565b6040516101c791906114e2565b60405180910390f35b6101ea60048036038101906101e591906116bc565b61045e565b005b6102066004803603810190610201919061170f565b61055f565b604051610213919061174b565b60405180910390f35b61023660048036038101906102319190611504565b61057f565b60405161024391906114e2565b60405180910390f35b61026660048036038101906102619190611766565b6105bc565b60405161027694939291906117a2565b60405180910390f35b6102996004803603810190610294919061135a565b610694565b6040516102a691906114e2565b60405180910390f35b6102ba8383836106d1565b505050565b60606040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f39061186a565b60405180910390fd5b60606040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610330906118fc565b60405180910390fd5b610363836002600084815260200190815260200160002060009054906101000a9004600b0b6107cf565b61038d826002600084815260200190815260200160002060009054906101000a9004600b0b61096f565b505050565b60606040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103c69061198e565b60405180910390fd5b60008060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b60606040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045590611a20565b60405180910390fd5b600082600b0b12156104a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049c90611a8c565b60405180910390fd5b600082600b0b036104df576104da816002600086815260200190815260200160002060009054906101000a9004600b0b6107cf565b610515565b610514816002600086815260200190815260200160002060009054906101000a9004600b0b8461050f9190611adb565b61096f565b5b816002600085815260200190815260200160002060006101000a8154816bffffffffffffffffffffffff0219169083600b0b6bffffffffffffffffffffffff160217905550505050565b60026020528060005260406000206000915054906101000a9004600b0b81565b60606040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105b390611bcd565b60405180910390fd5b600080600080600060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e6a1e8887f000000000000000000000000000000000000000000000000000000000000000030886040518463ffffffff1660e01b815260040161064493929190611c1d565b608060405180830381865afa158015610661573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106859190611c7e565b93509350935093509193509193565b60606040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106c890611d57565b60405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361073f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073690611dc3565b60405180910390fd5b600082600b0b13610785576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077c90611e2f565b60405180910390fd5b816002600083815260200190815260200160002060006101000a8154816bffffffffffffffffffffffff0219169083600b0b6bffffffffffffffffffffffff160217905550505050565b3073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16031561096b5760008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e6a1e8887f000000000000000000000000000000000000000000000000000000000000000030866040518463ffffffff1660e01b815260040161088693929190611c1d565b608060405180830381865afa1580156108a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108c79190611c7e565b505091505081600b0b81600b0b036109165761091130847f00000000000000000000000000000000000000000000000000000000000000006000610aff909392919063ffffffff16565b610969565b81600b0b81600b0b131561096857610967837f000000000000000000000000000000000000000000000000000000000000000084846109559190611adb565b6000610b5f909392919063ffffffff16565b5b5b505b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160315610afb5760008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e6a1e8887f000000000000000000000000000000000000000000000000000000000000000030866040518463ffffffff1660e01b8152600401610a2793929190611c1d565b608060405180830381865afa158015610a44573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a689190611c7e565b5050915050600081600b0b03610ab557610ab0837f0000000000000000000000000000000000000000000000000000000000000000846000610bbf909392919063ffffffff16565b610af9565b610af8837f00000000000000000000000000000000000000000000000000000000000000008484610ae69190611e4f565b6000610b5f909392919063ffffffff16565b5b505b5050565b610b5984848484600067ffffffffffffffff811115610b2157610b20611ecf565b5b6040519080825280601f01601f191660200182016040528015610b535781602001600182028036833780820191505090505b50610c1f565b50505050565b610bb984848484600067ffffffffffffffff811115610b8157610b80611ecf565b5b6040519080825280601f01601f191660200182016040528015610bb35781602001600182028036833780820191505090505b50610dd9565b50505050565b610c1984848484600067ffffffffffffffff811115610be157610be0611ecf565b5b6040519080825280601f01601f191660200182016040528015610c135781602001600182028036833780820191505090505b50610f93565b50505050565b8460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166339255d5b8660010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168760010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b4b333c6868989600067ffffffffffffffff811115610ce257610ce1611ecf565b5b6040519080825280601f01601f191660200182016040528015610d145781602001600182028036833780820191505090505b50604051602401610d289493929190611f1f565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050846040518463ffffffff1660e01b8152600401610d8993929190611f6b565b6000604051808303816000875af1158015610da8573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610dd191906120a2565b505050505050565b8460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166339255d5b8660010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168760010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166350209a62878988600067ffffffffffffffff811115610e9c57610e9b611ecf565b5b6040519080825280601f01601f191660200182016040528015610ece5781602001600182028036833780820191505090505b50604051602401610ee294939291906120eb565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050846040518463ffffffff1660e01b8152600401610f4393929190611f6b565b6000604051808303816000875af1158015610f62573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610f8b91906120a2565b505050505050565b8460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166339255d5b8660010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168760010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166362fc305e878988600067ffffffffffffffff81111561105657611055611ecf565b5b6040519080825280601f01601f1916602001820160405280156110885781602001600182028036833780820191505090505b5060405160240161109c94939291906120eb565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050846040518463ffffffff1660e01b81526004016110fd93929190611f6b565b6000604051808303816000875af115801561111c573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061114591906120a2565b505050505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061118c82611161565b9050919050565b61119c81611181565b81146111a757600080fd5b50565b6000813590506111b981611193565b92915050565b600081600b0b9050919050565b6111d5816111bf565b81146111e057600080fd5b50565b6000813590506111f2816111cc565b92915050565b6000819050919050565b61120b816111f8565b811461121657600080fd5b50565b60008135905061122881611202565b92915050565b60008060006060848603121561124757611246611157565b5b6000611255868287016111aa565b9350506020611266868287016111e3565b925050604061127786828701611219565b9150509250925092565b600061128c82611181565b9050919050565b61129c81611281565b81146112a757600080fd5b50565b6000813590506112b981611293565b92915050565b6000819050919050565b6112d2816112bf565b81146112dd57600080fd5b50565b6000813590506112ef816112c9565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261131a576113196112f5565b5b8235905067ffffffffffffffff811115611337576113366112fa565b5b602083019150836001820283011115611353576113526112ff565b5b9250929050565b600080600080600080600080600060c08a8c03121561137c5761137b611157565b5b600061138a8c828d016112aa565b995050602061139b8c828d016111aa565b98505060406113ac8c828d016112e0565b97505060608a013567ffffffffffffffff8111156113cd576113cc61115c565b5b6113d98c828d01611304565b965096505060808a013567ffffffffffffffff8111156113fc576113fb61115c565b5b6114088c828d01611304565b945094505060a08a013567ffffffffffffffff81111561142b5761142a61115c565b5b6114378c828d01611304565b92509250509295985092959850929598565b600081519050919050565b600082825260208201905092915050565b60005b83811015611483578082015181840152602081019050611468565b83811115611492576000848401525b50505050565b6000601f19601f8301169050919050565b60006114b482611449565b6114be8185611454565b93506114ce818560208601611465565b6114d781611498565b840191505092915050565b600060208201905081810360008301526114fc81846114a9565b905092915050565b600080600080600080600060a0888a03121561152357611522611157565b5b60006115318a828b016112aa565b97505060206115428a828b016111aa565b96505060406115538a828b016112e0565b955050606088013567ffffffffffffffff8111156115745761157361115c565b5b6115808a828b01611304565b9450945050608088013567ffffffffffffffff8111156115a3576115a261115c565b5b6115af8a828b01611304565b925092505092959891949750929550565b6000806000606084860312156115d9576115d8611157565b5b60006115e7868287016111aa565b93505060206115f8868287016111aa565b925050604061160986828701611219565b9150509250925092565b6000819050919050565b600061163861163361162e84611161565b611613565b611161565b9050919050565b600061164a8261161d565b9050919050565b600061165c8261163f565b9050919050565b61166c81611651565b82525050565b600061167d8261163f565b9050919050565b61168d81611672565b82525050565b60006040820190506116a86000830185611663565b6116b56020830184611684565b9392505050565b6000806000606084860312156116d5576116d4611157565b5b60006116e386828701611219565b93505060206116f4868287016111e3565b9250506040611705868287016111aa565b9150509250925092565b60006020828403121561172557611724611157565b5b600061173384828501611219565b91505092915050565b611745816111bf565b82525050565b6000602082019050611760600083018461173c565b92915050565b60006020828403121561177c5761177b611157565b5b600061178a848285016111aa565b91505092915050565b61179c816111f8565b82525050565b60006080820190506117b76000830187611793565b6117c4602083018661173c565b6117d16040830185611793565b6117de6060830184611793565b95945050505050565b600082825260208201905092915050565b7f556e737570706f727465642063616c6c6261636b202d2041667465722041677260008201527f65656d656e742055706461746564000000000000000000000000000000000000602082015250565b6000611854602e836117e7565b915061185f826117f8565b604082019050919050565b6000602082019050818103600083015261188381611847565b9050919050565b7f556e737570706f727465642063616c6c6261636b202d204265666f726520416760008201527f7265656d656e7420437265617465640000000000000000000000000000000000602082015250565b60006118e6602f836117e7565b91506118f18261188a565b604082019050919050565b60006020820190508181036000830152611915816118d9565b9050919050565b7f556e737570706f727465642063616c6c6261636b202d2041667465722041677260008201527f65656d656e74205465726d696e61746564000000000000000000000000000000602082015250565b60006119786031836117e7565b91506119838261191c565b604082019050919050565b600060208201905081810360008301526119a78161196b565b9050919050565b7f556e737570706f727465642063616c6c6261636b202d20204265666f7265204160008201527f677265656d656e74205465726d696e6174656400000000000000000000000000602082015250565b6000611a0a6033836117e7565b9150611a15826119ae565b604082019050919050565b60006020820190508181036000830152611a39816119fd565b9050919050565b7f666c6f7752617465206d75737420626520706f73697469766521000000000000600082015250565b6000611a76601a836117e7565b9150611a8182611a40565b602082019050919050565b60006020820190508181036000830152611aa581611a69565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611ae6826111bf565b9150611af1836111bf565b9250827fffffffffffffffffffffffffffffffffffffffff80000000000000000000000001821260008412151615611b2c57611b2b611aac565b5b826b7fffffffffffffffffffffff018213600084121615611b5057611b4f611aac565b5b828203905092915050565b7f556e737570706f727465642063616c6c6261636b202d204265666f726520416760008201527f7265656d656e7420757064617465640000000000000000000000000000000000602082015250565b6000611bb7602f836117e7565b9150611bc282611b5b565b604082019050919050565b60006020820190508181036000830152611be681611baa565b9050919050565b6000611bf88261163f565b9050919050565b611c0881611bed565b82525050565b611c1781611181565b82525050565b6000606082019050611c326000830186611bff565b611c3f6020830185611c0e565b611c4c6040830184611c0e565b949350505050565b600081519050611c6381611202565b92915050565b600081519050611c78816111cc565b92915050565b60008060008060808587031215611c9857611c97611157565b5b6000611ca687828801611c54565b9450506020611cb787828801611c69565b9350506040611cc887828801611c54565b9250506060611cd987828801611c54565b91505092959194509250565b7f556e737570706f727465642063616c6c6261636b202d2041667465722041677260008201527f65656d656e742043726561746564000000000000000000000000000000000000602082015250565b6000611d41602e836117e7565b9150611d4c82611ce5565b604082019050919050565b60006020820190508181036000830152611d7081611d34565b9050919050565b7f497373756520746f2061206e6577206164647265737300000000000000000000600082015250565b6000611dad6016836117e7565b9150611db882611d77565b602082019050919050565b60006020820190508181036000830152611ddc81611da0565b9050919050565b7f666c6f775261746565206d75737420626520706f736974697665210000000000600082015250565b6000611e19601b836117e7565b9150611e2482611de3565b602082019050919050565b60006020820190508181036000830152611e4881611e0c565b9050919050565b6000611e5a826111bf565b9150611e65836111bf565b9250816b7fffffffffffffffffffffff03831360008312151615611e8c57611e8b611aac565b5b817fffffffffffffffffffffffffffffffffffffffff800000000000000000000000038312600083121615611ec457611ec3611aac565b5b828201905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000611f098261163f565b9050919050565b611f1981611efe565b82525050565b6000608082019050611f346000830187611f10565b611f416020830186611c0e565b611f4e6040830185611c0e565b8181036060830152611f6081846114a9565b905095945050505050565b6000606082019050611f806000830186611684565b8181036020830152611f9281856114a9565b90508181036040830152611fa681846114a9565b9050949350505050565b600080fd5b611fbe82611498565b810181811067ffffffffffffffff82111715611fdd57611fdc611ecf565b5b80604052505050565b6000611ff061114d565b9050611ffc8282611fb5565b919050565b600067ffffffffffffffff82111561201c5761201b611ecf565b5b61202582611498565b9050602081019050919050565b600061204561204084612001565b611fe6565b90508281526020810184848401111561206157612060611fb0565b5b61206c848285611465565b509392505050565b600082601f830112612089576120886112f5565b5b8151612099848260208601612032565b91505092915050565b6000602082840312156120b8576120b7611157565b5b600082015167ffffffffffffffff8111156120d6576120d561115c565b5b6120e284828501612074565b91505092915050565b60006080820190506121006000830187611f10565b61210d6020830186611c0e565b61211a604083018561173c565b818103606083015261212c81846114a9565b90509594505050505056fea26469706673582212202bec2fbf4aee353f91436be2789ad71c95ce405e52400cf0b138c898dd6e0cf864736f6c634300080e0033";

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
    _acceptedToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Cashflow> {
    return super.deploy(
      host,
      _acceptedToken,
      overrides || {}
    ) as Promise<Cashflow>;
  }
  getDeployTransaction(
    host: string,
    _acceptedToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(host, _acceptedToken, overrides || {});
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
