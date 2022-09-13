import { Framework, WrapperSuperToken } from '@superfluid-finance/sdk-core';
import { ethers } from 'ethers';
import hre from 'hardhat';
// import CashflowDeployment from 'web3-config/deployments/optimismKovan/Cashflow.json';
import { getFramework } from '../utils/sf-utils';
import CashflowDeployment from 'web3-config/deployments/optimismGoerli/Cashflow.json';

const daiABI = [
  'function mint(address to,uint256 amount) returns (bool)',
  'function approve(address,uint256) returns (bool)',
];

const main = async () => {
  // @ts-ignore
  const sf = await getFramework();
  const daix = (await sf.loadSuperToken('fDAIx')) as any as WrapperSuperToken;
  const daiAddress = daix?.underlyingToken?.address;
  const [deployer] = await hre.ethers.getSigners();

  if (!daiAddress) {
    throw new Error('Missing daix');
  }
  const dai = new ethers.Contract(daiAddress, daiABI, deployer);

  await dai
    .connect(deployer)
    .mint(deployer.address, ethers.utils.parseEther('1000000'));

  await dai
    .connect(deployer)
    .approve(daix.address, ethers.utils.parseEther('1000000'));

  const daixUpgradeOperation = await daix.upgrade({
    amount: ethers.utils.parseEther('1000000').toString(),
  });

  await daixUpgradeOperation.exec(deployer);
  const createFlowOperation = sf.cfaV1.createFlow({
    receiver: CashflowDeployment.address,
    superToken: daix.address,
    flowRate: '100000000',
  });
  const txn = await createFlowOperation.exec(deployer);
  const res = await txn.wait();

  console.log(':::daix.address', daix.address);
  console.log('approve', res);
  return;
};

main();
