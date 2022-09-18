import { ethers } from "ethers";
import { chain, useAccount, useBalance } from "wagmi";
import { useContractRead } from "wagmi-lfg";
import { Cashflow__factory, getAddress, getAbi } from "web3-config";

const OptimismActions = () => {
  const { address } = useAccount();

  const { data: sbtxUserBalance } = useBalance({
    addressOrName: address,
    watch: true,
    token: getAddress(chain.optimismGoerli.id, "SuperSoulbound"),
  });

  const { data: sbtxContractBalance } = useBalance({
    addressOrName: getAddress(chain.optimismGoerli.id, "Cashflow"),
    watch: true,
    token: getAddress(chain.optimismGoerli.id, "SuperSoulbound"),
  });

  const { data: flow } = useContractRead(Cashflow__factory, "getFlow", {
    args: [address],
  });

  const flowRate = flow && flow[1];

  return (
    <div>
      <h1>Balances 💰 </h1>
      <div style={{ display: "flex" }}>
        <div
          style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "3%" }}
        >
          <h2>Cashflow Contract : </h2>
          <p>{sbtxContractBalance?.formatted || null} SBTx</p>
        </div>
        <div
          style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "3%" }}
        >
          <h2>User : </h2>
          <div>{sbtxUserBalance?.formatted || null} SBTx</div>
        </div>
      </div>

      {flowRate && (
        <div>
          Flow rate from chain: {ethers.utils.formatEther(flowRate)} SBTx/s
        </div>
      )}
    </div>
  );
};

export default OptimismActions;
