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

  await cashflow._setAllowedId("0x1F0Ec748dc3994629e32Eb1223a52D5aE8E8f90e");
  return;
};

main();
