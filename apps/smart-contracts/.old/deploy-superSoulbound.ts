import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { STORE_NAME, SUPERSOULBOUND_NAME } from "../deploy-constants";

const superTokenFactory = "0x9aCc39d15e3f168c111a1D4F80271a9E526c9a9F";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const store = await deployments.get(STORE_NAME);

  const deployment = await deploy(SUPERSOULBOUND_NAME, {
    from: deployer,
    args: [store.address],
  });

  deployments.log(`Contract ${SUPERSOULBOUND_NAME} deployed at ${deployment.address}`);

  const superSoulbound = await hre.ethers.getContractAt(
    SUPERSOULBOUND_NAME,
    deployment.address
  );

  await superSoulbound.initialize(
    "FakeSuperSoulBound #0",
    "fSB0x",
    ethers.utils.getAddress(superTokenFactory)
  );
};

func.tags = [SUPERSOULBOUND_NAME];
func.dependencies = [STORE_NAME];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;
