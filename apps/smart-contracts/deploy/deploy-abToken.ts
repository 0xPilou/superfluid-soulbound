import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { STORE_NAME, ABTOKEN_NAME, CASHFLOW_NAME } from "../deploy-constants";
import { network } from "hardhat";

const SF_HOST_ADDRESS = "0xE40983C2476032A0915600b9472B3141aA5B5Ba9";
const SF_CFA_ADDRESS = "0xff48668fa670A85e55A7a822b352d5ccF3E7b18C";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const store = await deployments.get(STORE_NAME);
  const cashflow = await deployments.get(CASHFLOW_NAME);

  const deployment = await deploy(ABTOKEN_NAME, {
    from: deployer,
    args: [store.address, SF_HOST_ADDRESS, SF_CFA_ADDRESS, cashflow.address],
  });

  deployments.log(`Contract ${ABTOKEN_NAME} deployed at ${deployment.address} on Optimism Goerli`);

  const abToken = await hre.ethers.getContractAt(
    ABTOKEN_NAME,
    deployment.address
  );

  await abToken.initialize(ZERO_ADDRESS, 0, "ABToken", "ABT");
};

func.tags = [ABTOKEN_NAME];
func.dependencies = [STORE_NAME, CASHFLOW_NAME];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;
