import { ethers } from "ethers";
import hre from "hardhat";
import AnotherRelayDeployment from "web3-config/deployments/optimismGoerli/AnotherRelayDeployment.json";
import NFTDeployment from "web3-config/deployments/goerli/MyNFT.json";

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  const AnotherRelay = new ethers.Contract(
    AnotherRelayDeployment.address,
    AnotherRelayDeployment.abi,
    deployer
  );
  const anotherRelay = await AnotherRelay.deployed();

  const tx = await anotherRelay
    .connect(deployer)
    .grantAllowance(NFTDeployment.address);
  await tx.wait();

  console.log(
    `Another Relay granted allowance to write message to address : ${NFTDeployment.address}`
  );

  return;
};

main();
