import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { MyNFT } from 'web3-config';

describe('NFT', function () {
  let myNft: MyNFT;

  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];

  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const MyNFTContract = await ethers.getContractFactory('MyNFT');

    myNft = (await MyNFTContract.deploy('test', 'test', 100000000)) as MyNFT;
    await myNft.deployed();
  });

  describe('deployment', async () => {
    it('should deploy', async () => {
      await myNft.mintNft(addr1.address, 2);
    });
  });
});
