// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { expect, use } from "chai";
// import chaiAsPromised from "chai-as-promised";
// import { Decimal } from "decimal.js";
// import { ethers, upgrades } from "hardhat";
// import { Generator } from "merkle";
// import { generateLeaf } from "merkle";
// import { ABDropManager, ABDropManagerV1, AnotherMinter } from "web3-config";

// import * as TEST_DATA from "./testdata/AnotherMinter-test-data";

// use(chaiAsPromised);

// describe("Drop V1 Unit Tests", function () {
//   let dropV2: AnotherMinter;
//   let anotherblockV1: ABDropManagerV1;
//   let anotherblockV2: ABDropManager;
//   let anotherblockV1_2: ABDropManager;

//   let owner: SignerWithAddress;
//   let user1: SignerWithAddress;
//   let user2: SignerWithAddress;
//   let user3: SignerWithAddress;
//   let rightHolder: SignerWithAddress;
//   let treasury: SignerWithAddress;
//   let addrs: SignerWithAddress[];
//   let merkle: Generator;

//   before(async () => {
//     // Get the signers required for the tests
//     [owner, user1, user2, user3, rightHolder, treasury, ...addrs] =
//       await ethers.getSigners();

//     // Generate a Merkle tree
//     merkle = new Generator("DROP#1", [user1.address, user2.address]);
//     merkle.process(false);
//   });

//   beforeEach(async () => {
//     // Deploy ABDropManager contract
//     const AnotherBlockV1 = await ethers.getContractFactory("ABDropManager");
//     anotherblockV1 = (await upgrades.deployProxy(
//       AnotherBlockV1,
//       [treasury.address],
//       { initializer: "initialize" }
//     )) as ABDropManager;
//     await anotherblockV1.deployed();

//     // Deploy Another721 contract
//     const NFTContract = await ethers.getContractFactory("Another721");
//     dropV2 = (await NFTContract.deploy(
//       anotherblockV1.address,
//       TEST_DATA.URI,
//       "Another721",
//       "DROP"
//     )) as Another721;
//     await dropV2.deployed();
//   });

//   describe("CONSTRUCTOR", async () => {
//     it("should not be able to deploy the contract with the incorrect interface (other contract address)", async () => {
//       const NFTContract = await ethers.getContractFactory("Another721");

//       const dropV1_2 = await NFTContract.deploy(
//         anotherblockV1.address,
//         TEST_DATA.URI,
//         "Another721",
//         "DROP"
//       );
//       await dropV1_2.deployed();

//       await expect(
//         NFTContract.deploy(
//           dropV1_2.address,
//           TEST_DATA.URI,
//           "Another721",
//           "DROP"
//         )
//       ).to.be.revertedWith("IncorrectInterface");
//     });

//     it("should not be able to deploy the contract with the incorrect interface (EOA address)", async () => {
//       const NFTContract = await ethers.getContractFactory("Another721");

//       await expect(
//         NFTContract.deploy(user1.address, TEST_DATA.URI, "Another721", "DROP")
//       ).to.be.revertedWith("IncorrectInterface");
//     });
//   });

