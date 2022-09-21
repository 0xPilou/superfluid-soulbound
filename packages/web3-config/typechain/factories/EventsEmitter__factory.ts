/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { EventsEmitter, EventsEmitterInterface } from "../EventsEmitter";

const _abi = [
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
];

const _bytecode =
  "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220a8b9b48a792ac1857800dd78c18af289691b6bca657462190f9d9c70746dd69464736f6c63430008100033";

type EventsEmitterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EventsEmitterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EventsEmitter__factory extends ContractFactory {
  constructor(...args: EventsEmitterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "EventsEmitter";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<EventsEmitter> {
    return super.deploy(overrides || {}) as Promise<EventsEmitter>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): EventsEmitter {
    return super.attach(address) as EventsEmitter;
  }
  connect(signer: Signer): EventsEmitter__factory {
    return super.connect(signer) as EventsEmitter__factory;
  }
  static readonly contractName: "EventsEmitter";
  public readonly contractName: "EventsEmitter";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EventsEmitterInterface {
    return new utils.Interface(_abi) as EventsEmitterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EventsEmitter {
    return new Contract(address, _abi, signerOrProvider) as EventsEmitter;
  }
}
