import MyNFTDeployment from "./deployments/goerli/MyNFT.json";
import CashflowDeployment from "./deployments/optimismGoerli/Cashflow.json";

export * from "./typechain";
import * as _typechain from "./typechain";
import { chain } from "wagmi";

import { MyNFT__factory, Cashflow__factory } from "./typechain";

export const typechain = _typechain;

export type AvailableContracts =
  | MyNFT__factory["contractName"]
  | Cashflow__factory["contractName"];

type AddressObj = Record<AvailableContracts, string>;

const _myNft = new MyNFT__factory();
const _cashflow = new Cashflow__factory();

export const Address: Record<number, Partial<AddressObj>> = {
  [chain.goerli.id]: {
    [_myNft.contractName]: MyNFTDeployment.address,
  },
  [chain.optimismGoerli.id]: {
    [_cashflow.contractName]: CashflowDeployment.address,
  },
};

export const getAddress = (
  chain: number,
  contract: AvailableContracts
): string => {
  return (Address as any)[chain][contract];
};
