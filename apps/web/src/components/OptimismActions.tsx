import { BigNumber, ethers } from "ethers";
import { Interface } from "ethers/lib/utils";
import {
  chain,
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
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

  const { config: redeemConfig } = usePrepareContractWrite({
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "redeem",
    args: ["0", "1"],
  });

  const {
    data: dataRedeem,
    isLoading: isLoadingRedeem,
    isSuccess: isSuccessRedeem,
    write: redeem,
  } = useContractWrite(redeemConfig);

  return (
    <div>
      <div>Balances : </div>
      <div>{sbtxBalance?.formatted || null} SBTx</div>

      {flowRate && (
        <div>flowRate from chain: {ethers.utils.formatEther(flowRate)}</div>
      )}

      <button disabled={!redeem || isLoadingRedeem} onClick={() => redeem()}>
        Redeem
      </button>
    </div>
  );
};

export default OptimismActions;
