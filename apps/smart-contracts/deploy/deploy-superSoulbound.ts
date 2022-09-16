import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const name = "SuperSoulbound";

const superTokenFactory = "0x9aCc39d15e3f168c111a1D4F80271a9E526c9a9F";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const store = await deployments.get("Store");

  const deployment = await deploy(name, {
    from: deployer,
    args: [store.address],
  });

  deployments.log(`Contract ${name} deployed at ${deployment.address}`);

  const superSoulbound = await hre.ethers.getContractAt(
    name,
    deployment.address
  );

  await superSoulbound.initialize(
    "FakeSuperSoulBound #0",
    "fSB0x",
    ethers.utils.getAddress(superTokenFactory)
  );
};

func.tags = [name];
func.skip = async (env) => env.network.name !== "optimismGoerli";
func.dependencies = ["Store"];

export default func;
