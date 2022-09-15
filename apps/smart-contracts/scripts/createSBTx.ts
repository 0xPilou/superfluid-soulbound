import { ethers } from "ethers";
import hre from "hardhat";
import SoulboundDeployment from "web3-config/deployments/optimismGoerli/Soulbound.json";

const stfAddress = "0x9aCc39d15e3f168c111a1D4F80271a9E526c9a9F";

const stfABI = ["function createERC20Wrapper(address,uint8,string,string)"];

const main = async () => {
  const url = "https://goerli.optimism.io";
  const provider = new ethers.providers.JsonRpcProvider(url);

  const [deployer] = await hre.ethers.getSigners();

  const STF = new ethers.Contract(stfAddress, stfABI, provider);

  const stf = await STF.deployed();

  const soulboundAddress = SoulboundDeployment.address;

  const tx = await stf
    .connect(deployer)
    .createERC20Wrapper(
      ethers.utils.getAddress(soulboundAddress),
      1,
      "SuperSoulbound",
      "SBTx"
    );

  await tx.wait();
  const receipt = await provider.getTransactionReceipt(tx.hash);

  console.log(":::tx receipt : ", receipt);

  const SBTxAddress = receipt.logs[2].address;

  console.log("SuperSoulbound created at address : ", SBTxAddress);

  return;
};

main();

// SBTx Address : 0x2f5da54C79656c52e080042790C43e74437ecAa4
// (found from block explorer for now ?!)
