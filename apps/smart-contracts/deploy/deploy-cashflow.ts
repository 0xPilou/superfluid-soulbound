import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { getFramework } from '../utils/sf-utils';

const name = 'Cashflow';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const sf = await getFramework();
  const daix = await sf.loadSuperToken('fDAIx');
  const deployment = await deploy(name, {
    from: deployer,
    args: [sf.host.contract.address, daix.address],
  });

  deployments.log(`Contract ${name} deployed at ${deployment.address}`);
};

func.tags = [name];
func.skip = async (env) => env.network.name !== 'optimismGoerli';

export default func;
