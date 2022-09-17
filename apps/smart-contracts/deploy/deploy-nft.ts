import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import CashflowDeployment from "web3-config/deployments/optimismGoerli/Cashflow.json";

const name = "MyNFT";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  const cashflowOnOptimism = CashflowDeployment.address;

  const erc20Symbol = "NFT0";
  const erc20Name = "NFT #0";
  const domainManagerGoerli = "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294";

  const deployment = await deploy(name, {
    from: deployer,
    args: [
      erc20Name,
      erc20Symbol,
      domainManagerGoerli,
      cashflowOnOptimism,
      hre.ethers.utils.parseEther("0.1"),
    ],
  });

  deployments.log(`Contract ${name} deployed at ${deployment.address}`);
};

func.tags = [name];
func.skip = async (env) => env.network.name !== "goerli";

export default func;
