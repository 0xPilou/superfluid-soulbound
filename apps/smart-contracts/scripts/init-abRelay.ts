import { ethers } from "ethers";
import hre from "hardhat";
import ABRelayDeployment from "web3-config/deployments/optimismGoerli/ABRelay.json";
import ABStreamDeployment from "web3-config/deployments/optimismGoerli/ABStream.json";
import ABRegistryDeployment from "web3-config/deployments/optimismGoerli/ABRegistry.json";
import ABNFTDeployment from "web3-config/deployments/goerli/ABNFT.json";
import ABDropManagerDeployment from "web3-config/deployments/goerli/ABDropManager.json";

const main = async () => {
  console.log(
    `-------------------------------- INIT ABRelay --------------------------------`
  );

  const [deployer] = await hre.ethers.getSigners();

  const ABRelay = new ethers.Contract(
    ABRelayDeployment.address,
    ABRelayDeployment.abi,
    deployer
  );
  const abRelay = await ABRelay.deployed();

  let tx = await abRelay
    .connect(deployer)
    .grantAllowance(ABNFTDeployment.address);
  await tx.wait();

  console.log(
    `ABRelay : Granted allowance to write message to address : ${ABNFTDeployment.address}`
  );

  tx = await abRelay
    .connect(deployer)
    .grantAllowance(ABDropManagerDeployment.address);
  await tx.wait();

  console.log(
    `ABRelay : Granted allowance to write message to address : ${ABDropManagerDeployment.address}`
  );

  tx = await abRelay.connect(deployer).setABStream(ABStreamDeployment.address);
  await tx.wait();

  console.log(
    `ABRelay : Set ABStream address to : ${ABStreamDeployment.address}`
  );

  tx = await abRelay
    .connect(deployer)
    .setABRegistry(ABRegistryDeployment.address);
  await tx.wait();

  console.log(
    `ABRelay : Set ABRegistry address to : ${ABRegistryDeployment.address}`
  );

  console.log(
    `------------------------------------------------------------------------------`
  );

  return;
};

main();
