import MyNFTDeployment from "./deployments/goerli/MyNFT.json";
import CashflowDeployment from "./deployments/optimismGoerli/Cashflow.json";
import StoreDeployment from "./deployments/optimismGoerli/Store.json";
import SuperSoulboundDeployment from "./deployments/optimismGoerli/SuperSoulbound.json";

export * from "./typechain";
import * as _typechain from "./typechain";
import { chain } from "wagmi";

import {
  MyNFT__factory,
  Cashflow__factory,
  Store__factory,
  SuperSoulbound__factory,
} from "./typechain";

export const typechain = _typechain;

export type AvailableContracts =
  | SuperSoulbound__factory["contractName"]
  | Store__factory["contractName"]
  | MyNFT__factory["contractName"]
  | Cashflow__factory["contractName"];

type AddressObj = Record<AvailableContracts, string>;

const _myNft = new MyNFT__factory();
const _cashflow = new Cashflow__factory();
const _superSoulbound = new SuperSoulbound__factory();
const _store = new Store__factory();

export const Address: Record<number, Partial<AddressObj>> = {
  [chain.goerli.id]: {
    [_myNft.contractName]: MyNFTDeployment.address,
  },
  [chain.optimismGoerli.id]: {
    [_cashflow.contractName]: CashflowDeployment.address,
    [_superSoulbound.contractName]: SuperSoulboundDeployment.address,
    [_store.contractName]: StoreDeployment.address,
  },
};

export const getAddress = (
  chain: number,
  contract: AvailableContracts
): string => {
  return (Address as any)[chain][contract];
};
