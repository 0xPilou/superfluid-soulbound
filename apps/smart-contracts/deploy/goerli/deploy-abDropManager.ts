import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { AB_DROP_MANAGER_NAME } from "../../deploy-constants";
import ABRelayDeployment from "web3-config/deployments/optimismGoerli/ABRelay.json";

const L2_MESSENGER_ADDR = "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  // const deployment = await deploy(AB_DROP_MANAGER_NAME, {
  //   from: deployer,
  //   proxy: {
  //     proxyContract: "OpenZeppelinTransparentProxy",
  //     execute: {
  //       methodName: "initialize",
  //       args: [deployer, L2_MESSENGER_ADDR, ABRelayDeployment.address],
  //     },
  //   },
  // });

  const deployment = await deploy(AB_DROP_MANAGER_NAME, {
    from: deployer,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        methodName: "initialize",
        args: [deployer],
      },
    },
  });

  deployments.log("");
  deployments.log(
    "------------------------------------------------------------------------------------------------------------------------------"
  );
  deployments.log(
    `Contract ${AB_DROP_MANAGER_NAME} deployed at ${deployment.address} on Goerli`
  );
  deployments.log("");
  deployments.log(`npx hardhat verify --network goerli ${deployment.address}`);
  deployments.log(
    "------------------------------------------------------------------------------------------------------------------------------"
  );
};

func.tags = [AB_DROP_MANAGER_NAME, "DEPLOY"];
func.skip = async (env) => env.network.name !== "goerli";

export default func;
