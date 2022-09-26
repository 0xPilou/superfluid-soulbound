/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { HackerMock, HackerMockInterface } from "../HackerMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_optimisticContractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_cashflowContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "cashflowContract",
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
        name: "subscriber",
        type: "address",
      },
    ],
    name: "hackFlow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516102cc3803806102cc83398101604081905261002f9161007c565b600180546001600160a01b039384166001600160a01b031991821617909155600080549290931691161790556100af565b80516001600160a01b038116811461007757600080fd5b919050565b6000806040838503121561008f57600080fd5b61009883610060565b91506100a660208401610060565b90509250929050565b61020e806100be6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80638d32238f1461003b578063c1b3da481461006a575b600080fd5b60005461004e906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b61007d61007836600461013d565b61007f565b005b6001546000546040516001600160a01b03848116602483015264e8d4a51000604483015261029a606483015292831692633dbb202b92169060840160408051601f198184030181529181526020820180516001600160e01b03166237d01160e51b1790525160e084901b6001600160e01b0319168152610108929190629896809060040161016d565b600060405180830381600087803b15801561012257600080fd5b505af1158015610136573d6000803e3d6000fd5b5050505050565b60006020828403121561014f57600080fd5b81356001600160a01b038116811461016657600080fd5b9392505050565b60018060a01b038416815260006020606081840152845180606085015260005b818110156101a95786810183015185820160800152820161018d565b506000608082860101526080601f19601f8301168501019250505063ffffffff8316604083015294935050505056fea26469706673582212201e3a84bec75ecbe034ec94cbfddc9ddee40d4cd918c6234139290422d1eff17d64736f6c63430008100033";

type HackerMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HackerMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class HackerMock__factory extends ContractFactory {
  constructor(...args: HackerMockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "HackerMock";
  }

  deploy(
    _optimisticContractAddress: string,
    _cashflowContract: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<HackerMock> {
    return super.deploy(
      _optimisticContractAddress,
      _cashflowContract,
      overrides || {}
    ) as Promise<HackerMock>;
  }
  getDeployTransaction(
    _optimisticContractAddress: string,
    _cashflowContract: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _optimisticContractAddress,
      _cashflowContract,
      overrides || {}
    );
  }
  attach(address: string): HackerMock {
    return super.attach(address) as HackerMock;
  }
  connect(signer: Signer): HackerMock__factory {
    return super.connect(signer) as HackerMock__factory;
  }
  static readonly contractName: "HackerMock";
  public readonly contractName: "HackerMock";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HackerMockInterface {
    return new utils.Interface(_abi) as HackerMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HackerMock {
    return new Contract(address, _abi, signerOrProvider) as HackerMock;
  }
}
