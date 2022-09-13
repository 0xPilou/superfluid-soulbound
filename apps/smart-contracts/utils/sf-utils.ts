import { Framework } from '@superfluid-finance/sdk-core';
import { ethers } from 'ethers';

const kovanOptimismResolver = '0x218B65780615Ff134f9Ad810CB98839534D3C0D6';
const goerliOptimismResolver = '0x21d4E9fbB9DB742E6ef4f29d189a7C18B0b59136';

export const getFramework = async (): Promise<Framework> => {
  // const url = 'https://kovan.optimism.io';
  const url = 'https://goerli.optimism.io';
  const httpProvider = new ethers.providers.JsonRpcProvider(url);
  const sf = await Framework.create({
    provider: httpProvider,
    chainId: 420,
    resolverAddress: goerliOptimismResolver,
  });

  return sf;
};
