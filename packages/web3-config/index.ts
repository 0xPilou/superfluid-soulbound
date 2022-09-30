import MyNFTDeployment from "./deployments/goerli/MyNFT.json";
import ABRegistryDeployment from "./deployments/optimismGoerli/ABRegistry.json";
import ABRelayDeployment from "./deployments/optimismGoerli/ABRelay.json";
import ABStoreDeployment from "./deployments/optimismGoerli/ABStore.json";
import ABStreamDeployment from "./deployments/optimismGoerli/ABStream.json";
import ABTokenDeployment from "./deployments/optimismGoerli/ABToken.json";

export * from "./typechain";
import * as _typechain from "./typechain";
import { chain } from "wagmi";

import {
  MyNFT__factory,
  ABRegistry__factory,
  ABRelay__factory,
  ABStore__factory,
  ABStream__factory,
  ABToken__factory,
} from "./typechain";

export const typechain = _typechain;

export type AvailableContracts =
  | ABRegistry__factory["contractName"]
  | ABRelay__factory["contractName"]
  | ABStore__factory["contractName"]
  | ABStream__factory["contractName"]
  | ABToken__factory["contractName"]
  | MyNFT__factory["contractName"];

type AddressObj = Record<AvailableContracts, string>;

const _abRegistry = new ABRegistry__factory();
const _abRelay = new ABRelay__factory();
const _abStore = new ABStore__factory();
const _abStream = new ABStream__factory();
const _abToken = new ABToken__factory();
const _myNft = new MyNFT__factory();

export const Address: Record<number, Partial<AddressObj>> = {
  [chain.goerli.id]: {
    [_myNft.contractName]: MyNFTDeployment.address,
  },
  [chain.optimismGoerli.id]: {
    [_abRegistry.contractName]: ABRegistryDeployment.address,
    [_abRelay.contractName]: ABRelayDeployment.address,
    [_abStore.contractName]: ABStoreDeployment.address,
    [_abStream.contractName]: ABStreamDeployment.address,
    [_abToken.contractName]: ABTokenDeployment.address,
  },
};

export const Abi = {
  [chain.goerli.id]: {
    [_myNft.contractName]: MyNFTDeployment.abi,
  },
  [chain.optimismGoerli.id]: {
    [_abRegistry.contractName]: ABRegistryDeployment.abi,
    [_abRelay.contractName]: ABRelayDeployment.abi,
    [_abStore.contractName]: ABStoreDeployment.abi,
    [_abStream.contractName]: ABStreamDeployment.abi,
    [_abToken.contractName]: ABTokenDeployment.abi,
  },
};

export const getAddress = (
  chain: number,
  contract: AvailableContracts
): string => {
  return (Address as any)[chain][contract];
};

export const getAbi = (chain: number, contract: AvailableContracts) => {
  return (Abi as any)[chain][contract];
};
