import { ethers } from "ethers";
import hre from "hardhat";
import ABStreamDeployment from "web3-config/deployments/optimismGoerli/ABStream.json";
import ABTokenDeployment from "web3-config/deployments/optimismGoerli/ABToken.json";

const main = async () => {
  console.log(
    `-------------------------------- INIT ABStream --------------------------------`
  );
  const [deployer] = await hre.ethers.getSigners();

  const ABStream = new ethers.Contract(
    ABStreamDeployment.address,
    ABStreamDeployment.abi,
    deployer
  );
  const abStream = await ABStream.deployed();

  if ((await abStream.getABToken()) != ABTokenDeployment.address) {
    const tx = await abStream
      .connect(deployer)
      .setABToken(ABTokenDeployment.address);
    await tx.wait();

    console.log(
      `ABStream : set ABToken address to : ${ABTokenDeployment.address}`
    );
  } else {
    console.log(`ABStream : ABToken address not updated`);
  }

  console.log(
    `------------------------------------------------------------------------------`
  );
  return;
};

main();
