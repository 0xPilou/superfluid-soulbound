import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import CashflowDeployment from 'web3-config/deployments/optimismGoerli/Cashflow.json';

const name = 'MyNFT';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  const cashflowOnOptimism = CashflowDeployment.address;

  const erc20Symbol = 'TEST';
  const erc20Name = 'test';
  const domainManagerGoerli = '0x5086d1eEF304eb5284A0f6720f79403b4e9bE294';

  const deployment = await deploy(name, {
    from: deployer,
    args: [
      erc20Name,
      erc20Symbol,
      domainManagerGoerli,
      cashflowOnOptimism,
      '100000000',
    ],
  });

  deployments.log(`Contract ${name} deployed at ${deployment.address}`);
};

func.tags = [name];
func.skip = async (env) => env.network.name !== 'goerli';

export default func;
