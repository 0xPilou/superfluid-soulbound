import MerkleTree from 'merkletreejs';
import { collections } from 'web3-config';
import WOAT from './tree/0-addresses.json';
import keccak256 from 'keccak256';
import { generateLeaf } from './merkle-util';
import { ethers } from 'ethers';

const map: Record<string, string[]> = {
  // [collections.weekendOnATuesday]: WOAT,
};

export const getMerkleTree = (dropId: string) => {
  const selected = map[dropId];

  if (selected) {
    return new MerkleTree(
      selected.map((address: string) => generateLeaf(address)),
      keccak256,
      { sortPairs: true }
    );
  }
};

export const getProof = (
  address: string,
  whitelisted: string[]
): {
  proof: string[];
  isProofCorrect: boolean;
} => {
  const tree = new MerkleTree(
    whitelisted.map((address: string) => generateLeaf(address)),
    keccak256,
    { sortPairs: true }
  );

  const leaf = generateLeaf(ethers.utils.getAddress(address));
  const proof = tree.getHexProof(leaf);
  const root = tree.getRoot().toString('hex');

  return {
    proof,
    isProofCorrect: tree.verify(proof, leaf, root),
  };
};
