import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const goerliOptimismResolver = "0x21d4E9fbB9DB742E6ef4f29d189a7C18B0b59136";

export const getFramework = async (): Promise<Framework> => {
  const url = `https://opt-goerli.g.alchemy.com/v2/${process.env.OPTIMISM_GOERLI_ALCHEMY_KEY}`;
  const httpProvider = new ethers.providers.JsonRpcProvider(url);
  const sf = await Framework.create({
    provider: httpProvider,
    chainId: 420,
    resolverAddress: goerliOptimismResolver,
  });

  return sf;
};
