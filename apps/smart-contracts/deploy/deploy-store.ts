import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { STORE_NAME } from "../deploy-constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const deployment = await deploy(STORE_NAME, {
    from: deployer,
    args: [],
  });

  deployments.log(`Contract ${STORE_NAME} deployed at ${deployment.address}`);
};

func.tags = [STORE_NAME];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;