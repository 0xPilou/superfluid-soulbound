import keccak256 from 'keccak256';
import MerkleTree from 'merkletreejs';
import { getAddress } from 'ethers/lib/utils';
import { generateLeaf } from './merkle-util';

type WhitelistRecipient = {
  address: string;
};

export class Generator {
  recipients: WhitelistRecipient[] = [];
  collection: string;
  tree: MerkleTree;

  constructor(collection: string, holders: string[], production = true) {
    this.collection = collection;

    const validHolders = holders.filter((holder) => {
      try {
        getAddress(holder);
      } catch (e) {
        return false;
      }
      return true;
    });

    this.recipients = validHolders.map((address) => ({
      address: getAddress(address),
    }));
    this.tree = this.process(production);
  }

  process(production = true): MerkleTree {
    const merkleTree = new MerkleTree(
      this.recipients.map(({ address }) => generateLeaf(address)),
      keccak256,
      { sortPairs: true }
    );
    const merkleRoot: string = merkleTree.getHexRoot();

    return merkleTree;
  }
}

export default Generator;
