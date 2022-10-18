import { solidityKeccak256 } from 'ethers/lib/utils';

export const generateLeaf = (address: string): Buffer => {
  return Buffer.from(solidityKeccak256(['address'], [address]).slice(2), 'hex');
};
