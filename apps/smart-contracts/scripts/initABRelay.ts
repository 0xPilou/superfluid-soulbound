import { ethers } from "ethers";
import hre from "hardhat";
import ABRelayDeployment from "web3-config/deployments/optimismGoerli/ABRelay.json";
import ABStreamDeployment from "web3-config/deployments/optimismGoerli/ABStream.json";
import NFTDeployment from "web3-config/deployments/goerli/MyNFT.json";

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  const ABRelay = new ethers.Contract(
    ABRelayDeployment.address,
    ABRelayDeployment.abi,
    deployer
  );
  const abRelay = await ABRelay.deployed();

  let tx = await abRelay
    .connect(deployer)
    .grantAllowance(NFTDeployment.address);
  await tx.wait();

  console.log(
    `ABRelay : Granted allowance to write message to address : ${NFTDeployment.address}`
  );

  tx = await abRelay.connect(deployer).setABStream(ABStreamDeployment.address);
  await tx.wait();

  console.log(
    `ABRelay : Set ABStream address to : ${ABStreamDeployment.address}`
  );

  return;
};

main();
