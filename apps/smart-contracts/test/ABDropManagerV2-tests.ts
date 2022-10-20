import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { time, takeSnapshot } from "@nomicfoundation/hardhat-network-helpers";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { ethers, upgrades } from "hardhat";
import { Generator } from "merkle";
import { generateLeaf } from "merkle";
import {
  ABDropManager,
  ABDropManagerV1,
  AnotherMinter,
  MockERC20,
  MockMessenger,
} from "web3-config";

import * as TEST_DATA from "./testdata/ABDropManagerV2-test-data";

use(chaiAsPromised);

describe("Anotherblock V1 Unit Tests", function () {
  let anotherblockV1: ABDropManagerV1;
  let anotherblockV2: ABDropManager;
  let dropV2: AnotherMinter;
  let dropV2_2: AnotherMinter;
  let mockERC20: MockERC20;
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
    // Deploy Mocks for Testing purpose

    // Create a mock Messenger contract
    const MockMessengerContract = await ethers.getContractFactory(
      "MockMessenger"
    );
    mockMessenger = (await MockMessengerContract.deploy()) as MockMessenger;

    // Create a mock ERC20 contract
    const MockERC20Contract = await ethers.getContractFactory("MockERC20");
    mockERC20 = (await MockERC20Contract.deploy()) as MockERC20;
    await mockERC20.mint(owner.address, ethers.utils.parseEther("1000"));

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

    // Deploy Another721 contract
    const URI = "dropV1_URI";
    const NFTContract = await ethers.getContractFactory("AnotherMinter");
    dropV2 = (await NFTContract.deploy(
      anotherblockV2.address,
      mockMessenger.address,
      mockRelayAddr.address,
      URI,
      "anotherblock",
      "ABNFT"
    )) as AnotherMinter;
    await dropV2.deployed();
  });

  describe("METHOD : create", async () => {
    it("should create drop", async () => {
      const dropId = 0;
      const tree0 = merkle0.tree;
      const tree1 = merkle1.tree;
      const tree2 = merkle2.tree;

      const phase0 = {
        phaseStart: TEST_DATA.PHASE_0_START,
        maxMint: TEST_DATA.PHASE_0_MAX_MINT,
        merkle: tree0.getRoot(),
      };

      const phase1 = {
        phaseStart: TEST_DATA.PHASE_1_START,
        maxMint: TEST_DATA.PHASE_1_MAX_MINT,
        merkle: tree1.getRoot(),
      };

      const phase2 = {
        phaseStart: TEST_DATA.PHASE_2_START,
        maxMint: TEST_DATA.PHASE_2_MAX_MINT,
        merkle: tree2.getRoot(),
      };

      const PHASES = [phase0, phase1, phase2];

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

      const drop = await anotherblockV2.drops(dropId);

      // Check that the drop parameters are properly registered
      expect(+drop[0]).to.eq(dropId, "dropId");
      expect(+drop[1]).to.eq(0, "sold");
      expect(+drop[2]).to.eq(+TEST_DATA.RIGHTHOLDER_FEE, "rightHolderFee");
      expect(+drop[3]).to.eq(0, "firstTokenIndex");
      expect(+drop[4][0]).to.eq(+TEST_DATA.PRICE, "price");
      expect(+drop[4][1]).to.eq(+TEST_DATA.SUPPLY, "supply");
      expect(+drop[4][2]).to.eq(+TEST_DATA.ROYALTY_SHARE, "share");
      expect(+drop[5][0]).to.eq(0, "maxAmountPrivateSale");
      expect(+drop[5][1]).to.eq(0, "privateSale");
      expect(+drop[5][2]).to.eq(0, "maxAmountPublicSale");
      expect(+drop[5][3]).to.eq(0, "publicSale");
      expect(drop[6]).to.eq(TEST_DATA.ZERO_ADDRESS, "currency");
      expect(drop[7]).to.eq(rightHolder.address, "owner");
      expect(drop[8]).to.eq(dropV2.address, "nft");

      expect(await mockMessenger.lastTarget()).to.eq(mockRelayAddr.address);
      expect(await mockMessenger.lastCaller()).to.eq(anotherblockV2.address);
      expect(await mockMessenger.lastGasLimit()).to.eq(10000000);

      let dropPhase0 = await dropV2.phasesPerDrop(dropId, 0);
      let dropPhase1 = await dropV2.phasesPerDrop(dropId, 1);
      let dropPhase2 = await dropV2.phasesPerDrop(dropId, 2);

      expect(dropPhase0.phaseStart).to.eq(phase0.phaseStart);
      expect(dropPhase0.maxMint).to.eq(phase0.maxMint);

      expect(dropPhase1.phaseStart).to.eq(phase1.phaseStart);
      expect(dropPhase1.maxMint).to.eq(phase1.maxMint);

      expect(dropPhase2.phaseStart).to.eq(phase2.phaseStart);
      expect(dropPhase2.maxMint).to.eq(phase2.maxMint);
    });

    it("should not be able to create drop (as a non-owner)", async () => {
      const tree0 = merkle0.tree;
      const tree1 = merkle1.tree;
      const tree2 = merkle2.tree;

      const phase0 = {
        phaseStart: TEST_DATA.PHASE_0_START,
        maxMint: TEST_DATA.PHASE_0_MAX_MINT,
        merkle: tree0.getRoot(),
      };

      const phase1 = {
        phaseStart: TEST_DATA.PHASE_1_START,
        maxMint: TEST_DATA.PHASE_1_MAX_MINT,
        merkle: tree1.getRoot(),
      };

      const phase2 = {
        phaseStart: TEST_DATA.PHASE_2_START,
        maxMint: TEST_DATA.PHASE_2_MAX_MINT,
        merkle: tree2.getRoot(),
      };

      const PHASES = [phase0, phase1, phase2];

      await expect(
        anotherblockV2
          .connect(user1)
          .create(
            TEST_DATA.ZERO_ADDRESS,
            rightHolder.address,
            dropV2.address,
            TEST_DATA.PRICE,
            TEST_DATA.SUPPLY,
            TEST_DATA.ROYALTY_SHARE,
            TEST_DATA.RIGHTHOLDER_FEE,
            PHASES
          )
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should not be able to create drop (incorrect royalty share amount)", async () => {
      const royaltyShare = 0;
      const tree0 = merkle0.tree;
      const tree1 = merkle1.tree;
      const tree2 = merkle2.tree;

      const phase0 = {
        phaseStart: TEST_DATA.PHASE_0_START,
        maxMint: TEST_DATA.PHASE_0_MAX_MINT,
        merkle: tree0.getRoot(),
      };

      const phase1 = {
        phaseStart: TEST_DATA.PHASE_1_START,
        maxMint: TEST_DATA.PHASE_1_MAX_MINT,
        merkle: tree1.getRoot(),
      };

      const phase2 = {
        phaseStart: TEST_DATA.PHASE_2_START,
        maxMint: TEST_DATA.PHASE_2_MAX_MINT,
        merkle: tree2.getRoot(),
      };

      const PHASES = [phase0, phase1, phase2];

      await expect(
        anotherblockV2.create(
          TEST_DATA.ZERO_ADDRESS,
          rightHolder.address,
          dropV2.address,
          TEST_DATA.PRICE,
          TEST_DATA.SUPPLY,
          royaltyShare,
          TEST_DATA.RIGHTHOLDER_FEE,
          PHASES
        )
      ).to.be.revertedWith("InsufficientRoyalties");
    });

    it("should not be able to create drop (incorrect supply quantity)", async () => {
      const supply = 0;
      const tree0 = merkle0.tree;
      const tree1 = merkle1.tree;
      const tree2 = merkle2.tree;

      const phase0 = {
        phaseStart: TEST_DATA.PHASE_0_START,
        maxMint: TEST_DATA.PHASE_0_MAX_MINT,
        merkle: tree0.getRoot(),
      };

      const phase1 = {
        phaseStart: TEST_DATA.PHASE_1_START,
        maxMint: TEST_DATA.PHASE_1_MAX_MINT,
        merkle: tree1.getRoot(),
      };

      const phase2 = {
        phaseStart: TEST_DATA.PHASE_2_START,
        maxMint: TEST_DATA.PHASE_2_MAX_MINT,
        merkle: tree2.getRoot(),
      };

      const PHASES = [phase0, phase1, phase2];
      await expect(
        anotherblockV2.create(
          TEST_DATA.ZERO_ADDRESS,
          rightHolder.address,
          dropV2.address,
          TEST_DATA.PRICE,
          supply,
          TEST_DATA.ROYALTY_SHARE,
          TEST_DATA.RIGHTHOLDER_FEE,
          PHASES
        )
      ).to.be.revertedWith("InsufficientSupply");
    });

    it("should not be able to create drop (incorrect right holder address)", async () => {
      const tree0 = merkle0.tree;
      const tree1 = merkle1.tree;
      const tree2 = merkle2.tree;

      const phase0 = {
        phaseStart: TEST_DATA.PHASE_0_START,
        maxMint: TEST_DATA.PHASE_0_MAX_MINT,
        merkle: tree0.getRoot(),
      };

      const phase1 = {
        phaseStart: TEST_DATA.PHASE_1_START,
        maxMint: TEST_DATA.PHASE_1_MAX_MINT,
        merkle: tree1.getRoot(),
      };

      const phase2 = {
        phaseStart: TEST_DATA.PHASE_2_START,
        maxMint: TEST_DATA.PHASE_2_MAX_MINT,
        merkle: tree2.getRoot(),
      };

      const PHASES = [phase0, phase1, phase2];

      await expect(
        anotherblockV2.create(
          TEST_DATA.ZERO_ADDRESS,
          TEST_DATA.ZERO_ADDRESS,
          dropV2.address,
          TEST_DATA.PRICE,
          TEST_DATA.SUPPLY,
          TEST_DATA.ROYALTY_SHARE,
          TEST_DATA.RIGHTHOLDER_FEE,
          PHASES
        )
      ).to.be.revertedWith("ZeroAddress");
    });
  });

  describe("METHOD : updateDropCounter", async () => {
    before(async () => {
      const URI = "dropV2_2_URI";
      const NFTContract = await ethers.getContractFactory("AnotherMinter");
      dropV2_2 = (await NFTContract.deploy(
        anotherblockV2.address,
        mockMessenger.address,
        mockRelayAddr.address,
        URI,
        "anotherblock",
        "ABNFT"
      )) as AnotherMinter;
      await dropV2_2.deployed();
    });

    beforeEach(async () => {
      // Drop Parameters
      const tree0 = merkle0.tree;
      const tree1 = merkle1.tree;
      const tree2 = merkle2.tree;

      const phase0 = {
        phaseStart: TEST_DATA.PHASE_0_START,
        maxMint: TEST_DATA.PHASE_0_MAX_MINT,
        merkle: tree0.getRoot(),
      };

      const phase1 = {
        phaseStart: TEST_DATA.PHASE_1_START,
        maxMint: TEST_DATA.PHASE_1_MAX_MINT,
        merkle: tree1.getRoot(),
      };

      const phase2 = {
        phaseStart: TEST_DATA.PHASE_2_START,
        maxMint: TEST_DATA.PHASE_2_MAX_MINT,
        merkle: tree2.getRoot(),
      };

      const PHASES = [phase0, phase1, phase2];

      // Drop#1 creation (dropId: 0)
      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        TEST_DATA.PRICE,
        TEST_DATA.SUPPLY_10,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        PHASES
      );
    });

    it("should not be able to update the drop details (not dropV2.nft address)", async () => {
      const dropId = 0;
      const quantity = 5;

      await expect(
        anotherblockV2.connect(user1).updateDropCounter(dropId, quantity)
      ).to.be.revertedWith("UnauthorizedUpdate");
    });
  });

  describe("METHOD : setTreasury", async () => {
    it("should be able to update the treasury address)", async () => {
      const newTreasuryAddress = user1.address;

      await anotherblockV2.connect(owner).setTreasury(newTreasuryAddress);

      // Check that the treasury address is updated
      expect(await anotherblockV2.treasury()).to.eq(newTreasuryAddress);
    });

    it("should not be able to update the treasury address (as a non-owner)", async () => {
      const newTreasuryAddress = user1.address;

      await expect(
        anotherblockV2.connect(user1).setTreasury(newTreasuryAddress)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should not be able to update the treasury address (set to zero-address)", async () => {
      await expect(
        anotherblockV2.connect(owner).setTreasury(TEST_DATA.ZERO_ADDRESS)
      ).to.be.revertedWith("ZeroAddress");
    });
  });

  describe("METHOD : setRightHolderInfo", async () => {
    beforeEach(async () => {
      const mintPrice = 100;
      const price = ethers.utils.parseEther(mintPrice.toString());
      const supply = 90;

      const tree0 = merkle0.tree;
      const tree1 = merkle1.tree;
      const tree2 = merkle2.tree;

      const phase0 = {
        phaseStart: TEST_DATA.PHASE_0_START,
        maxMint: TEST_DATA.PHASE_0_MAX_MINT,
        merkle: tree0.getRoot(),
      };

      const phase1 = {
        phaseStart: TEST_DATA.PHASE_1_START,
        maxMint: TEST_DATA.PHASE_1_MAX_MINT,
        merkle: tree1.getRoot(),
      };

      const phase2 = {
        phaseStart: TEST_DATA.PHASE_2_START,
        maxMint: TEST_DATA.PHASE_2_MAX_MINT,
        merkle: tree2.getRoot(),
      };

      const PHASES = [phase0, phase1, phase2];

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV2.address,
        price,
        supply,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        PHASES
      );
    });
    it("should be able to set the right holder info", async () => {
      const dropId = 0;

      const newRightHolderFee = 50000;
      const newOwnerAddress = user1.address;

      await anotherblockV2
        .connect(owner)
        .setRightHolderInfo(dropId, newRightHolderFee, newOwnerAddress);

      const drop = await anotherblockV2.drops(dropId);

      expect(+drop[0]).to.eq(0, "dropId");
      expect(+drop[2]).to.eq(+newRightHolderFee, "rightHolderFee");
      expect(drop[7]).to.eq(newOwnerAddress, "owner");
    });

    it("should not be able to set the right holder info (owner address is the zero-address)", async () => {
      const dropId = 0;

      const newRightHolderFee = 50000;

      await expect(
        anotherblockV2
          .connect(owner)
          .setRightHolderInfo(dropId, newRightHolderFee, TEST_DATA.ZERO_ADDRESS)
      ).to.be.revertedWith("ZeroAddress");
    });

    it("should not be able to set the right holder info (caller is not the owner)", async () => {
      const dropId = 0;

      const newOwnerAddress = user1.address;
      const newRightHolderFee = 50000;

      await expect(
        anotherblockV2
          .connect(user2)
          .setRightHolderInfo(dropId, newRightHolderFee, newOwnerAddress)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("METHOD : setTokenInfo", async () => {
    beforeEach(async () => {
      const mintPrice = 100;
      const price = ethers.utils.parseEther(mintPrice.toString());

      const tree0 = merkle0.tree;
      const tree1 = merkle1.tree;
      const tree2 = merkle2.tree;

      const phase0 = {
        phaseStart: TEST_DATA.PHASE_0_START,
        maxMint: TEST_DATA.PHASE_0_MAX_MINT,
        merkle: tree0.getRoot(),
      };

      const phase1 = {
        phaseStart: TEST_DATA.PHASE_1_START,
        maxMint: TEST_DATA.PHASE_1_MAX_MINT,
        merkle: tree1.getRoot(),
      };

      const phase2 = {
        phaseStart: TEST_DATA.PHASE_2_START,
        maxMint: TEST_DATA.PHASE_2_MAX_MINT,
        merkle: tree2.getRoot(),
      };

      const PHASES = [phase0, phase1, phase2];

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
    });

    it("should be able to set the token Info (drop not minted / no new drop created)", async () => {
      const dropId = 0;

      const newPrice = ethers.utils.parseEther("50");
      const newSupply = 100;
      const newShare = 500;

      await anotherblockV2
        .connect(owner)
        .setTokenInfo(dropId, [newPrice, newSupply, newShare]);

      const drop = await anotherblockV2.drops(dropId);

      expect(+drop[0]).to.eq(0, "dropId");
      expect(+drop[4][0]).to.eq(+newPrice, "price");
      expect(+drop[4][1]).to.eq(+newSupply, "supply");
      expect(+drop[4][2]).to.eq(+newShare, "share");
    });

    it("should be able to set the token Info (drop minted)", async () => {
      const snapshot = await takeSnapshot();
      await time.increaseTo(TEST_DATA.PHASE_2_START);

      const tree2 = merkle2.tree;
      const mintPrice = 100;
      const price = ethers.utils.parseEther(mintPrice.toString());

      // Mint Parameters
      const options = { value: price.mul(TEST_DATA.MINT_QUANTITY_3) };
      const proof = tree2.getHexProof(generateLeaf(user1.address));

      await dropV2
        .connect(user1)
        .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY_3, proof, options);

      const dropId = 0;

      const newPrice = ethers.utils.parseEther("50");
      const newSupply = 100;
      const newShare = 500;

      const currentSupply = 90;

      await anotherblockV2
        .connect(owner)
        .setTokenInfo(dropId, [newPrice, newSupply, newShare]);

      const drop = await anotherblockV2.drops(dropId);

      expect(+drop[0]).to.eq(0, "dropId");
      expect(+drop[4][0]).to.eq(+newPrice, "price");
      expect(+drop[4][1]).to.eq(+currentSupply, "supply");
      expect(+drop[4][2]).to.eq(+newShare, "share");

      await snapshot.restore();
    });

    it("should be able to set the token Info (new drop created)", async () => {
      const mintPrice = 100;
      const price = ethers.utils.parseEther(mintPrice.toString());

      const tree0 = merkle0.tree;
      const tree1 = merkle1.tree;
      const tree2 = merkle2.tree;

      const phase0 = {
        phaseStart: TEST_DATA.PHASE_0_START,
        maxMint: TEST_DATA.PHASE_0_MAX_MINT,
        merkle: tree0.getRoot(),
      };

      const phase1 = {
        phaseStart: TEST_DATA.PHASE_1_START,
        maxMint: TEST_DATA.PHASE_1_MAX_MINT,
        merkle: tree1.getRoot(),
      };

      const phase2 = {
        phaseStart: TEST_DATA.PHASE_2_START,
        maxMint: TEST_DATA.PHASE_2_MAX_MINT,
        merkle: tree2.getRoot(),
      };

      const PHASES = [phase0, phase1, phase2];

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

      const dropId = 0;

      const newPrice = ethers.utils.parseEther("50");
      const newSupply = 100;
      const newShare = 500;

      const currentSupply = 90;

      await anotherblockV2
        .connect(owner)
        .setTokenInfo(dropId, [newPrice, newSupply, newShare]);

      const drop = await anotherblockV2.drops(dropId);

      expect(+drop[0]).to.eq(0, "dropId");
      expect(+drop[4][0]).to.eq(+newPrice, "price");
      expect(+drop[4][1]).to.eq(+currentSupply, "supply");
      expect(+drop[4][2]).to.eq(+newShare, "share");
    });

    it("should not be able to set the token Info (incorrect royalties share amount)", async () => {
      const dropId = 0;

      const newPrice = ethers.utils.parseEther("50");
      const newSupply = 100;
      const newShare = 0;

      await expect(
        anotherblockV2
          .connect(owner)
          .setTokenInfo(dropId, [newPrice, newSupply, newShare])
      ).to.be.revertedWith("InsufficientRoyalties");
    });

    it("should not be able to set the token Info (incorrect supply)", async () => {
      const dropId = 0;

      const newPrice = ethers.utils.parseEther("50");
      const newSupply = 0;
      const newShare = 500;

      await expect(
        anotherblockV2
          .connect(owner)
          .setTokenInfo(dropId, [newPrice, newSupply, newShare])
      ).to.be.revertedWith("InsufficientSupply");
    });

    it("should not be able to set the token Info (caller is not the owner)", async () => {
      const dropId = 0;

      const newPrice = ethers.utils.parseEther("50");
      const newSupply = 100;
      const newShare = 500;

      await expect(
        anotherblockV2
          .connect(user1)
          .setTokenInfo(dropId, [newPrice, newSupply, newShare])
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
