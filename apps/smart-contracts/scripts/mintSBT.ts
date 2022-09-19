import { ethers } from "ethers";
import hre from "hardhat";
import CashflowDeployment from "web3-config/deployments/optimismGoerli/Cashflow.json";
import SuperSoulboundDeployment from "web3-config/deployments/optimismGoerli/SuperSoulbound.json";

import { getFramework } from "../utils/sf-utils";

const main = async () => {
  const sf = await getFramework();
  const [deployer] = await hre.ethers.getSigners();

  const sbt = new ethers.Contract(
    SuperSoulboundDeployment.address,
    SuperSoulboundDeployment.abi,
    deployer
  );

  await sbt
    .connect(deployer)
    .mint(
      CashflowDeployment.address,
      ethers.utils.parseEther("1000000000"),
      "0x"
    );

  console.log(
    `Minted 1.000.000.000 SBTx to Cashflow contract at ${CashflowDeployment.address}`
  );
  return;
};

main();
