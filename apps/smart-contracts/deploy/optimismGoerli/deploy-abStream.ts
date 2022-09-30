import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {
  AB_REGISTRY_NAME,
  AB_RELAY_NAME,
  AB_STREAM_NAME,
} from "../../deploy-constants";

const SF_HOST_ADDRESS = "0xE40983C2476032A0915600b9472B3141aA5B5Ba9";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const abRelay = await deployments.get(AB_RELAY_NAME);
  const abRegistry = await deployments.get(AB_REGISTRY_NAME);

  const deployment = await deploy(AB_STREAM_NAME, {
    from: deployer,
    args: [SF_HOST_ADDRESS, abRelay.address, abRegistry.address],
  });
  deployments.log("");
  deployments.log(
    "------------------------------------------------------------------------------------------------------------------------------"
  );
  deployments.log(
    `Contract ${AB_STREAM_NAME} deployed at ${deployment.address} on Optimism Goerli`
  );
  deployments.log("");

  deployments.log(
    `npx hardhat verify --network optimismGoerli ${deployment.address} ${SF_HOST_ADDRESS} ${abRelay.address} ${abRegistry.address}`
  );
  deployments.log(
    "------------------------------------------------------------------------------------------------------------------------------"
  );
};

func.tags = [AB_STREAM_NAME];
func.dependencies = [AB_RELAY_NAME, AB_REGISTRY_NAME];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;
