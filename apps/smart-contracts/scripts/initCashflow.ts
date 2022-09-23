import { ethers } from "ethers";
import hre from "hardhat";
import CashflowDeployment from "web3-config/deployments/optimismGoerli/Cashflow.json";
import ABTokenDeployment from "web3-config/deployments/optimismGoerli/ABToken.json";

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  const Cashflow = new ethers.Contract(
    CashflowDeployment.address,
    CashflowDeployment.abi,
    deployer
  );
  const cashflow = await Cashflow.deployed();

  if ((await cashflow.getAcceptedToken()) != ABTokenDeployment.address) {
    const tx = await cashflow
      .connect(deployer)
      .setAcceptedToken(ABTokenDeployment.address);
    await tx.wait();

    console.log(
      `Cashflow Contract accepted token set to : ${ABTokenDeployment.address}`
    );
  } else {
    console.log(`Cashflow Contract accepted token not updateds`);
  }
  return;
};

main();
