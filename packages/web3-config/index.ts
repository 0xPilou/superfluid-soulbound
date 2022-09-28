import MyNFTDeployment from "./deployments/goerli/MyNFT.json";
import ABStreamDeployment from "./deployments/optimismGoerli/ABStream.json";
import ABTokenDeployment from "./deployments/optimismGoerli/ABToken.json";
import ABRelayDeployment from "./deployments/optimismGoerli/ABRelay.json";
import StoreDeployment from "./deployments/optimismGoerli/Store.json";

export * from "./typechain";
import * as _typechain from "./typechain";
import { chain } from "wagmi";

import {
  MyNFT__factory,
  ABStream__factory,
  ABRelay__factory,
  ABToken__factory,
  Store__factory,
} from "./typechain";

export const typechain = _typechain;

export type AvailableContracts =
  | ABToken__factory["contractName"]
  | ABRelay__factory["contractName"]
  | ABStream__factory["contractName"]
  | Store__factory["contractName"]
  | MyNFT__factory["contractName"];

type AddressObj = Record<AvailableContracts, string>;

const _myNft = new MyNFT__factory();
const _abRelay = new ABRelay__factory();
const _abStream = new ABStream__factory();
const _abToken = new ABToken__factory();
const _store = new Store__factory();

export const Address: Record<number, Partial<AddressObj>> = {
  [chain.goerli.id]: {
    [_myNft.contractName]: MyNFTDeployment.address,
  },
  [chain.optimismGoerli.id]: {
    [_abRelay.contractName]: ABRelayDeployment.address,
    [_abStream.contractName]: ABStreamDeployment.address,
    [_abToken.contractName]: ABTokenDeployment.address,
    [_store.contractName]: StoreDeployment.address,
  },
};

export const getAddress = (
  chain: number,
  contract: AvailableContracts
): string => {
  return (Address as any)[chain][contract];
};

export const Abi = {
  [chain.goerli.id]: {
    [_myNft.contractName]: MyNFTDeployment.abi,
  },
  [chain.optimismGoerli.id]: {
    [_abRelay.contractName]: ABRelayDeployment.abi,
    [_abStream.contractName]: ABStreamDeployment.abi,
    [_abToken.contractName]: ABTokenDeployment.abi,
    [_store.contractName]: StoreDeployment.abi,
  },
};

export const getAbi = (chain: number, contract: AvailableContracts) => {
  return (Abi as any)[chain][contract];
};
