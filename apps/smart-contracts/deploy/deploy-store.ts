import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { AB_STORE_NAME } from "../deploy-constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const deployment = await deploy(AB_STORE_NAME, {
    from: deployer,
    args: [],
  });

  deployments.log(
    `Contract ${AB_STORE_NAME} deployed at ${deployment.address} on Optimism Goerli`
  );

  deployments.log("");
  deployments.log(
    "-------------------------------------------- CONTRACT VERIFICATION COMMAND ---------------------------------------------------"
  );
  deployments.log(
    `npx hardhat verify --network optimismGoerli ${deployment.address}`
  );
  deployments.log(
    "------------------------------------------------------------------------------------------------------------------------------"
  );
  deployments.log("");
};

func.tags = [AB_STORE_NAME];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;
