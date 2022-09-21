import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { STORE_NAME, ABTOKEN_NAME } from "../deploy-constants";

const SF_HOST_ADDRESS = "0xE40983C2476032A0915600b9472B3141aA5B5Ba9";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const store = await deployments.get(STORE_NAME);

  const deployment = await deploy(ABTOKEN_NAME, {
    from: deployer,
    args: [store.address, SF_HOST_ADDRESS],
  });

  deployments.log(`Contract ${ABTOKEN_NAME} deployed at ${deployment.address}`);

  const abToken = await hre.ethers.getContractAt(
    ABTOKEN_NAME,
    deployment.address
  );

  await abToken.initialize(ZERO_ADDRESS, 0, "ABToken", "ABT");
};

func.tags = [ABTOKEN_NAME];
func.dependencies = [STORE_NAME];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;