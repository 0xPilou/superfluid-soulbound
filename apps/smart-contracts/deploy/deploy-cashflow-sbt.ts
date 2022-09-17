import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import { CASHFLOW_NAME, SUPERSOULBOUND_NAME } from "../deploy-constants";

import { getFramework } from "../utils/sf-utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const sf = await getFramework();
  const supertoken = await deployments.get(SUPERSOULBOUND_NAME);

  const deployment = await deploy(CASHFLOW_NAME, {
    from: deployer,
    args: [sf.host.contract.address, supertoken.address],
  });

  deployments.log(
    `Contract ${CASHFLOW_NAME} deployed at ${deployment.address}`
  );

  const sbt = await hre.ethers.getContractAt(
    SUPERSOULBOUND_NAME,
    supertoken.address
  );

  await sbt
    .connect(deployer)
    .mint(deployment.address, hre.ethers.utils.parseEther("100000"), "0x");

  deployments.log(
    `Contract ${CASHFLOW_NAME} deployed at ${deployment.address}`
  );
};

func.tags = [CASHFLOW_NAME];
func.dependencies = [SUPERSOULBOUND_NAME];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;
