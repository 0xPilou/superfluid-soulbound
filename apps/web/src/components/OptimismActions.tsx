import { ethers } from "ethers";
import { chain, useAccount, useBalance } from "wagmi";
import { useContractRead } from "wagmi-lfg";
import { Cashflow__factory, getAddress, getAbi } from "web3-config";

const OptimismActions = () => {
  const { address } = useAccount();

  const { data: sbtxBalance } = useBalance({
    addressOrName: address,
    watch: true,
    token: getAddress(chain.optimismGoerli.id, "SuperSoulbound"),
  });

  const { data: flow } = useContractRead(Cashflow__factory, "getFlow", {
    args: [address],
  });

  const flowRate = flow && flow[1];

  return (
    <div>
      <h1>Balance : </h1>
      <div>{sbtxBalance?.formatted || null} SBTx</div>

      {flowRate && (
        <div>Flow rate from chain: {ethers.utils.formatEther(flowRate)}</div>
      )}
    </div>
  );
};

export default OptimismActions;
