import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {
  AB_STORE_NAME,
  AB_TOKEN_NAME,
  AB_STREAM_NAME,
} from "../deploy-constants";

const SF_HOST_ADDRESS = "0xE40983C2476032A0915600b9472B3141aA5B5Ba9";
const SF_CFA_ADDRESS = "0xff48668fa670A85e55A7a822b352d5ccF3E7b18C";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const abStore = await deployments.get(AB_STORE_NAME);
  const abStream = await deployments.get(AB_STREAM_NAME);

  const deployment = await deploy(AB_TOKEN_NAME, {
    from: deployer,
    args: [abStore.address, SF_HOST_ADDRESS, SF_CFA_ADDRESS, abStream.address],
  });

  deployments.log(
    `Contract ${AB_TOKEN_NAME} deployed at ${deployment.address} on Optimism Goerli`
  );

  const abToken = await hre.ethers.getContractAt(
    AB_TOKEN_NAME,
    deployment.address
  );

  await abToken.initialize(ZERO_ADDRESS, 0, "ABToken", "ABT");

  deployments.log("");
  deployments.log(
    "-------------------------------------------- CONTRACT VERIFICATION COMMAND ---------------------------------------------------"
  );
  deployments.log(
    `npx hardhat verify --network optimismGoerli ${deployment.address} ${abStore.address} ${SF_HOST_ADDRESS} ${SF_CFA_ADDRESS} ${abStream.address}`
  );
  deployments.log(
    "------------------------------------------------------------------------------------------------------------------------------"
  );
  deployments.log("");
};

func.tags = [AB_TOKEN_NAME];
func.dependencies = [AB_STORE_NAME, AB_STREAM_NAME];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;
