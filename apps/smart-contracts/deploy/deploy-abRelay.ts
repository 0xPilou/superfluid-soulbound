import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { AB_RELAY_NAME } from "../deploy-constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const deployment = await deploy(AB_RELAY_NAME, {
    from: deployer,
    args: [],
  });

  deployments.log(
    `Contract ${AB_RELAY_NAME} deployed at ${deployment.address} on Optimism Goerli`
  );
};

func.tags = [AB_RELAY_NAME];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;