//   describe("METHOD : mint", async () => {
//     it("should be able to mint an NFT", async () => {
//       const proof = merkle.tree.getHexProof(generateLeaf(user1.address));

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE_6,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE_6,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       const rightHolderFeePercent = new Decimal(TEST_DATA.RIGHTHOLDER_FEE).div(
//         1000000
//       );

//       const rightHolderEthBalBefore = await ethers.provider.getBalance(
//         rightHolder.address
//       );
//       const anotherblockEthBalBefore = await ethers.provider.getBalance(
//         dropV2.address
//       );

//       expect(+(await dropV2.balanceOf(user1.address))).to.eq(0);

//       expect(
//         await dropV2
//           .connect(user1)
//           .getClaimIneligibilityReason(
//             user1.address,
//             TEST_DATA.MINT_QUANTITY,
//             0
//           )
//       ).to.eq("");

//       await dropV2
//         .connect(user1)
//         .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
//           value: TEST_DATA.PRICE,
//         });

//       const rightHolderEthBalAfter = await ethers.provider.getBalance(
//         rightHolder.address
//       );
//       const anotherblockEthBalAfter = await ethers.provider.getBalance(
//         dropV2.address
//       );

//       expect(+(await dropV2.balanceOf(user1.address))).to.eq(1);

//       const expectedRightHolderBalance = new Decimal(
//         ethers.utils.formatEther(rightHolderEthBalBefore)
//       )
//         .add(rightHolderFeePercent.mul(TEST_DATA.MINT_PRICE))
//         .toString();

//       expect(ethers.utils.formatEther(rightHolderEthBalAfter).toString()).to.eq(
//         expectedRightHolderBalance,
//         "Fees not sent to Right Holder"
//       );

//       const expectedAnotherblockBalance = new Decimal(
//         ethers.utils.formatEther(anotherblockEthBalBefore)
//       )
//         .add(
//           new Decimal(1).sub(rightHolderFeePercent).mul(TEST_DATA.MINT_PRICE)
//         )
//         .toString();

//       expect(
//         ethers.utils.formatEther(anotherblockEthBalAfter).toString()
//       ).to.eq(expectedAnotherblockBalance, "Fees not kept to AB Treasury");
//     });

//     it("should be able to mint an NFT (100% of the Fees goes to the rightHolder)", async () => {
//       const proof = merkle.tree.getHexProof(generateLeaf(user1.address));

//       const rightHolderFee = 1000000;

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         rightHolderFee,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       expect(+(await dropV2.balanceOf(user1.address))).to.eq(0);
//       const rightHolderEthBalBefore = await ethers.provider.getBalance(
//         rightHolder.address
//       );
//       const anotherblockEthBalBefore = await ethers.provider.getBalance(
//         dropV2.address
//       );

//       await dropV2
//         .connect(user1)
//         .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
//           value: TEST_DATA.PRICE,
//         });

//       expect(+(await dropV2.balanceOf(user1.address))).to.eq(1);
//       const rightHolderEthBalAfter = await ethers.provider.getBalance(
//         rightHolder.address
//       );
//       const anotherblockEthBalAfter = await ethers.provider.getBalance(
//         dropV2.address
//       );

//       expect(+ethers.utils.formatEther(rightHolderEthBalAfter)).to.eq(
//         +ethers.utils.formatEther(rightHolderEthBalBefore) +
//           TEST_DATA.MINT_PRICE,
//         "Fees not sent to Right Holder"
//       );

//       expect(+ethers.utils.formatEther(anotherblockEthBalAfter)).to.eq(
//         +ethers.utils.formatEther(anotherblockEthBalBefore),
//         "Fees kept to AB Treasury"
//       );
//     });

//     it("should be able to mint a free mint NFT", async () => {
//       const proof = merkle.tree.getHexProof(generateLeaf(user1.address));

//       const mintPrice = 0;
//       const price = ethers.utils.parseEther(mintPrice.toString());

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         price,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       expect(+(await dropV2.balanceOf(user1.address))).to.eq(0);
//       const rightHolderEthBalBefore = await ethers.provider.getBalance(
//         rightHolder.address
//       );
//       const anotherblockEthBalBefore = await ethers.provider.getBalance(
//         dropV2.address
//       );

//       await dropV2
//         .connect(user1)
//         .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
//           value: price,
//         });

//       expect(+(await dropV2.balanceOf(user1.address))).to.eq(1);
//       const rightHolderEthBalAfter = await ethers.provider.getBalance(
//         rightHolder.address
//       );
//       const anotherblockEthBalAfter = await ethers.provider.getBalance(
//         dropV2.address
//       );

//       expect(+ethers.utils.formatEther(rightHolderEthBalAfter)).to.eq(
//         +ethers.utils.formatEther(rightHolderEthBalBefore),
//         "Fees to Right Holder"
//       );

//       expect(+ethers.utils.formatEther(anotherblockEthBalAfter)).to.eq(
//         +ethers.utils.formatEther(anotherblockEthBalBefore),
//         "Fees to AB Treasury"
//       );
//     });

//     it("should be able to mint an NFT (0% fees to rightholder)", async () => {
//       const proof = merkle.tree.getHexProof(generateLeaf(user1.address));

//       const rightholderFee = 0;

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         rightholderFee,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       expect(+(await dropV2.balanceOf(user1.address))).to.eq(0);
//       const rightHolderEthBalBefore = await ethers.provider.getBalance(
//         rightHolder.address
//       );
//       const anotherblockEthBalBefore = await ethers.provider.getBalance(
//         dropV2.address
//       );

//       await dropV2
//         .connect(user1)
//         .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
//           value: TEST_DATA.PRICE,
//         });

//       expect(+(await dropV2.balanceOf(user1.address))).to.eq(1);
//       const rightHolderEthBalAfter = await ethers.provider.getBalance(
//         rightHolder.address
//       );
//       const anotherblockEthBalAfter = await ethers.provider.getBalance(
//         dropV2.address
//       );

//       expect(+ethers.utils.formatEther(rightHolderEthBalAfter)).to.eq(
//         +ethers.utils.formatEther(rightHolderEthBalBefore),
//         "Fees to Right Holder"
//       );

//       expect(+ethers.utils.formatEther(anotherblockEthBalAfter)).to.eq(
//         +ethers.utils.formatEther(anotherblockEthBalBefore) + 0.5,
//         "Fees to AB Treasury"
//       );
//     });

//     it("should not be able to mint an NFT (not whitelisted)", async () => {
//       const proof = merkle.tree.getHexProof(generateLeaf(user3.address));

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       await expect(
//         dropV2
//           .connect(user3)
//           .mint(user3.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
//             value: TEST_DATA.PRICE,
//           })
//       ).to.eventually.be.rejectedWith("NotInMerkle");
//     });

//     it("should not be able to mint an NFT (drop does not exists)", async () => {
//       const proof = merkle.tree.getHexProof(generateLeaf(user1.address));

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       await expect(
//         dropV2
//           .connect(user1)
//           .mint(user1.address, 1, TEST_DATA.MINT_QUANTITY, proof, {
//             value: TEST_DATA.PRICE,
//           })
//       ).to.be.reverted;
//     });

//     it("should not be able to mint an NFT (drop sold out)", async () => {
//       const proofAddr1 = merkle.tree.getHexProof(generateLeaf(user1.address));
//       const proofAddr2 = merkle.tree.getHexProof(generateLeaf(user2.address));

//       const supply = 1;

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         supply,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       await dropV2
//         .connect(user1)
//         .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proofAddr1, {
//           value: TEST_DATA.PRICE,
//         });

//       await expect(
//         dropV2
//           .connect(user2)
//           .mint(user2.address, 0, TEST_DATA.MINT_QUANTITY, proofAddr2, {
//             value: TEST_DATA.PRICE,
//           })
//       ).to.be.revertedWith("DropSoldOut");

//       expect(
//         await dropV2
//           .connect(user2)
//           .getClaimIneligibilityReason(
//             user2.address,
//             TEST_DATA.MINT_QUANTITY,
//             0
//           )
//       ).to.eq("DropSoldOut");
//     });

//     it("should not be able to mint an NFT (already minted maximum amount in private sale)", async () => {
//       const proofAddr1 = merkle.tree.getHexProof(generateLeaf(user1.address));

//       const supply = 3;

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         supply,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       await dropV2
//         .connect(user1)
//         .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proofAddr1, {
//           value: TEST_DATA.PRICE,
//         });

//       await expect(
//         dropV2
//           .connect(user1)
//           .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proofAddr1, {
//             value: TEST_DATA.PRICE,
//           })
//       ).to.be.revertedWith("MaxMintPerAddress");

//       expect(
//         await dropV2
//           .connect(user1)
//           .getClaimIneligibilityReason(
//             user1.address,
//             TEST_DATA.MINT_QUANTITY,
//             0
//           )
//       ).to.eq("MaxMintPerAddress");
//     });

//     it("should not be able to mint an NFT (already minted maximum amount in public sale)", async () => {
//       const proofAddr1 = merkle.tree.getHexProof(generateLeaf(user1.address));

//       const supply = 3;

//       const publicSale = 1600000000;

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         supply,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           publicSale,
//         ],
//         merkle.tree.getRoot()
//       );

//       await dropV2
//         .connect(user1)
//         .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proofAddr1, {
//           value: TEST_DATA.PRICE,
//         });

//       await expect(
//         dropV2
//           .connect(user1)
//           .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proofAddr1, {
//             value: TEST_DATA.PRICE,
//           })
//       ).to.be.revertedWith("MaxMintPerAddress");

//       expect(
//         await dropV2
//           .connect(user1)
//           .getClaimIneligibilityReason(
//             user1.address,
//             TEST_DATA.MINT_QUANTITY,
//             0
//           )
//       ).to.eq("MaxMintPerAddress");
//     });

//     it("should not be able to mint an NFT (not enough token available)", async () => {
//       const proofAddr1 = merkle.tree.getHexProof(generateLeaf(user1.address));
//       const proofAddr2 = merkle.tree.getHexProof(generateLeaf(user2.address));

//       const supply = 3;

//       const mintQuantity = 2;

//       const maxAmountPrivateSale = 2;
//       const maxAmountPublicSale = 2;

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         supply,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           maxAmountPrivateSale,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           maxAmountPublicSale,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       await dropV2
//         .connect(user1)
//         .mint(user1.address, 0, mintQuantity, proofAddr1, {
//           value: TEST_DATA.PRICE.mul(mintQuantity),
//         });

//       await expect(
//         dropV2.connect(user2).mint(user2.address, 0, mintQuantity, proofAddr2, {
//           value: TEST_DATA.PRICE.mul(mintQuantity),
//         })
//       ).to.be.revertedWith("NotEnoughTokensAvailable");

//       expect(
//         await dropV2
//           .connect(user2)
//           .getClaimIneligibilityReason(user2.address, mintQuantity, 0)
//       ).to.eq("NotEnoughTokensAvailable");
//     });

//     it("should not be able to mint an NFT (did not send enough ETH)", async () => {
//       const proof = merkle.tree.getHexProof(generateLeaf(user1.address));

//       const options = { value: ethers.utils.parseEther("0.4") };

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       await expect(
//         dropV2
//           .connect(user1)
//           .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, options)
//       ).to.be.revertedWith("IncorrectETHSent");
//     });

//     it("should not be able to mint an NFT (sent too much ETH)", async () => {
//       const options = { value: ethers.utils.parseEther("0.6") };

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       const proof = merkle.tree.getHexProof(generateLeaf(user1.address));

//       await expect(
//         dropV2
//           .connect(user1)
//           .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, options)
//       ).to.be.revertedWith("IncorrectETHSent");
//     });

//     it("should be able to mint an NFT before private sale starts (private sale timestamp : 1/1/2050)", async () => {
//       const privateSale = 2524676922;
//       const publicSale = 2624676922;

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           privateSale,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           publicSale,
//         ],
//         merkle.tree.getRoot()
//       );

//       const proof = merkle.tree.getHexProof(generateLeaf(user2.address));

//       await expect(
//         dropV2
//           .connect(user2)
//           .mint(user2.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
//             value: TEST_DATA.PRICE,
//           })
//       ).to.be.revertedWith("SaleNotStarted");

//       expect(
//         await dropV2
//           .connect(user2)
//           .getClaimIneligibilityReason(
//             user2.address,
//             TEST_DATA.MINT_QUANTITY,
//             0
//           )
//       ).to.eq("SaleNotStarted");
//     });

//     it("should be able to mint an NFT during public sale (empty Merkle Root)", async () => {
//       const proof = merkle.tree.getHexProof(generateLeaf(user3.address));
//       const emptyMerkleRoot =
//         "0x0000000000000000000000000000000000000000000000000000000000000000";

//       const privateSale = 1560000000;
//       const publicSale = 1577879999;

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           privateSale,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           publicSale,
//         ],
//         emptyMerkleRoot
//       );

//       expect(+(await dropV2.balanceOf(user3.address))).to.eq(0);

//       await dropV2
//         .connect(user3)
//         .mint(user3.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
//           value: TEST_DATA.PRICE,
//         });

//       expect(+(await dropV2.balanceOf(user3.address))).to.eq(1);
//     });

//     it("should be able to mint an NFT during public sale (using claimTo method)", async () => {
//       const emptyMerkleRoot =
//         "0x0000000000000000000000000000000000000000000000000000000000000000";

//       const privateSale = 1560000000;
//       const publicSale = 1577879999;

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           privateSale,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           publicSale,
//         ],
//         emptyMerkleRoot
//       );

//       expect(+(await dropV2.balanceOf(user3.address))).to.eq(0);

//       await dropV2
//         .connect(user3)
//         .claimTo(user3.address, TEST_DATA.MINT_QUANTITY, 0, {
//           value: TEST_DATA.PRICE,
//         });

//       expect(+(await dropV2.balanceOf(user3.address))).to.eq(1);
//     });

//     it("should be able to mint an NFT during public sale (public sale timestamp : 1/1/2020)", async () => {
//       const privateSale = 1560000000;
//       const publicSale = 1577879999;

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           privateSale,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           publicSale,
//         ],
//         merkle.tree.getRoot()
//       );

//       const proof = merkle.tree.getHexProof(generateLeaf(user3.address));
//       const userNftBalBefore = await dropV2.balanceOf(user3.address);

//       expect(
//         await dropV2
//           .connect(user3)
//           .getClaimIneligibilityReason(
//             user3.address,
//             TEST_DATA.MINT_QUANTITY,
//             0
//           )
//       ).to.eq("");

//       await dropV2
//         .connect(user3)
//         .mint(user3.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
//           value: TEST_DATA.PRICE,
//         });

//       const userNftBalAfter = await dropV2.balanceOf(user3.address);

//       expect(+userNftBalBefore).to.eq(0);
//       expect(+userNftBalAfter).to.eq(1);
//     });
//   });

//   describe("METHOD : setURI", async () => {
//     beforeEach(async () => {
//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );
//       const proof1 = merkle.tree.getHexProof(generateLeaf(user1.address));
//       await dropV2
//         .connect(user1)
//         .mint(user1.address, 0, 1, proof1, { value: TEST_DATA.PRICE });
//     });

//     it("should set a new URI", async () => {
//       const newBaseURI = "this is the new base URI/";

//       await dropV2.setBaseURI(newBaseURI);

//       // Check that the URI is updated
//       expect(await dropV2.tokenURI(0)).to.eq(newBaseURI + "0");
//     });

//     it("should not be able to set a new URI (not ADMIN_ROLE)", async () => {
//       const newBaseURI = "this is the new base URI/";

//       // Check that the transaction revert as the user is not granted with ADMIN_ROLE
//       await expect(
//         dropV2.connect(user2).setBaseURI(newBaseURI)
//       ).to.be.revertedWith("Ownable: caller is not the owner");
//     });
//   });

//   describe("METHOD : tokensOfOwner", async () => {
//     beforeEach(async () => {
//       const maxAmountPrivateSale = 10;
//       const maxAmountPublicSale = 10;

//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           maxAmountPrivateSale,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           maxAmountPublicSale,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       const proof1 = merkle.tree.getHexProof(generateLeaf(user1.address));
//       const proof2 = merkle.tree.getHexProof(generateLeaf(user2.address));

//       await dropV2
//         .connect(user1)
//         .mint(user1.address, 0, 5, proof1, { value: TEST_DATA.PRICE.mul(5) });
//       await dropV2
//         .connect(user2)
//         .mint(user2.address, 0, 1, proof2, { value: TEST_DATA.PRICE });
//       await dropV2
//         .connect(user1)
//         .mint(user1.address, 0, 1, proof1, { value: TEST_DATA.PRICE });
//     });

//     it("should return the TokenIds owned by the user", async () => {
//       const tokenIds = await dropV2.tokensOfOwner(user1.address);

//       const expectedTokenIds = [0, 1, 2, 3, 4, 6];

//       expect(tokenIds.length).to.eq(expectedTokenIds.length, "Lenght Mismatch");

//       for (let i = 0; i < expectedTokenIds.length; i++) {
//         expect(+tokenIds[i]).to.eq(+expectedTokenIds[i]);
//       }
//     });
//   });

//   describe("METHOD : WithdrawAll", async () => {
//     it("should withdraw the funds", async () => {
//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       const proof = merkle.tree.getHexProof(generateLeaf(user1.address));
//       await dropV2
//         .connect(user1)
//         .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
//           value: TEST_DATA.PRICE,
//         });

//       const anotherblockTreasury = await anotherblockV1.treasury();

//       const contractBalanceBefore = await ethers.provider.getBalance(
//         dropV2.address
//       );
//       const treasuryBalanceBefore = await ethers.provider.getBalance(
//         anotherblockTreasury
//       );

//       await dropV2.connect(owner).withdrawAll();

//       const contractBalanceAfter = await ethers.provider.getBalance(
//         dropV2.address
//       );
//       const treasuryBalanceAfter = await ethers.provider.getBalance(
//         anotherblockTreasury
//       );

//       expect(contractBalanceBefore > contractBalanceAfter).to.equal(true);
//       expect(contractBalanceAfter).to.equal(0);
//       expect(treasuryBalanceAfter).to.equal(
//         treasuryBalanceBefore.add(contractBalanceBefore)
//       );
//     });
//   });

//   describe("METHOD : price", async () => {
//     it("should return the price of a token", async () => {
//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       expect(await dropV2.price(0)).to.equal(TEST_DATA.PRICE);
//     });
//   });

//   describe("METHOD : unclaimedSupply", async () => {
//     it("should return the remaining supply for a drop", async () => {
//       await anotherblockV1.create(
//         TEST_DATA.ZERO_ADDRESS,
//         rightHolder.address,
//         dropV2.address,
//         TEST_DATA.PRICE,
//         TEST_DATA.SUPPLY,
//         TEST_DATA.ROYALTY_SHARE,
//         TEST_DATA.RIGHTHOLDER_FEE,
//         [
//           TEST_DATA.MAX_PRIVATE_SALE,
//           TEST_DATA.PRIVATE_SALE_TIME,
//           TEST_DATA.MAX_PUBLIC_SALE,
//           TEST_DATA.PUBLIC_SALE_TIME,
//         ],
//         merkle.tree.getRoot()
//       );

//       expect(await dropV2.unclaimedSupply(0)).to.equal(TEST_DATA.SUPPLY);

//       const proof = merkle.tree.getHexProof(generateLeaf(user1.address));
//       await dropV2
//         .connect(user1)
//         .mint(user1.address, 0, TEST_DATA.MINT_QUANTITY, proof, {
//           value: TEST_DATA.PRICE,
//         });

//       expect(await dropV2.unclaimedSupply(0)).to.equal(
//         TEST_DATA.SUPPLY - TEST_DATA.MINT_QUANTITY
//       );
//     });
//   });

//   describe("METHOD : setAnotherblock", async () => {
//     before(async () => {
//       // Deploy another instance of ABDropManager contract
//       const AnotherBlockV1 = await ethers.getContractFactory("ABDropManager");
//       anotherblockV1_2 = (await upgrades.deployProxy(
//         AnotherBlockV1,
//         [treasury.address],
//         { initializer: "initialize" }
//       )) as ABDropManager;
//       await anotherblockV1_2.deployed();
//     });

//     it("should be able to update anotherblock address)", async () => {
//       await dropV2.connect(owner).setAnotherblock(anotherblockV1_2.address);

//       // Check that anotherblock address is updated
//       expect(await dropV2.anotherblock()).to.eq(anotherblockV1_2.address);
//     });

//     it("should not be able to update anotherblock address (incorrect interface))", async () => {
//       await expect(
//         dropV2.connect(owner).setAnotherblock(user2.address)
//       ).to.be.revertedWith("IncorrectInterface");
//     });

//     it("should not be able to update anotherblock address (not owner)", async () => {
//       // Check that the transaction revert as the user is not granted with ADMIN_ROLE
//       await expect(
//         dropV2.connect(user2).setAnotherblock(anotherblockV1_2.address)
//       ).to.be.revertedWith("Ownable: caller is not the owner");
//     });
//   });
// });
