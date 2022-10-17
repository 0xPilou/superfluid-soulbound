/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC721ABErrors,
  ERC721ABErrorsInterface,
} from "../ERC721ABErrors";

const _abi = [
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
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea26469706673582212207fdaa1ba4e7bb11297319588b30a5daa60ac50a5acc379ecff49cab8ca8d998264736f6c63430008100033";

type ERC721ABErrorsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721ABErrorsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721ABErrors__factory extends ContractFactory {
  constructor(...args: ERC721ABErrorsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC721ABErrors";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721ABErrors> {
    return super.deploy(overrides || {}) as Promise<ERC721ABErrors>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC721ABErrors {
    return super.attach(address) as ERC721ABErrors;
  }
  connect(signer: Signer): ERC721ABErrors__factory {
    return super.connect(signer) as ERC721ABErrors__factory;
  }
  static readonly contractName: "ERC721ABErrors";
  public readonly contractName: "ERC721ABErrors";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721ABErrorsInterface {
    return new utils.Interface(_abi) as ERC721ABErrorsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721ABErrors {
    return new Contract(address, _abi, signerOrProvider) as ERC721ABErrors;
  }
}
