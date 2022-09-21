import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { CASHFLOW_NAME, ABTOKEN_NAME } from "../deploy-constants";
import { getFramework } from "../utils/sf-utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const sf = await getFramework();
  const abToken = await deployments.get(ABTOKEN_NAME);

  const deployment = await deploy(CASHFLOW_NAME, {
    from: deployer,
    args: [sf.host.contract.address, abToken.address],
  });

  deployments.log(
    `Contract ${CASHFLOW_NAME} deployed at ${deployment.address}`
  );
};

func.tags = [CASHFLOW_NAME];
func.dependencies = [ABTOKEN_NAME];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;
