import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { ethers, upgrades } from "hardhat";
import { Generator } from "merkle";
import { generateLeaf } from "merkle";
import { ABDropManager, AnotherMinter, MockERC20 } from "web3-config";

import * as TEST_DATA from "./testdata/ABDropManager-test-data";

use(chaiAsPromised);

describe("Anotherblock V1 Unit Tests", function () {
  let anotherblockV2: ABDropManager;
  let dropV1: AnotherMinter;
  let dropV1_2: AnotherMinter;
  let mockERC20: MockERC20;

  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  let rightHolder: SignerWithAddress;
  let treasury: SignerWithAddress;
  let addrs: SignerWithAddress[];
  let merkle: Generator;

  before(async () => {
    // Get the signers required for the tests
    [owner, user1, user2, user3, rightHolder, treasury, ...addrs] =
      await ethers.getSigners();

    // Generate a Merkle tree
    merkle = new Generator("DROP#1", [user1.address, user2.address]);
    merkle.process(false);
  });

  beforeEach(async () => {
    // Deploy ABDropManager contract
    const AnotherBlockV1 = await ethers.getContractFactory("ABDropManager");
    anotherblockV2 = (await upgrades.deployProxy(
      AnotherBlockV1,
      [treasury.address],
      { initializer: "initialize" }
    )) as ABDropManager;
    await anotherblockV2.deployed();

    // Deploy Another721 contract
    const URI = "dropV1_URI";
    const NFTContract = await ethers.getContractFactory("Another721");
    dropV1 = (await NFTContract.deploy(
      anotherblockV2.address,
      URI,
      "anotherblock",
      "ABNFT"
    )) as Another721;
    await dropV1.deployed();

    // Create a mock ERC20 contract (for testing purpose)
    const MockERC20Contract = await ethers.getContractFactory("MockERC20");
    mockERC20 = (await MockERC20Contract.deploy()) as MockERC20;
    await mockERC20.mint(owner.address, ethers.utils.parseEther("1000"));
  });

  describe("CONSTRUCTOR", async () => {
    it("should not be able to deploy the contract with the incorrect treasury address", async () => {
      const AnotherBlockV1 = await ethers.getContractFactory("ABDropManager");
      await expect(
        upgrades.deployProxy(AnotherBlockV1, [TEST_DATA.ZERO_ADDRESS], {
          initializer: "initialize",
        })
      ).to.be.revertedWith("ZeroAddress");
    });
  });

  describe("METHOD : create", async () => {
    it("should create drop", async () => {
      const dropId = 0;
      const tree = merkle.tree;

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV1.address,
        TEST_DATA.PRICE,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        [
          TEST_DATA.MAX_PRIVATE_SALE,
          TEST_DATA.PRIVATE_SALE_TIME,
          TEST_DATA.MAX_PUBLIC_SALE,
          TEST_DATA.PUBLIC_SALE_TIME,
        ],
        tree.getRoot()
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
      expect(+drop[5][0]).to.eq(
        TEST_DATA.MAX_PRIVATE_SALE,
        "maxAmountPrivateSale"
      );
      expect(+drop[5][1]).to.eq(TEST_DATA.PRIVATE_SALE_TIME, "privateSale");
      expect(+drop[5][2]).to.eq(
        TEST_DATA.MAX_PUBLIC_SALE,
        "maxAmountPublicSale"
      );
      expect(+drop[5][3]).to.eq(TEST_DATA.PUBLIC_SALE_TIME, "publicSale");
      expect(drop[6]).to.eq(TEST_DATA.ZERO_ADDRESS, "currency");
      expect(drop[7]).to.eq(rightHolder.address, "owner");
      expect(drop[8]).to.eq(dropV1.address, "nft");
    });

    it("should not be able to create drop (nft address does not implement IERC1155AB)", async () => {
      const tree = merkle.tree;

      await expect(
        anotherblockV2.create(
          TEST_DATA.ZERO_ADDRESS,
          rightHolder.address,
          anotherblockV2.address,
          TEST_DATA.PRICE,
          TEST_DATA.SUPPLY,
          TEST_DATA.ROYALTY_SHARE,
          TEST_DATA.RIGHTHOLDER_FEE,
          [
            TEST_DATA.MAX_PRIVATE_SALE,
            TEST_DATA.PRIVATE_SALE_TIME,
            TEST_DATA.MAX_PUBLIC_SALE,
            TEST_DATA.PUBLIC_SALE_TIME,
          ],
          tree.getRoot()
        )
      ).to.be.revertedWith("IncorrectInterface");
    });

    it("should not be able to create drop (as a non-owner)", async () => {
      const tree = merkle.tree;

      await expect(
        anotherblockV2
          .connect(user1)
          .create(
            TEST_DATA.ZERO_ADDRESS,
            rightHolder.address,
            dropV1.address,
            TEST_DATA.PRICE,
            TEST_DATA.SUPPLY,
            TEST_DATA.ROYALTY_SHARE,
            TEST_DATA.RIGHTHOLDER_FEE,
            [
              TEST_DATA.MAX_PRIVATE_SALE,
              TEST_DATA.PRIVATE_SALE_TIME,
              TEST_DATA.MAX_PUBLIC_SALE,
              TEST_DATA.PUBLIC_SALE_TIME,
            ],
            tree.getRoot()
          )
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should not be able to create drop (incorrect royalty share amount)", async () => {
      const royaltyShare = 0;
      const tree = merkle.tree;

      await expect(
        anotherblockV2.create(
          TEST_DATA.ZERO_ADDRESS,
          rightHolder.address,
          dropV1.address,
          TEST_DATA.PRICE,
          TEST_DATA.SUPPLY,
          royaltyShare,
          TEST_DATA.RIGHTHOLDER_FEE,
          [
            TEST_DATA.MAX_PRIVATE_SALE,
            TEST_DATA.PRIVATE_SALE_TIME,
            TEST_DATA.MAX_PUBLIC_SALE,
            TEST_DATA.PUBLIC_SALE_TIME,
          ],
          tree.getRoot()
        )
      ).to.be.revertedWith("InsufficientRoyalties");
    });

    it("should not be able to create drop (incorrect max private sale amount per mint)", async () => {
      const tree = merkle.tree;
      const maxAmountPrivateSale = 0;

      await expect(
        anotherblockV2.create(
          TEST_DATA.ZERO_ADDRESS,
          rightHolder.address,
          dropV1.address,
          TEST_DATA.PRICE,
          TEST_DATA.SUPPLY,
          TEST_DATA.ROYALTY_SHARE,
          TEST_DATA.RIGHTHOLDER_FEE,
          [
            maxAmountPrivateSale,
            TEST_DATA.PRIVATE_SALE_TIME,
            TEST_DATA.MAX_PUBLIC_SALE,
            TEST_DATA.PUBLIC_SALE_TIME,
          ],
          tree.getRoot()
        )
      ).to.be.revertedWith("InsufficientMaxAmountPerAddress");
    });

    it("should not be able to create drop (incorrect max public sale amount per mint)", async () => {
      const maxAmountPublicSale = 0;
      const tree = merkle.tree;

      await expect(
        anotherblockV2.create(
          TEST_DATA.ZERO_ADDRESS,
          rightHolder.address,
          dropV1.address,
          TEST_DATA.PRICE,
          TEST_DATA.SUPPLY,
          TEST_DATA.ROYALTY_SHARE,
          TEST_DATA.RIGHTHOLDER_FEE,
          [
            TEST_DATA.MAX_PRIVATE_SALE,
            TEST_DATA.PRIVATE_SALE_TIME,
            maxAmountPublicSale,
            TEST_DATA.PUBLIC_SALE_TIME,
          ],
          tree.getRoot()
        )
      ).to.be.revertedWith("InsufficientMaxAmountPerAddress");
    });

    it("should not be able to create drop (incorrect supply quantity)", async () => {
      const supply = 0;
      const tree = merkle.tree;

      await expect(
        anotherblockV2.create(
          TEST_DATA.ZERO_ADDRESS,
          rightHolder.address,
          dropV1.address,
          TEST_DATA.PRICE,
          supply,
          TEST_DATA.ROYALTY_SHARE,
          TEST_DATA.RIGHTHOLDER_FEE,
          [
            TEST_DATA.MAX_PRIVATE_SALE,
            TEST_DATA.PRIVATE_SALE_TIME,
            TEST_DATA.MAX_PUBLIC_SALE,
            TEST_DATA.PUBLIC_SALE_TIME,
          ],
          tree.getRoot()
        )
      ).to.be.revertedWith("InsufficientSupply");
    });

    it("should not be able to create drop (incorrect right holder address)", async () => {
      const tree = merkle.tree;

      await expect(
        anotherblockV2.create(
          TEST_DATA.ZERO_ADDRESS,
          TEST_DATA.ZERO_ADDRESS,
          dropV1.address,
          TEST_DATA.PRICE,
          TEST_DATA.SUPPLY,
          TEST_DATA.ROYALTY_SHARE,
          TEST_DATA.RIGHTHOLDER_FEE,
          [
            TEST_DATA.MAX_PRIVATE_SALE,
            TEST_DATA.PRIVATE_SALE_TIME,
            TEST_DATA.MAX_PUBLIC_SALE,
            TEST_DATA.PUBLIC_SALE_TIME,
          ],
          tree.getRoot()
        )
      ).to.be.revertedWith("ZeroAddress");
    });
  });

  describe("METHOD : updateDropCounter", async () => {
    before(async () => {
      const URI = "dropV1_2_URI";
      const NFTContract = await ethers.getContractFactory("Another721");
      dropV1_2 = (await NFTContract.deploy(
        anotherblockV2.address,
        URI,
        "Another721",
        "DROP"
      )) as Another721;
      await dropV1_2.deployed();
    });

    beforeEach(async () => {
      // Drop Parameters
      const tree = merkle.tree;

      // Drop#1 creation (dropId: 0)
      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV1.address,
        TEST_DATA.PRICE,
        TEST_DATA.SUPPLY_10,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        [
          TEST_DATA.MAX_PRIVATE_SALE_6,
          TEST_DATA.PRIVATE_SALE_TIME,
          TEST_DATA.MAX_PUBLIC_SALE_6,
          TEST_DATA.PUBLIC_SALE_TIME,
        ],
        tree.getRoot()
      );
    });

    it("should not be able to update the drop details (not dropV1.nft address)", async () => {
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

  describe("METHOD : setSalesInfo", async () => {
    beforeEach(async () => {
      const mintPrice = 100;
      const price = ethers.utils.parseEther(mintPrice.toString());

      const maxAmountPrivateSale = 10;
      const maxAmountPublicSale = 10;
      const privateSale = 1000000000;
      const publicSale = 2000000000;

      const tree = merkle.tree;

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV1.address,
        price,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        [maxAmountPrivateSale, privateSale, maxAmountPublicSale, publicSale],
        tree.getRoot()
      );
    });
    it("should be able to set the saleInfo", async () => {
      const dropId = 0;

      const newPrivateSaleMaxMint = 5;
      const newPublicSaleMaxMint = 5;
      const newPrivateSaleTime = 3000000000;
      const newPublicSaleTime = 4000000000;

      await anotherblockV2
        .connect(owner)
        .setSalesInfo(dropId, [
          newPrivateSaleMaxMint,
          newPrivateSaleTime,
          newPublicSaleMaxMint,
          newPublicSaleTime,
        ]);

      const drop = await anotherblockV2.drops(dropId);

      expect(+drop[0]).to.eq(dropId, "dropId");
      expect(+drop[5][0]).to.eq(newPrivateSaleMaxMint, "maxAmountPrivateSale");
      expect(+drop[5][1]).to.eq(newPrivateSaleTime, "privateSale");
      expect(+drop[5][2]).to.eq(newPublicSaleMaxMint, "maxAmountPublicSale");
      expect(+drop[5][3]).to.eq(newPublicSaleTime, "publicSale");
    });

    it("should not be able to set the saleInfo (incorrect private sale max mint amount)", async () => {
      const dropId = 0;

      const newPrivateSaleMaxMint = 0;
      const newPublicSaleMaxMint = 5;
      const newPrivateSaleTime = 3000000000;
      const newPublicSaleTime = 4000000000;

      await expect(
        anotherblockV2
          .connect(owner)
          .setSalesInfo(dropId, [
            newPrivateSaleMaxMint,
            newPrivateSaleTime,
            newPublicSaleMaxMint,
            newPublicSaleTime,
          ])
      ).to.be.revertedWith("InsufficientMaxAmountPerAddress");
    });

    it("should not be able to set the saleInfo (incorrect public sale max mint amount)", async () => {
      const dropId = 0;

      const newPrivateSaleMaxMint = 5;
      const newPublicSaleMaxMint = 0;
      const newPrivateSaleTime = 3000000000;
      const newPublicSaleTime = 4000000000;

      await expect(
        anotherblockV2
          .connect(owner)
          .setSalesInfo(dropId, [
            newPrivateSaleMaxMint,
            newPrivateSaleTime,
            newPublicSaleMaxMint,
            newPublicSaleTime,
          ])
      ).to.be.revertedWith("InsufficientMaxAmountPerAddress");
    });

    it("should not be able to set the saleInfo (caller is not the owner)", async () => {
      const dropId = 0;

      const newPrivateSaleMaxMint = 5;
      const newPublicSaleMaxMint = 5;
      const newPrivateSaleTime = 3000000000;
      const newPublicSaleTime = 4000000000;

      await expect(
        anotherblockV2
          .connect(user1)
          .setSalesInfo(dropId, [
            newPrivateSaleMaxMint,
            newPrivateSaleTime,
            newPublicSaleMaxMint,
            newPublicSaleTime,
          ])
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("METHOD : setRightHolderInfo", async () => {
    beforeEach(async () => {
      const mintPrice = 100;
      const price = ethers.utils.parseEther(mintPrice.toString());
      const supply = 90;

      const maxAmountPrivateSale = 10;
      const maxAmountPublicSale = 10;
      const privateSale = 1000000000;
      const publicSale = 2000000000;

      const tree = merkle.tree;

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV1.address,
        price,
        supply,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        [maxAmountPrivateSale, privateSale, maxAmountPublicSale, publicSale],
        tree.getRoot()
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
      const maxAmountPrivateSale = 10;
      const maxAmountPublicSale = 10;
      const privateSale = 1000000000;
      const publicSale = 2000000000;

      const tree = merkle.tree;

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV1.address,
        price,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        [maxAmountPrivateSale, privateSale, maxAmountPublicSale, publicSale],
        tree.getRoot()
      );
    });

    it("should be able to set the token Info (drop not minted / no new drop created)", async () => {
      const dropId = 0;

      const newPrice = ethers.utils.parseEther("50");
      const newTokenCount = 20;
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
      const tree = merkle.tree;
      const mintPrice = 100;
      const price = ethers.utils.parseEther(mintPrice.toString());

      // Mint Parameters
      const options = { value: price.mul(TEST_DATA.MINT_QUANTITY_3) };
      const proof1 = tree.getHexProof(generateLeaf(user1.address));

      await dropV1
        .connect(user1)
        .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY_3, proof1, options);

      const dropId = 0;

      const newPrice = ethers.utils.parseEther("50");
      const newTokenCount = 20;
      const newSupply = 100;
      const newShare = 500;

      const currentTokenCount = 30;
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

    it("should be able to set the token Info (new drop created)", async () => {
      const mintPrice = 100;
      const price = ethers.utils.parseEther(mintPrice.toString());

      const maxAmountPrivateSale = 10;
      const maxAmountPublicSale = 10;
      const privateSale = 1000000000;
      const publicSale = 2000000000;

      const tree = merkle.tree;

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV1.address,
        price,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        [maxAmountPrivateSale, privateSale, maxAmountPublicSale, publicSale],
        tree.getRoot()
      );

      const dropId = 0;

      const newPrice = ethers.utils.parseEther("50");
      const newTokenCount = 20;
      const newSupply = 100;
      const newShare = 500;

      const currentTokenCount = 30;
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

    it("should not be able to set the token Info (incorrect supply to tokenCount ratio)", async () => {
      const dropId = 0;

      const newPrice = ethers.utils.parseEther("50");
      const newTokenCount = 20;
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
      const newTokenCount = 30;
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
      const newTokenCount = 20;
      const newSupply = 100;
      const newShare = 500;

      await expect(
        anotherblockV2
          .connect(user1)
          .setTokenInfo(dropId, [newPrice, newSupply, newShare])
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("METHOD : setMerkleRoot", async () => {
    beforeEach(async () => {
      const tree = merkle.tree;

      await anotherblockV2.create(
        TEST_DATA.ZERO_ADDRESS,
        rightHolder.address,
        dropV1.address,
        TEST_DATA.PRICE,
        TEST_DATA.SUPPLY,
        TEST_DATA.ROYALTY_SHARE,
        TEST_DATA.RIGHTHOLDER_FEE,
        [
          TEST_DATA.MAX_PRIVATE_SALE_6,
          TEST_DATA.PRIVATE_SALE_TIME,
          TEST_DATA.MAX_PUBLIC_SALE_6,
          TEST_DATA.PUBLIC_SALE_TIME,
        ],
        tree.getRoot()
      );
    });

    it("should be able to set another merkle root", async () => {
      const dropId = 0;

      let newMerkle = new Generator("DROP#1", [
        user1.address,
        user2.address,
        user3.address,
      ]);
      newMerkle.process(false);

      await anotherblockV2
        .connect(owner)
        .setMerkleRoot(dropId, newMerkle.tree.getRoot());

      const drop = await anotherblockV2.drops(dropId);

      expect(drop[9].toString()).to.eq(
        "0x299933cac28b9df1ae6dbf7f5d9814b5fe409a67795ed15dea6135b5fe78c6e3",
        "merkle"
      );
    });

    it("should not be able to set another merkle root (as a non-owner)", async () => {
      const dropId = 0;

      let newMerkle = new Generator("DROP#1", [
        user1.address,
        user2.address,
        user3.address,
      ]);
      newMerkle.process(false);

      await expect(
        anotherblockV2
          .connect(user1)
          .setMerkleRoot(dropId, newMerkle.tree.getRoot())
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
