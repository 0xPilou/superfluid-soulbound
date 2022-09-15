import { BigNumber, ethers } from "ethers";
import { Interface } from "ethers/lib/utils";
import {
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useContractRead } from "wagmi-lfg";
import { Cashflow__factory } from "web3-config";
import Balance from "./Balance";

const OptimismActions = () => {
  const { address } = useAccount();

  const { data: sbtxBalance } = useBalance({
    addressOrName: address,
    watch: true,
    token: "0xCa25549ca1eB0c10DdAf81877B359CF4959f615E", //SBTx
  });

  const { data: flow } = useContractRead(Cashflow__factory, "getFlow", {
    args: [
      ethers.utils.getAddress("0x1F0Ec748dc3994629e32Eb1223a52D5aE8E8f90e"),
    ],
  });

  const flowRate = flow && flow[1];

  const { config, ...rest } = usePrepareContractWrite({
    addressOrName: "0xaC7A5cf2E0A6DB31456572871Ee33eb6212014a9",
    contractInterface: new Interface(["function downgrade(uint256 amount)"]),
    functionName: "downgrade",
    args: [sbtxBalance?.value.sub(1)],
    enabled: Boolean(sbtxBalance?.value),
  });

  const { data, isLoading, isSuccess, write, ...rest2 } =
    useContractWrite(config);

  return (
    <div>
      <div>Balances : </div>
      <div>{sbtxBalance?.formatted || null} SBTx</div>

      {flowRate && (
        <div>flowRate from chain: {ethers.utils.formatEther(flowRate)}</div>
      )}

      <button disabled={!write || isLoading} onClick={() => write()}>
        convert to DAI
      </button>
    </div>
  );
};

export default OptimismActions;
