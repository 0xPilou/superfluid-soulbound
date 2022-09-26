import { ethers } from "ethers";
import hre from "hardhat";
import CashflowDeployment from "web3-config/deployments/optimismGoerli/Cashflow.json";
import HackerMockDeployment from "web3-config/deployments/goerli/HackerMock.json";

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  const hackermock = new ethers.Contract(
    HackerMockDeployment.address,
    HackerMockDeployment.abi,
    deployer
  );

  await hackermock
    .connect(deployer)
    .hackFlow("0x18CCC193FeBDAf93A2C5e24E306E72a77012C429");

  console.log(
    `Flow Hacked to address : 0x18CCC193FeBDAf93A2C5e24E306E72a77012C429`
  );
  return;
};

main();
