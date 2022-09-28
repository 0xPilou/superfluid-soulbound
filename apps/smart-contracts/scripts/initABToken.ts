import { ethers } from "ethers";
import hre from "hardhat";
import ABStreamDeployment from "web3-config/deployments/optimismGoerli/ABStream.json";
import ABTokenDeployment from "web3-config/deployments/optimismGoerli/ABToken.json";

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  const abt = new ethers.Contract(
    ABTokenDeployment.address,
    ABTokenDeployment.abi,
    deployer
  );

  await abt
    .connect(deployer)
    .mint(ABStreamDeployment.address, ethers.utils.parseEther("1000000000"));

  console.log(
    `ABToken : Minted 1.000.000.000 ABT to ABStream contract at ${ABStreamDeployment.address}`
  );
  return;
};

main();
