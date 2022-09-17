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
    .mint(deployer.address, ethers.utils.parseEther("100000"), "0x");

  const createFlowOperation = sf.cfaV1.createFlow({
    receiver: CashflowDeployment.address,
    superToken: SuperSoulboundDeployment.address,
    flowRate: ethers.utils.parseEther("0.1").toString(),
  });
  const txn = await createFlowOperation.exec(deployer);
  const res = await txn.wait();

  console.log("Flow Created : ", res);
  return;
};

main();
