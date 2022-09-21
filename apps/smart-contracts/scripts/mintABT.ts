import { ethers } from "ethers";
import hre from "hardhat";
import CashflowDeployment from "web3-config/deployments/optimismGoerli/Cashflow.json";
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
    .mint(CashflowDeployment.address, ethers.utils.parseEther("1000000000"));

  console.log(
    `Minted 1.000.000.000 ABT to Cashflow contract at ${CashflowDeployment.address}`
  );
  return;
};

main();
