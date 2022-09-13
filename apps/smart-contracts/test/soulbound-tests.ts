import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai from "chai";
import { ethers } from "hardhat";

import { Soulbound } from "../typechain";

const { expect } = chai;

describe("Soulbound", () => {
  let soulbound: Soulbound;

  let owner: SignerWithAddress;
  let minter: SignerWithAddress;
  let burner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let addrs: SignerWithAddress[];

  beforeEach(async () => {
    [owner, minter, burner, user1, user2, ...addrs] = await ethers.getSigners();

    const Soulbound = await ethers.getContractFactory("Soulbound");

    soulbound = (await Soulbound.deploy()) as Soulbound;

    const minter_role = await soulbound.MINTER();
    const burner_role = await soulbound.BURNER();
    await soulbound.connect(owner).grantRole(minter_role, minter.address);
    await soulbound.connect(owner).grantRole(burner_role, burner.address);
  });

  describe("METHOD : mint", async () => {
    it("should mint SBT token to user", async () => {
      await soulbound
        .connect(minter)
        .mint(user1.address, ethers.utils.parseEther("1"));
      expect(await soulbound.balanceOf(user1.address)).to.eq(
        ethers.utils.parseEther("1")
      );
    });

    it("should not be able to mint SBT token to self", async () => {
      await expect(
        soulbound
          .connect(user1)
          .mint(user1.address, ethers.utils.parseEther("1"))
      ).to.be.reverted;
    });

    it("should not be able to mint SBT token to another user", async () => {
      await expect(
        soulbound
          .connect(user1)
          .mint(user2.address, ethers.utils.parseEther("1"))
      ).to.be.reverted;
    });
  });

  describe("METHOD : transfer", async () => {
    before(async () => {
      await soulbound
        .connect(minter)
        .mint(user1.address, ethers.utils.parseEther("10"));
    });

    it("should not be able to transfer SBT token to another user", async () => {
      await expect(
        soulbound
          .connect(user1)
          .transfer(user2.address, ethers.utils.parseEther("5"))
      ).to.be.revertedWith("NOT_TRANSFERABLE");
    });
  });

  describe("METHOD : transferFrom", async () => {
    before(async () => {
      await soulbound
        .connect(minter)
        .mint(user1.address, ethers.utils.parseEther("10"));
    });
    it("should not be able to transfer SBT token from another user (even if approved)", async () => {
      await soulbound
        .connect(user1)
        .approve(user2.address, ethers.utils.parseEther("2"));
      await expect(
        soulbound
          .connect(user2)
          .transferFrom(
            user1.address,
            user2.address,
            ethers.utils.parseEther("1")
          )
      ).to.be.revertedWith("NOT_TRANSFERABLE");
    });
  });

  describe("METHOD : burn", async () => {
    beforeEach(async () => {
      await soulbound
        .connect(minter)
        .mint(user1.address, ethers.utils.parseEther("10"));
    });
    it("should burn SBT token from user", async () => {
      await soulbound
        .connect(burner)
        .burn(user1.address, ethers.utils.parseEther("1"));
      expect(await soulbound.balanceOf(user1.address)).to.eq(
        ethers.utils.parseEther("9")
      );
    });

    it("should not be able to burn SBT token from self", async () => {
      await expect(
        soulbound
          .connect(user1)
          .burn(user1.address, ethers.utils.parseEther("1"))
      ).to.be.reverted;
    });

    it("should not be able to burn SBT token from another user", async () => {
      await expect(
        soulbound
          .connect(user1)
          .burn(user2.address, ethers.utils.parseEther("1"))
      ).to.be.reverted;
    });
  });
});
