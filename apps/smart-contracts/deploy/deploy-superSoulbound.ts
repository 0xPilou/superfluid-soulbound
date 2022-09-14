import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const name = "SuperSoulbound";

const superTokenFactory = "0x9aCc39d15e3f168c111a1D4F80271a9E526c9a9F";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const deployment = await deploy(name, {
    from: deployer,
    args: [],
  });

  deployments.log(`Contract ${name} deployed at ${deployment.address}`);

  const superSoulbound = await hre.ethers.getContractAt(
    name,
    deployment.address
  );

  const minterRole = await superSoulbound.MINTER();
  await superSoulbound.grantRole(minterRole, deployer);
  deployments.log(`MINTER role for contract ${name} granted to ${deployer}`);

  const burnerRole = await superSoulbound.BURNER();
  await superSoulbound.grantRole(burnerRole, deployer);
  deployments.log(`BURNER role for contract ${name} granted to ${deployer}`);

  await superSoulbound.initialize(
    "FakeSuperSoulBound #0",
    "fSB0x",
    ethers.utils.getAddress(superTokenFactory)
  );
};

func.tags = [name];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;
