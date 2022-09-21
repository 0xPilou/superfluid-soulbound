import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import ABTokenDeployment from "web3-config/deployments/optimismGoerli/ABToken.json";

const goerliOptimismResolver = "0x21d4E9fbB9DB742E6ef4f29d189a7C18B0b59136";

const url = `https://opt-goerli.g.alchemy.com/v2/${process.env.OPTIMISM_GOERLI_ALCHEMY_KEY}`;
const provider = new ethers.providers.JsonRpcProvider(url);

const main = async () => {
  const sf = await Framework.create({
    provider: provider,
    chainId: 420,
    resolverAddress: goerliOptimismResolver,
  });

  const wallet = new ethers.Wallet(`${process.env.PKEY_2}`, provider);
  const signer = sf.createSigner({ signer: wallet });

  const createFlowOperation = sf.cfaV1.createFlow({
    receiver: "0x18CCC193FeBDAf93A2C5e24E306E72a77012C429",
    superToken: ABTokenDeployment.address,
    flowRate: ethers.utils.parseEther("0.01").toString(),
  });
  const txn = await createFlowOperation.exec(signer);
  const res = await txn.wait();

  console.log("Flow Created : ", res);
};

main();
