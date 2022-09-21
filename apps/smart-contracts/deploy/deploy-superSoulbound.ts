import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { STORE_NAME, SUPERSOULBOUND_NAME } from "../deploy-constants";

const SF_HOST_ADDRESS = "0xE40983C2476032A0915600b9472B3141aA5B5Ba9";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const deployment = await deploy(SUPERSOULBOUND_NAME, {
    from: deployer,
    args: [SF_HOST_ADDRESS],
  });

  deployments.log(
    `Contract ${SUPERSOULBOUND_NAME} deployed at ${deployment.address}`
  );

  const superSoulbound = await hre.ethers.getContractAt(
    SUPERSOULBOUND_NAME,
    deployment.address
  );

  await superSoulbound.initialize(ZERO_ADDRESS, 0, "SuperSoulboundV1", "SBV1x");
};

func.tags = [SUPERSOULBOUND_NAME];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;
