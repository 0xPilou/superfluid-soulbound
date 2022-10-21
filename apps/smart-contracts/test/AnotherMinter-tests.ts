import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { Decimal } from "decimal.js";
import { ethers, upgrades } from "hardhat";
import { Generator } from "merkle";
import { generateLeaf } from "merkle";
import {
  ABDropManager,
  ABDropManagerV1,
  AnotherMinter,
  MockMessenger,
} from "web3-config";

import * as TEST_DATA from "./testdata/AnotherMinter-test-data";

use(chaiAsPromised);

describe("Drop V1 Unit Tests", function () {
  let dropV2: AnotherMinter;
  let anotherblockV1: ABDropManagerV1;
  let anotherblockV2: ABDropManager;
  let anotherblockV1_2: ABDropManagerV1;
  let anotherblockV2_2: ABDropManager;
  let mockMessenger: MockMessenger;

  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  let user4: SignerWithAddress;
  let mockRelayAddr: SignerWithAddress;
  let rightHolder: SignerWithAddress;
  let treasury: SignerWithAddress;
  let addrs: SignerWithAddress[];
  let merkle0: Generator;
  let merkle1: Generator;
  let merkle2: Generator;

  before(async () => {
    // Get the signers required for the tests
    [
      owner,
      user1,
      user2,
      user3,
      user4,
      mockRelayAddr,
      rightHolder,
      treasury,
      ...addrs
    ] = await ethers.getSigners();

    // Generate a Merkle trees
    merkle0 = new Generator("DROP#1-PHASE#0", [user1.address, user2.address]);
    merkle1 = new Generator("DROP#1-PHASE#1", [user1.address, user3.address]);
    merkle2 = new Generator("DROP#1-PHASE#2", [
      user1.address,
      user2.address,
      user3.address,
    ]);
    merkle0.process(false);
    merkle1.process(false);
    merkle2.process(false);
  });

  beforeEach(async () => {
    // Create a mock Messenger contract
    const MockMessengerContract = await ethers.getContractFactory(
      "MockMessenger"
    );
    mockMessenger = (await MockMessengerContract.deploy()) as MockMessenger;

    // Deploy ABDropManager contract
    const AnotherblockV1 = await ethers.getContractFactory("ABDropManagerV1");
    anotherblockV1 = (await upgrades.deployProxy(
      AnotherblockV1,
      [treasury.address],
      { initializer: "initialize" }
    )) as ABDropManagerV1;
    await anotherblockV1.deployed();

    const AnotherblockV2 = await ethers.getContractFactory("ABDropManager");
    anotherblockV2 = (await upgrades.upgradeProxy(
      anotherblockV1.address,
      AnotherblockV2,
      {
        call: {
          fn: "initializeV2",
          args: [mockMessenger.address, mockRelayAddr.address],
        },
      }
    )) as ABDropManager;
    await anotherblockV2.deployed();

    // Deploy AnotherMinter contract
    const NFTContract = await ethers.getContractFactory("AnotherMinter");
    dropV2 = (await NFTContract.deploy(
      anotherblockV2.address,
      mockMessenger.address,
      mockRelayAddr.address,
      TEST_DATA.URI,
      "anotherblock",
      "ABNFT"
    )) as AnotherMinter;
    await dropV2.deployed();
  });

  describe("METHOD : mint", async () => {
    it("should be able to mint an NFT", async () => {
      const currentTs = await time.latest();
      const PHASES = generatePhase(currentTs);

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        TEST_DATA.PRICE,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        PHASES
      );

      const proof = merkle1.tree.getHexProof(generateLeaf(user1.address));

      const rightHolderFeePercent = new Decimal(TEST_DATA.RIGHTHOLDER_FEE).div(
        1000000
      );

      const rightHolderEthBalBefore = await ethers.provider.getBalance(
        rightHolder.address
      );
      const anotherblockEthBalBefore = await ethers.provider.getBalance(
        dropV2.address
      );

      expect(+(await dropV2.balanceOf(user1.address))).to.eq(0);

      await dropV2
        .connect(user1)
        .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
          value: TEST_DATA.PRICE,
        });

      const rightHolderEthBalAfter = await ethers.provider.getBalance(
        rightHolder.address
      );
      const anotherblockEthBalAfter = await ethers.provider.getBalance(
        dropV2.address
      );

      expect(+(await dropV2.balanceOf(user1.address))).to.eq(1);

      const expectedRightHolderBalance = new Decimal(
        ethers.utils.formatEther(rightHolderEthBalBefore)
      )
        .add(rightHolderFeePercent.mul(TEST_DATA.MINT_PRICE))
        .toString();

      expect(ethers.utils.formatEther(rightHolderEthBalAfter).toString()).to.eq(
        expectedRightHolderBalance,
        "Fees not sent to Right Holder"
      );

      const expectedAnotherblockBalance = new Decimal(
        ethers.utils.formatEther(anotherblockEthBalBefore)
      )
        .add(
          new Decimal(1).sub(rightHolderFeePercent).mul(TEST_DATA.MINT_PRICE)
        )
        .toString();

      expect(
        ethers.utils.formatEther(anotherblockEthBalAfter).toString()
      ).to.eq(expectedAnotherblockBalance, "Fees not kept to AB Treasury");
    });

    it("should be able to mint an NFT (100% of the Fees goes to the rightHolder)", async () => {
      const currentTs = await time.latest();
      const PHASES = generatePhase(currentTs);

      const rightHolderFee = 1000000;

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        TEST_DATA.PRICE,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        rightHolderFee,
        PHASES
      );

      expect(+(await dropV2.balanceOf(user1.address))).to.eq(0);
      const rightHolderEthBalBefore = await ethers.provider.getBalance(
        rightHolder.address
      );
      const anotherblockEthBalBefore = await ethers.provider.getBalance(
        dropV2.address
      );

      const proof = merkle1.tree.getHexProof(generateLeaf(user1.address));

      await dropV2
        .connect(user1)
        .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
          value: TEST_DATA.PRICE,
        });

      expect(+(await dropV2.balanceOf(user1.address))).to.eq(1);
      const rightHolderEthBalAfter = await ethers.provider.getBalance(
        rightHolder.address
      );
      const anotherblockEthBalAfter = await ethers.provider.getBalance(
        dropV2.address
      );

      expect(+ethers.utils.formatEther(rightHolderEthBalAfter)).to.eq(
        +ethers.utils.formatEther(rightHolderEthBalBefore) +
          TEST_DATA.MINT_PRICE,
        "Fees not sent to Right Holder"
      );

      expect(+ethers.utils.formatEther(anotherblockEthBalAfter)).to.eq(
        +ethers.utils.formatEther(anotherblockEthBalBefore),
        "Fees kept to AB Treasury"
      );
    });

    it("should be able to mint a free mint NFT", async () => {
      const currentTs = await time.latest();
      const PHASES = generatePhase(currentTs);

      const mintPrice = 0;
      const price = ethers.utils.parseEther(mintPrice.toString());

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        price,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        PHASES
      );

      expect(+(await dropV2.balanceOf(user1.address))).to.eq(0);
      const rightHolderEthBalBefore = await ethers.provider.getBalance(
        rightHolder.address
      );
      const anotherblockEthBalBefore = await ethers.provider.getBalance(
        dropV2.address
      );

      const proof = merkle1.tree.getHexProof(generateLeaf(user1.address));

      await dropV2
        .connect(user1)
        .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
          value: price,
        });

      expect(+(await dropV2.balanceOf(user1.address))).to.eq(1);
      const rightHolderEthBalAfter = await ethers.provider.getBalance(
        rightHolder.address
      );
      const anotherblockEthBalAfter = await ethers.provider.getBalance(
        dropV2.address
      );

      expect(+ethers.utils.formatEther(rightHolderEthBalAfter)).to.eq(
        +ethers.utils.formatEther(rightHolderEthBalBefore),
        "Fees to Right Holder"
      );

      expect(+ethers.utils.formatEther(anotherblockEthBalAfter)).to.eq(
        +ethers.utils.formatEther(anotherblockEthBalBefore),
        "Fees to AB Treasury"
      );
    });

    it("should be able to mint an NFT (0% fees to rightholder)", async () => {
      const currentTs = await time.latest();
      const PHASES = generatePhase(currentTs);

      const proof = merkle1.tree.getHexProof(generateLeaf(user1.address));

      const rightholderFee = 0;

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        TEST_DATA.PRICE,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        rightholderFee,
        PHASES
      );

      expect(+(await dropV2.balanceOf(user1.address))).to.eq(0);
      const rightHolderEthBalBefore = await ethers.provider.getBalance(
        rightHolder.address
      );
      const anotherblockEthBalBefore = await ethers.provider.getBalance(
        dropV2.address
      );

      await dropV2
        .connect(user1)
        .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
          value: TEST_DATA.PRICE,
        });

      expect(+(await dropV2.balanceOf(user1.address))).to.eq(1);
      const rightHolderEthBalAfter = await ethers.provider.getBalance(
        rightHolder.address
      );
      const anotherblockEthBalAfter = await ethers.provider.getBalance(
        dropV2.address
      );

      expect(+ethers.utils.formatEther(rightHolderEthBalAfter)).to.eq(
        +ethers.utils.formatEther(rightHolderEthBalBefore),
        "Fees to Right Holder"
      );

      expect(+ethers.utils.formatEther(anotherblockEthBalAfter)).to.eq(
        +ethers.utils.formatEther(anotherblockEthBalBefore) + 0.5,
        "Fees to AB Treasury"
      );
    });

    it("should not be able to mint an NFT (not whitelisted)", async () => {
      const currentTs = await time.latest();
      const PHASES = generatePhase(currentTs);

      const proof = merkle1.tree.getHexProof(generateLeaf(user2.address));

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        TEST_DATA.PRICE,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        PHASES
      );

      await expect(
        dropV2
          .connect(user3)
          .mint(user3.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
            value: TEST_DATA.PRICE,
          })
      ).to.eventually.be.rejectedWith("NotInMerkle");
    });

    it("should not be able to mint an NFT (drop does not exists)", async () => {
      const currentTs = await time.latest();
      const PHASES = generatePhase(currentTs);

      const proof = merkle1.tree.getHexProof(generateLeaf(user1.address));

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        TEST_DATA.PRICE,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        PHASES
      );

      await expect(
        dropV2
          .connect(user1)
          .mint(user1.address, 1, TEST_DATA.MINT_QUANTITY, proof, {
            value: TEST_DATA.PRICE,
          })
      ).to.be.reverted;
    });

    it("should not be able to mint an NFT (drop sold out)", async () => {
      const currentTs = await time.latest();
      const PHASES = generatePhase(currentTs);

      const proofAddr1 = merkle1.tree.getHexProof(generateLeaf(user1.address));
      const proofAddr2 = merkle1.tree.getHexProof(generateLeaf(user3.address));

      const supply = 1;

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        TEST_DATA.PRICE,
        supply,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        PHASES
      );

      await dropV2
        .connect(user1)
        .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proofAddr1, {
          value: TEST_DATA.PRICE,
        });

      await expect(
        dropV2
          .connect(user2)
          .mint(user2.address, 0, TEST_DATA.MINT_QUANTITY, proofAddr2, {
            value: TEST_DATA.PRICE,
          })
      ).to.be.revertedWith("DropSoldOut");
    });

    it("should not be able to mint an NFT (already minted maximum amount in private sale)", async () => {
      const currentTs = await time.latest();
      const PHASES = generatePhase(currentTs);

      const proofAddr1 = merkle1.tree.getHexProof(generateLeaf(user1.address));

      const supply = 3;

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        TEST_DATA.PRICE,
        supply,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        PHASES
      );

      await dropV2
        .connect(user1)
        .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY * 2, proofAddr1, {
          value: TEST_DATA.PRICE.mul(2),
        });

      await expect(
        dropV2
          .connect(user1)
          .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proofAddr1, {
            value: TEST_DATA.PRICE,
          })
      ).to.be.revertedWith("MaxMintPerAddress");
    });

    // it("should not be able to mint an NFT (already minted maximum amount in public sale)", async () => {
    //   const currentTs = await time.latest();
    //   const PHASES = generatePhase(currentTs);

    //   const proofAddr1 = merkle1.tree.getHexProof(generateLeaf(user1.address));

    //   const supply = 3;

    //   const publicSale = 1600000000;

    //   await anotherblockV2.create(
    //     TEST_DATA.ZERO_ADDRESS,
    //     rightHolder.address,
    //     dropV2.address,
    //     TEST_DATA.PRICE,
    //     supply,
    //     TEST_DATA.ROYALTY_SHARE,
    //     TEST_DATA.RIGHTHOLDER_FEE,
    //     PHASES
    //   );

    //   await dropV2
    //     .connect(user1)
    //     .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proofAddr1, {
    //       value: TEST_DATA.PRICE,
    //     });

    //   await expect(
    //     dropV2
    //       .connect(user1)
    //       .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proofAddr1, {
    //         value: TEST_DATA.PRICE,
    //       })
    //   ).to.be.revertedWith("MaxMintPerAddress");

    // });

    it("should not be able to mint an NFT (not enough token available)", async () => {
      const currentTs = await time.latest();
      const PHASES = generatePhase(currentTs);

      const proofAddr1 = merkle1.tree.getHexProof(generateLeaf(user1.address));
      const proofAddr2 = merkle1.tree.getHexProof(generateLeaf(user3.address));

      const supply = 3;

      const mintQuantity = 2;

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        TEST_DATA.PRICE,
        supply,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        PHASES
      );

      await dropV2
        .connect(user1)
        .mint(user1.address, 0, mintQuantity, proofAddr1, {
          value: TEST_DATA.PRICE.mul(mintQuantity),
        });

      await expect(
        dropV2.connect(user2).mint(user2.address, 0, mintQuantity, proofAddr2, {
          value: TEST_DATA.PRICE.mul(mintQuantity),
        })
      ).to.be.revertedWith("NotEnoughTokensAvailable");
    });

    it("should not be able to mint an NFT (did not send enough ETH)", async () => {
      const currentTs = await time.latest();
      const PHASES = generatePhase(currentTs);

      const proof = merkle1.tree.getHexProof(generateLeaf(user1.address));

      const options = { value: ethers.utils.parseEther("0.4") };

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        TEST_DATA.PRICE,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        PHASES
      );

      await expect(
        dropV2
          .connect(user1)
          .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, options)
      ).to.be.revertedWith("IncorrectETHSent");
    });

    it("should not be able to mint an NFT (sent too much ETH)", async () => {
      const currentTs = await time.latest();
      const PHASES = generatePhase(currentTs);
      const options = { value: ethers.utils.parseEther("0.6") };

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        TEST_DATA.PRICE,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        PHASES
      );

      const proof = merkle1.tree.getHexProof(generateLeaf(user1.address));

      await expect(
        dropV2
          .connect(user1)
          .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, options)
      ).to.be.revertedWith("IncorrectETHSent");
    });

    // it("should be able to mint an NFT before private sale starts (private sale timestamp : 1/1/2050)", async () => {
    //   const privateSale = 2524676922;
    //   const publicSale = 2624676922;

    //   await anotherblockV2.create(
    //     TEST_DATA.ZERO_ADDRESS,
    //     rightHolder.address,
    //     dropV2.address,
    //     TEST_DATA.PRICE,
    //     TEST_DATA.SUPPLY,
    //     TEST_DATA.ROYALTY_SHARE,
    //     TEST_DATA.RIGHTHOLDER_FEE,
    //     PHASES
    //   );

    //   const proof = merkle.tree.getHexProof(generateLeaf(user2.address));

    //   await expect(
    //     dropV2
    //       .connect(user2)
    //       .mint(user2.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
    //         value: TEST_DATA.PRICE,
    //       })
    //   ).to.be.revertedWith("SaleNotStarted");
    // });

    // it("should be able to mint an NFT during public sale (empty Merkle Root)", async () => {
    //   const proof = merkle.tree.getHexProof(generateLeaf(user3.address));
    //   const emptyMerkleRoot =
    //     "0x0000000000000000000000000000000000000000000000000000000000000000";

    //   const privateSale = 1560000000;
    //   const publicSale = 1577879999;

    //   await anotherblockV2.create(
    //     TEST_DATA.ZERO_ADDRESS,
    //     rightHolder.address,
    //     dropV2.address,
    //     TEST_DATA.PRICE,
    //     TEST_DATA.SUPPLY,
    //     TEST_DATA.ROYALTY_SHARE,
    //     TEST_DATA.RIGHTHOLDER_FEE,
    //     [
    //       TEST_DATA.MAX_PRIVATE_SALE,
    //       privateSale,
    //       TEST_DATA.MAX_PUBLIC_SALE,
    //       publicSale,
    //     ],
    //     emptyMerkleRoot
    //   );

    //   expect(+(await dropV2.balanceOf(user3.address))).to.eq(0);

    //   await dropV2
    //     .connect(user3)
    //     .mint(user3.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
    //       value: TEST_DATA.PRICE,
    //     });

    //   expect(+(await dropV2.balanceOf(user3.address))).to.eq(1);
    // });

    // it("should be able to mint an NFT during public sale (using claimTo method)", async () => {
    //   const emptyMerkleRoot =
    //     "0x0000000000000000000000000000000000000000000000000000000000000000";

    //   const privateSale = 1560000000;
    //   const publicSale = 1577879999;

    //   await anotherblockV2.create(
    //     TEST_DATA.ZERO_ADDRESS,
    //     rightHolder.address,
    //     dropV2.address,
    //     TEST_DATA.PRICE,
    //     TEST_DATA.SUPPLY,
    //     TEST_DATA.ROYALTY_SHARE,
    //     TEST_DATA.RIGHTHOLDER_FEE,
    //     [
    //       TEST_DATA.MAX_PRIVATE_SALE,
    //       privateSale,
    //       TEST_DATA.MAX_PUBLIC_SALE,
    //       publicSale,
    //     ],
    //     emptyMerkleRoot
    //   );

    //   expect(+(await dropV2.balanceOf(user3.address))).to.eq(0);

    //   await dropV2
    //     .connect(user3)
    //     .claimTo(user3.address, TEST_DATA.MINT_QUANTITY, 0, {
    //       value: TEST_DATA.PRICE,
    //     });

    //   expect(+(await dropV2.balanceOf(user3.address))).to.eq(1);
    // });

    // it("should be able to mint an NFT during public sale (public sale timestamp : 1/1/2020)", async () => {
    //   const privateSale = 1560000000;
    //   const publicSale = 1577879999;

    //   await anotherblockV2.create(
    //     TEST_DATA.ZERO_ADDRESS,
    //     rightHolder.address,
    //     dropV2.address,
    //     TEST_DATA.PRICE,
    //     TEST_DATA.SUPPLY,
    //     TEST_DATA.ROYALTY_SHARE,
    //     TEST_DATA.RIGHTHOLDER_FEE,
    //     [
    //       TEST_DATA.MAX_PRIVATE_SALE,
    //       privateSale,
    //       TEST_DATA.MAX_PUBLIC_SALE,
    //       publicSale,
    //     ],
    //     merkle.tree.getRoot()
    //   );

    //   const proof = merkle.tree.getHexProof(generateLeaf(user3.address));
    //   const userNftBalBefore = await dropV2.balanceOf(user3.address);

    //   expect(
    //     await dropV2
    //       .connect(user3)
    //       .getClaimIneligibilityReason(
    //         user3.address,
    //         TEST_DATA.MINT_QUANTITY,
    //         0
    //       )
    //   ).to.eq("");

    //   await dropV2
    //     .connect(user3)
    //     .mint(user3.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
    //       value: TEST_DATA.PRICE,
    //     });

    //   const userNftBalAfter = await dropV2.balanceOf(user3.address);

    //   expect(+userNftBalBefore).to.eq(0);
    //   expect(+userNftBalAfter).to.eq(1);
    // });
  });

  describe("METHOD : setURI", async () => {
    beforeEach(async () => {
      const currentTs = await time.latest();
      const PHASES = generatePhase(currentTs);

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        TEST_DATA.PRICE,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        PHASES
      );
      const proof1 = merkle1.tree.getHexProof(generateLeaf(user1.address));
      await dropV2
        .connect(user1)
        .mint(user1.address, 0, 1, proof1, { value: TEST_DATA.PRICE });
    });

    it("should set a new URI", async () => {
      const newBaseURI = "this is the new base URI/";

      await dropV2.setBaseURI(newBaseURI);

      // Check that the URI is updated
      expect(await dropV2.tokenURI(0)).to.eq(newBaseURI + "0");
    });

    it("should not be able to set a new URI (not ADMIN_ROLE)", async () => {
      const newBaseURI = "this is the new base URI/";

      // Check that the transaction revert as the user is not granted with ADMIN_ROLE
      await expect(
        dropV2.connect(user2).setBaseURI(newBaseURI)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("METHOD : WithdrawAll", async () => {
    it("should withdraw the funds", async () => {
      const currentTs = await time.latest();
      const PHASES = generatePhase(currentTs);

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        TEST_DATA.PRICE,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        PHASES
      );

      const proof = merkle1.tree.getHexProof(generateLeaf(user1.address));
      await dropV2
        .connect(user1)
        .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
          value: TEST_DATA.PRICE,
        });

      const anotherblockTreasury = await anotherblockV2.treasury();

      const contractBalanceBefore = await ethers.provider.getBalance(
        dropV2.address
      );
      const treasuryBalanceBefore = await ethers.provider.getBalance(
        anotherblockTreasury
      );

      await dropV2.connect(owner).withdrawAll();

      const contractBalanceAfter = await ethers.provider.getBalance(
        dropV2.address
      );
      const treasuryBalanceAfter = await ethers.provider.getBalance(
        anotherblockTreasury
      );

      expect(contractBalanceBefore > contractBalanceAfter).to.equal(true);
      expect(contractBalanceAfter).to.equal(0);
      expect(treasuryBalanceAfter).to.equal(
        treasuryBalanceBefore.add(contractBalanceBefore)
      );
    });
  });

  describe("METHOD : setDropManager", async () => {
    before(async () => {
      // Deploy another instance of ABDropManager contract
      const AnotherBlockV1 = await ethers.getContractFactory("ABDropManager");
      anotherblockV1_2 = (await upgrades.deployProxy(
        AnotherBlockV1,
        [treasury.address],
        { initializer: "initialize" }
      )) as ABDropManagerV1;
      await anotherblockV1_2.deployed();

      const AnotherblockV2 = await ethers.getContractFactory("ABDropManager");
      anotherblockV2_2 = (await upgrades.upgradeProxy(
        anotherblockV1_2.address,
        AnotherblockV2,
        {
          call: {
            fn: "initializeV2",
            args: [mockMessenger.address, mockRelayAddr.address],
          },
        }
      )) as ABDropManager;
      await anotherblockV2_2.deployed();
    });

    it("should be able to update anotherblock address)", async () => {
      await dropV2.connect(owner).setDropManager(anotherblockV2_2.address);
      // Check that anotherblock address is updated
      expect(await dropV2.dropManager()).to.eq(anotherblockV2_2.address);
    });

    it("should not be able to update anotherblock address (not owner)", async () => {
      // Check that the transaction revert as the user is not granted with ADMIN_ROLE
      await expect(
        dropV2.connect(user2).setDropManager(anotherblockV2_2.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  function generatePhase(currentTimestamp: number): any[] {
    const tree0 = merkle0.tree;
    const tree1 = merkle1.tree;
    const tree2 = merkle2.tree;

    const phase0 = {
      phaseStart: currentTimestamp - 1000,
      maxMint: TEST_DATA.PHASE_0_MAX_MINT,
      merkle: tree0.getRoot(),
    };

    const phase1 = {
      phaseStart: currentTimestamp,
      maxMint: TEST_DATA.PHASE_1_MAX_MINT,
      merkle: tree1.getRoot(),
    };

    const phase2 = {
      phaseStart: TEST_DATA.PHASE_2_START,
      maxMint: TEST_DATA.PHASE_2_MAX_MINT,
      merkle: tree2.getRoot(),
    };

    return [phase0, phase1, phase2];
  }
});
