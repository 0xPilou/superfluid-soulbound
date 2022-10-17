/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ABRelayInterface extends utils.Interface {
  contractName: "ABRelay";
  functions: {
    "createdDrop(int96,uint256,address)": FunctionFragment;
    "grantAllowance(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "revokeAllowance(address)": FunctionFragment;
    "setABRegistry(address)": FunctionFragment;
    "setABStream(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "transferredNFT(address,address,uint256)": FunctionFragment;
    "updatedDrop()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createdDrop",
    values: [BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "grantAllowance",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revokeAllowance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setABRegistry",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setABStream", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferredNFT",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updatedDrop",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "createdDrop",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "grantAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setABRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setABStream",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferredNFT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updatedDrop",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface ABRelay extends BaseContract {
  contractName: "ABRelay";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ABRelayInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createdDrop(
      _baseFlow: BigNumberish,
      _dropId: BigNumberish,
      _rightholder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "createdDrop(int96,uint256,address)"(
      _baseFlow: BigNumberish,
      _dropId: BigNumberish,
      _rightholder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    grantAllowance(
      _sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "grantAllowance(address)"(
      _sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeAllowance(
      _sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "revokeAllowance(address)"(
      _sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setABRegistry(
      _abRegistry: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setABRegistry(address)"(
      _abRegistry: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setABStream(
      _abStream: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setABStream(address)"(
      _abStream: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferredNFT(
      _from: string,
      _to: string,
      _dropId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "transferredNFT(address,address,uint256)"(
      _from: string,
      _to: string,
      _dropId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updatedDrop(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "updatedDrop()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  createdDrop(
    _baseFlow: BigNumberish,
    _dropId: BigNumberish,
    _rightholder: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "createdDrop(int96,uint256,address)"(
    _baseFlow: BigNumberish,
    _dropId: BigNumberish,
    _rightholder: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  grantAllowance(
    _sender: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "grantAllowance(address)"(
    _sender: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "renounceOwnership()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeAllowance(
    _sender: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "revokeAllowance(address)"(
    _sender: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setABRegistry(
    _abRegistry: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setABRegistry(address)"(
    _abRegistry: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setABStream(
    _abStream: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setABStream(address)"(
    _abStream: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferredNFT(
    _from: string,
    _to: string,
    _dropId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "transferredNFT(address,address,uint256)"(
    _from: string,
    _to: string,
    _dropId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updatedDrop(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "updatedDrop()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createdDrop(
      _baseFlow: BigNumberish,
      _dropId: BigNumberish,
      _rightholder: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "createdDrop(int96,uint256,address)"(
      _baseFlow: BigNumberish,
      _dropId: BigNumberish,
      _rightholder: string,
      overrides?: CallOverrides
    ): Promise<void>;

    grantAllowance(_sender: string, overrides?: CallOverrides): Promise<void>;

    "grantAllowance(address)"(
      _sender: string,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    revokeAllowance(_sender: string, overrides?: CallOverrides): Promise<void>;

    "revokeAllowance(address)"(
      _sender: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setABRegistry(
      _abRegistry: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setABRegistry(address)"(
      _abRegistry: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setABStream(_abStream: string, overrides?: CallOverrides): Promise<void>;

    "setABStream(address)"(
      _abStream: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferredNFT(
      _from: string,
      _to: string,
      _dropId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferredNFT(address,address,uint256)"(
      _from: string,
      _to: string,
      _dropId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updatedDrop(overrides?: CallOverrides): Promise<void>;

    "updatedDrop()"(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    createdDrop(
      _baseFlow: BigNumberish,
      _dropId: BigNumberish,
      _rightholder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "createdDrop(int96,uint256,address)"(
      _baseFlow: BigNumberish,
      _dropId: BigNumberish,
      _rightholder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    grantAllowance(
      _sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "grantAllowance(address)"(
      _sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeAllowance(
      _sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "revokeAllowance(address)"(
      _sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setABRegistry(
      _abRegistry: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setABRegistry(address)"(
      _abRegistry: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setABStream(
      _abStream: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setABStream(address)"(
      _abStream: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferredNFT(
      _from: string,
      _to: string,
      _dropId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "transferredNFT(address,address,uint256)"(
      _from: string,
      _to: string,
      _dropId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updatedDrop(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "updatedDrop()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createdDrop(
      _baseFlow: BigNumberish,
      _dropId: BigNumberish,
      _rightholder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "createdDrop(int96,uint256,address)"(
      _baseFlow: BigNumberish,
      _dropId: BigNumberish,
      _rightholder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    grantAllowance(
      _sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "grantAllowance(address)"(
      _sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeAllowance(
      _sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "revokeAllowance(address)"(
      _sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setABRegistry(
      _abRegistry: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setABRegistry(address)"(
      _abRegistry: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setABStream(
      _abStream: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setABStream(address)"(
      _abStream: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferredNFT(
      _from: string,
      _to: string,
      _dropId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "transferredNFT(address,address,uint256)"(
      _from: string,
      _to: string,
      _dropId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updatedDrop(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "updatedDrop()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
