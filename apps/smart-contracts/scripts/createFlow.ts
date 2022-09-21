import { ethers } from "ethers";
import hre from "hardhat";
import CashflowDeployment from "web3-config/deployments/optimismGoerli/Cashflow.json";
import ABTokenDeployment from "web3-config/deployments/optimismGoerli/ABToken.json";

import { getFramework } from "../utils/sf-utils";

const main = async () => {
  const sf = await getFramework();
  const [deployer] = await hre.ethers.getSigners();

  const createFlowOperation = sf.cfaV1.createFlow({
    receiver: CashflowDeployment.address,
    superToken: ABTokenDeployment.address,
    flowRate: ethers.utils.parseEther("0.1").toString(),
  });
  const txn = await createFlowOperation.exec(deployer);
  const res = await txn.wait();

  console.log("Flow Created : ", res);
  return;
};

main();
