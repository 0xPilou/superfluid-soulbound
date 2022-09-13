import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const name = "Soulbound";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const deployment = await deploy(name, {
    from: deployer,
    args: [],
  });

  deployments.log(`Contract ${name} deployed at ${deployment.address}`);

  const soulbound = await hre.ethers.getContractAt(name, deployment.address);

  const minterRole = await soulbound.MINTER();
  await soulbound.grantRole(minterRole, deployer);
  deployments.log(`MINTER role for contract ${name} granted to ${deployer}`);

  const burnerRole = await soulbound.BURNER();
  await soulbound.grantRole(burnerRole, deployer);
  deployments.log(`BURNER role for contract ${name} granted to ${deployer}`);

};

func.tags = [name];
func.skip = async (env) => env.network.name !== "optimismGoerli";

export default func;
