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

export interface StoreInterface extends utils.Interface {
  contractName: "Store";
  functions: {
    "addItem(uint256,uint256,uint256)": FunctionFragment;
    "items(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "redeem(uint256,uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setToken(address)": FunctionFragment;
    "token()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addItem",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "items", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "setToken", values: [string]): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "addItem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "items", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "Redeemed(address,uint256,uint256)": EventFragment;
    "UpdatedInventory(uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Redeemed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdatedInventory"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type RedeemedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { buyer: string; itemId: BigNumber; quantity: BigNumber }
>;

export type RedeemedEventFilter = TypedEventFilter<RedeemedEvent>;

export type UpdatedInventoryEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  { itemId: BigNumber; quantity: BigNumber; price: BigNumber }
>;

export type UpdatedInventoryEventFilter =
  TypedEventFilter<UpdatedInventoryEvent>;

export interface Store extends BaseContract {
  contractName: "Store";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StoreInterface;

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
    addItem(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "addItem(uint256,uint256,uint256)"(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    items(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { quantity: BigNumber; price: BigNumber }
    >;

    "items(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { quantity: BigNumber; price: BigNumber }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    redeem(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "redeem(uint256,uint256)"(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setToken(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setToken(address)"(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    token(overrides?: CallOverrides): Promise<[string]>;

    "token()"(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addItem(
    _itemId: BigNumberish,
    _quantity: BigNumberish,
    _price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "addItem(uint256,uint256,uint256)"(
    _itemId: BigNumberish,
    _quantity: BigNumberish,
    _price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  items(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { quantity: BigNumber; price: BigNumber }
  >;

  "items(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { quantity: BigNumber; price: BigNumber }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  redeem(
    _itemId: BigNumberish,
    _quantity: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "redeem(uint256,uint256)"(
    _itemId: BigNumberish,
    _quantity: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "renounceOwnership()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setToken(
    _token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setToken(address)"(
    _token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  token(overrides?: CallOverrides): Promise<string>;

  "token()"(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addItem(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      _price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "addItem(uint256,uint256,uint256)"(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      _price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    items(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { quantity: BigNumber; price: BigNumber }
    >;

    "items(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { quantity: BigNumber; price: BigNumber }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    redeem(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "redeem(uint256,uint256)"(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    setToken(_token: string, overrides?: CallOverrides): Promise<void>;

    "setToken(address)"(
      _token: string,
      overrides?: CallOverrides
    ): Promise<void>;

    token(overrides?: CallOverrides): Promise<string>;

    "token()"(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
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

    "Redeemed(address,uint256,uint256)"(
      buyer?: null,
      itemId?: null,
      quantity?: null
    ): RedeemedEventFilter;
    Redeemed(buyer?: null, itemId?: null, quantity?: null): RedeemedEventFilter;

    "UpdatedInventory(uint256,uint256,uint256)"(
      itemId?: null,
      quantity?: null,
      price?: null
    ): UpdatedInventoryEventFilter;
    UpdatedInventory(
      itemId?: null,
      quantity?: null,
      price?: null
    ): UpdatedInventoryEventFilter;
  };

  estimateGas: {
    addItem(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "addItem(uint256,uint256,uint256)"(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    items(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    "items(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    redeem(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "redeem(uint256,uint256)"(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setToken(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setToken(address)"(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    "token()"(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addItem(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "addItem(uint256,uint256,uint256)"(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    items(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "items(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeem(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "redeem(uint256,uint256)"(
      _itemId: BigNumberish,
      _quantity: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setToken(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setToken(address)"(
      _token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "token()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}