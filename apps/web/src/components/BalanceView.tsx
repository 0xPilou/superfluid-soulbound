import { chain, useAccount, useBalance } from "wagmi";
import { getAddress } from "web3-config";

const BalanceView = () => {
  const { address } = useAccount();

  const { data: sbtxUserBalance } = useBalance({
    addressOrName: address,
    watch: true,
    token: getAddress(chain.optimismGoerli.id, "ABToken"),
  });

  const { data: sbtxContractBalance } = useBalance({
    addressOrName: getAddress(chain.optimismGoerli.id, "ABStream"),
    watch: true,
    token: getAddress(chain.optimismGoerli.id, "ABToken"),
  });

  return (
    <div style={{ marginBottom: "5%" }}>
      <h1>Balances 💰 </h1>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
          <h2>Streaming Contract : </h2>
          <p>{sbtxContractBalance?.formatted || null} ABT</p>
        </div>
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
          <h2>User : </h2>
          <div>{sbtxUserBalance?.formatted || null} ABT</div>
        </div>
      </div>
    </div>
  );
};

export default BalanceView;
