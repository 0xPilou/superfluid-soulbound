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

export interface ABStreamInterface extends utils.Interface {
  contractName: "ABStream";
  functions: {
    "afterAgreementCreated(address,address,bytes32,bytes,bytes,bytes)": FunctionFragment;
    "afterAgreementTerminated(address,address,bytes32,bytes,bytes,bytes)": FunctionFragment;
    "afterAgreementUpdated(address,address,bytes32,bytes,bytes,bytes)": FunctionFragment;
    "beforeAgreementCreated(address,address,bytes32,bytes,bytes)": FunctionFragment;
    "beforeAgreementTerminated(address,address,bytes32,bytes,bytes)": FunctionFragment;
    "beforeAgreementUpdated(address,address,bytes32,bytes,bytes)": FunctionFragment;
    "cfaV1Lib()": FunctionFragment;
    "flowRates(uint256)": FunctionFragment;
    "getABRelay()": FunctionFragment;
    "getABToken()": FunctionFragment;
    "getFlow(address)": FunctionFragment;
    "initStream(int96,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setAB_TOKEN(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateStream(address,address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "afterAgreementCreated",
    values: [string, string, BytesLike, BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "afterAgreementTerminated",
    values: [string, string, BytesLike, BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "afterAgreementUpdated",
    values: [string, string, BytesLike, BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "beforeAgreementCreated",
    values: [string, string, BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "beforeAgreementTerminated",
    values: [string, string, BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "beforeAgreementUpdated",
    values: [string, string, BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "cfaV1Lib", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "flowRates",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getABRelay",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getABToken",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getFlow", values: [string]): string;
  encodeFunctionData(
    functionFragment: "initStream",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "setAB_TOKEN", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateStream",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "afterAgreementCreated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "afterAgreementTerminated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "afterAgreementUpdated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "beforeAgreementCreated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "beforeAgreementTerminated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "beforeAgreementUpdated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "cfaV1Lib", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "flowRates", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getABRelay", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getABToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getFlow", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initStream", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAB_TOKEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateStream",
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

export interface ABStream extends BaseContract {
  contractName: "ABStream";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ABStreamInterface;

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
    afterAgreementCreated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "afterAgreementCreated(address,address,bytes32,bytes,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    afterAgreementTerminated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "afterAgreementTerminated(address,address,bytes32,bytes,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    afterAgreementUpdated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "afterAgreementUpdated(address,address,bytes32,bytes,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    beforeAgreementCreated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "beforeAgreementCreated(address,address,bytes32,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    beforeAgreementTerminated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "beforeAgreementTerminated(address,address,bytes32,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    beforeAgreementUpdated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "beforeAgreementUpdated(address,address,bytes32,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    cfaV1Lib(
      overrides?: CallOverrides
    ): Promise<[string, string] & { host: string; cfa: string }>;

    "cfaV1Lib()"(
      overrides?: CallOverrides
    ): Promise<[string, string] & { host: string; cfa: string }>;

    flowRates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "flowRates(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getABRelay(overrides?: CallOverrides): Promise<[string]>;

    "getABRelay()"(overrides?: CallOverrides): Promise<[string]>;

    getABToken(overrides?: CallOverrides): Promise<[string]>;

    "getABToken()"(overrides?: CallOverrides): Promise<[string]>;

    getFlow(
      _receiver: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        timestamp: BigNumber;
        flowRate: BigNumber;
        deposit: BigNumber;
        owedDeposit: BigNumber;
      }
    >;

    "getFlow(address)"(
      _receiver: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        timestamp: BigNumber;
        flowRate: BigNumber;
        deposit: BigNumber;
        owedDeposit: BigNumber;
      }
    >;

    initStream(
      flowRate: BigNumberish,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "initStream(int96,uint256)"(
      flowRate: BigNumberish,
      tokenId: BigNumberish,
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

    setAB_TOKEN(
      _AB_TOKEN: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setAB_TOKEN(address)"(
      _AB_TOKEN: string,
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

    updateStream(
      previousReceiver: string,
      newReceiver: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "updateStream(address,address,uint256)"(
      previousReceiver: string,
      newReceiver: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  afterAgreementCreated(
    arg0: string,
    arg1: string,
    arg2: BytesLike,
    arg3: BytesLike,
    arg4: BytesLike,
    arg5: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "afterAgreementCreated(address,address,bytes32,bytes,bytes,bytes)"(
    arg0: string,
    arg1: string,
    arg2: BytesLike,
    arg3: BytesLike,
    arg4: BytesLike,
    arg5: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  afterAgreementTerminated(
    arg0: string,
    arg1: string,
    arg2: BytesLike,
    arg3: BytesLike,
    arg4: BytesLike,
    arg5: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "afterAgreementTerminated(address,address,bytes32,bytes,bytes,bytes)"(
    arg0: string,
    arg1: string,
    arg2: BytesLike,
    arg3: BytesLike,
    arg4: BytesLike,
    arg5: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  afterAgreementUpdated(
    arg0: string,
    arg1: string,
    arg2: BytesLike,
    arg3: BytesLike,
    arg4: BytesLike,
    arg5: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "afterAgreementUpdated(address,address,bytes32,bytes,bytes,bytes)"(
    arg0: string,
    arg1: string,
    arg2: BytesLike,
    arg3: BytesLike,
    arg4: BytesLike,
    arg5: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  beforeAgreementCreated(
    arg0: string,
    arg1: string,
    arg2: BytesLike,
    arg3: BytesLike,
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "beforeAgreementCreated(address,address,bytes32,bytes,bytes)"(
    arg0: string,
    arg1: string,
    arg2: BytesLike,
    arg3: BytesLike,
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  beforeAgreementTerminated(
    arg0: string,
    arg1: string,
    arg2: BytesLike,
    arg3: BytesLike,
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "beforeAgreementTerminated(address,address,bytes32,bytes,bytes)"(
    arg0: string,
    arg1: string,
    arg2: BytesLike,
    arg3: BytesLike,
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  beforeAgreementUpdated(
    arg0: string,
    arg1: string,
    arg2: BytesLike,
    arg3: BytesLike,
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "beforeAgreementUpdated(address,address,bytes32,bytes,bytes)"(
    arg0: string,
    arg1: string,
    arg2: BytesLike,
    arg3: BytesLike,
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  cfaV1Lib(
    overrides?: CallOverrides
  ): Promise<[string, string] & { host: string; cfa: string }>;

  "cfaV1Lib()"(
    overrides?: CallOverrides
  ): Promise<[string, string] & { host: string; cfa: string }>;

  flowRates(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  "flowRates(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getABRelay(overrides?: CallOverrides): Promise<string>;

  "getABRelay()"(overrides?: CallOverrides): Promise<string>;

  getABToken(overrides?: CallOverrides): Promise<string>;

  "getABToken()"(overrides?: CallOverrides): Promise<string>;

  getFlow(
    _receiver: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      timestamp: BigNumber;
      flowRate: BigNumber;
      deposit: BigNumber;
      owedDeposit: BigNumber;
    }
  >;

  "getFlow(address)"(
    _receiver: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      timestamp: BigNumber;
      flowRate: BigNumber;
      deposit: BigNumber;
      owedDeposit: BigNumber;
    }
  >;

  initStream(
    flowRate: BigNumberish,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "initStream(int96,uint256)"(
    flowRate: BigNumberish,
    tokenId: BigNumberish,
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

  setAB_TOKEN(
    _AB_TOKEN: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setAB_TOKEN(address)"(
    _AB_TOKEN: string,
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

  updateStream(
    previousReceiver: string,
    newReceiver: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "updateStream(address,address,uint256)"(
    previousReceiver: string,
    newReceiver: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    afterAgreementCreated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "afterAgreementCreated(address,address,bytes32,bytes,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    afterAgreementTerminated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "afterAgreementTerminated(address,address,bytes32,bytes,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    afterAgreementUpdated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "afterAgreementUpdated(address,address,bytes32,bytes,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    beforeAgreementCreated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "beforeAgreementCreated(address,address,bytes32,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    beforeAgreementTerminated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "beforeAgreementTerminated(address,address,bytes32,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    beforeAgreementUpdated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "beforeAgreementUpdated(address,address,bytes32,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    cfaV1Lib(
      overrides?: CallOverrides
    ): Promise<[string, string] & { host: string; cfa: string }>;

    "cfaV1Lib()"(
      overrides?: CallOverrides
    ): Promise<[string, string] & { host: string; cfa: string }>;

    flowRates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "flowRates(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getABRelay(overrides?: CallOverrides): Promise<string>;

    "getABRelay()"(overrides?: CallOverrides): Promise<string>;

    getABToken(overrides?: CallOverrides): Promise<string>;

    "getABToken()"(overrides?: CallOverrides): Promise<string>;

    getFlow(
      _receiver: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        timestamp: BigNumber;
        flowRate: BigNumber;
        deposit: BigNumber;
        owedDeposit: BigNumber;
      }
    >;

    "getFlow(address)"(
      _receiver: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        timestamp: BigNumber;
        flowRate: BigNumber;
        deposit: BigNumber;
        owedDeposit: BigNumber;
      }
    >;

    initStream(
      flowRate: BigNumberish,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "initStream(int96,uint256)"(
      flowRate: BigNumberish,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    setAB_TOKEN(_AB_TOKEN: string, overrides?: CallOverrides): Promise<void>;

    "setAB_TOKEN(address)"(
      _AB_TOKEN: string,
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

    updateStream(
      previousReceiver: string,
      newReceiver: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "updateStream(address,address,uint256)"(
      previousReceiver: string,
      newReceiver: string,
      tokenId: BigNumberish,
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
  };

  estimateGas: {
    afterAgreementCreated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "afterAgreementCreated(address,address,bytes32,bytes,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    afterAgreementTerminated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "afterAgreementTerminated(address,address,bytes32,bytes,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    afterAgreementUpdated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "afterAgreementUpdated(address,address,bytes32,bytes,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    beforeAgreementCreated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "beforeAgreementCreated(address,address,bytes32,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    beforeAgreementTerminated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "beforeAgreementTerminated(address,address,bytes32,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    beforeAgreementUpdated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "beforeAgreementUpdated(address,address,bytes32,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cfaV1Lib(overrides?: CallOverrides): Promise<BigNumber>;

    "cfaV1Lib()"(overrides?: CallOverrides): Promise<BigNumber>;

    flowRates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "flowRates(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getABRelay(overrides?: CallOverrides): Promise<BigNumber>;

    "getABRelay()"(overrides?: CallOverrides): Promise<BigNumber>;

    getABToken(overrides?: CallOverrides): Promise<BigNumber>;

    "getABToken()"(overrides?: CallOverrides): Promise<BigNumber>;

    getFlow(_receiver: string, overrides?: CallOverrides): Promise<BigNumber>;

    "getFlow(address)"(
      _receiver: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initStream(
      flowRate: BigNumberish,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "initStream(int96,uint256)"(
      flowRate: BigNumberish,
      tokenId: BigNumberish,
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

    setAB_TOKEN(
      _AB_TOKEN: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setAB_TOKEN(address)"(
      _AB_TOKEN: string,
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

    updateStream(
      previousReceiver: string,
      newReceiver: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "updateStream(address,address,uint256)"(
      previousReceiver: string,
      newReceiver: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    afterAgreementCreated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "afterAgreementCreated(address,address,bytes32,bytes,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    afterAgreementTerminated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "afterAgreementTerminated(address,address,bytes32,bytes,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    afterAgreementUpdated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "afterAgreementUpdated(address,address,bytes32,bytes,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      arg5: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    beforeAgreementCreated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "beforeAgreementCreated(address,address,bytes32,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    beforeAgreementTerminated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "beforeAgreementTerminated(address,address,bytes32,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    beforeAgreementUpdated(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "beforeAgreementUpdated(address,address,bytes32,bytes,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BytesLike,
      arg3: BytesLike,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cfaV1Lib(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "cfaV1Lib()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    flowRates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "flowRates(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getABRelay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getABRelay()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getABToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getABToken()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFlow(
      _receiver: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getFlow(address)"(
      _receiver: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initStream(
      flowRate: BigNumberish,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "initStream(int96,uint256)"(
      flowRate: BigNumberish,
      tokenId: BigNumberish,
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

    setAB_TOKEN(
      _AB_TOKEN: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setAB_TOKEN(address)"(
      _AB_TOKEN: string,
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

    updateStream(
      previousReceiver: string,
      newReceiver: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "updateStream(address,address,uint256)"(
      previousReceiver: string,
      newReceiver: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
