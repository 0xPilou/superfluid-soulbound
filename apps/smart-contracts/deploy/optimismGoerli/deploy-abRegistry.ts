import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { AB_REGISTRY_NAME, AB_RELAY_NAME } from "../../deploy-constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const abRelay = await deployments.get(AB_RELAY_NAME);

  const deployment = await deploy(AB_REGISTRY_NAME, {
    from: deployer,
    args: [abRelay.address],
  });
  deployments.log("");
  deployments.log(
    "------------------------------------------------------------------------------------------------------------------------------"
  );
  deployments.log(
    `Contract ${AB_REGISTRY_NAME} deployed at ${deployment.address} on Optimism Goerli`
  );
  deployments.log("");

  deployments.log(
    `npx hardhat verify --network optimismGoerli ${deployment.address} ${abRelay.address}`
  );
  deployments.log(
    "------------------------------------------------------------------------------------------------------------------------------"
  );
};

func.tags = [AB_REGISTRY_NAME, "DEPLOY"];
func.dependencies = [AB_RELAY_NAME];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;
