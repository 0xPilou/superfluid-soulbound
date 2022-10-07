import { chain, useAccount, useBalance } from "wagmi";
import { getAddress } from "web3-config";

const BalanceView = () => {
  const { address } = useAccount();

  const { data: abtUserBalance } = useBalance({
    addressOrName: address,
    watch: true,
    token: getAddress(chain.optimismGoerli.id, "ABToken"),
  });

  const { data: ethUserBalance } = useBalance({
    addressOrName: address,
    watch: true,
  });

  const { data: abtContractBalance } = useBalance({
    addressOrName: getAddress(chain.optimismGoerli.id, "ABStream"),
    watch: true,
    token: getAddress(chain.optimismGoerli.id, "ABToken"),
  });

  return (
    <div style={{ marginBottom: "5%" }}>
      <h1>Balances 💰 </h1>
      <div>
        <div>
          <h2>Streaming Contract : </h2>
          <p>{abtContractBalance?.formatted || null} ABT</p>
        </div>
        <div>
          <h2>User : </h2>
          <div>{abtUserBalance?.formatted || null} ABT</div>
          <div>{ethUserBalance?.formatted || null} ETH</div>
        </div>
      </div>
    </div>
  );
};

export default BalanceView;
