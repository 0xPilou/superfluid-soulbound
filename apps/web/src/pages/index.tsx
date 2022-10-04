import { chain, useNetwork, useSwitchNetwork } from "wagmi";
import useIsMounted from "../hooks/useIsMounted";
import ConnectButton from "../components/ConnectButton";
import StoreView from "../components/StoreView";
import BalanceView from "../components/BalanceView";
import MintView from "../components/MintView";
import DataView from "../components/DataView";
import BoostDataView from "../components/BoostDataView";

const Page = () => {
  const { chain: activeChain } = useNetwork();

  const { switchNetwork } = useSwitchNetwork();
  const isOptimism = activeChain?.id === chain.optimismGoerli.id;
  const isGoerli = activeChain?.id === chain.goerli.id;
  const mounted = useIsMounted();
  if (!mounted) {
    return null;
  }

  return (
    <>
      <div style={{ display: "grid", gap: 20 }}>
        <header>
          <div style={{ float: "right" }}>
            <ConnectButton />
          </div>
        </header>
        <div>
          {!isOptimism && (
            <button onClick={() => switchNetwork(chain.optimismGoerli.id)}>
              Switch To Optimism
            </button>
          )}

          {!isGoerli && (
            <button onClick={() => switchNetwork(chain.goerli.id)}>
              Switch To Goerli
            </button>
          )}

          {isOptimism && (
            <>
              <BalanceView />
              <StoreView />
              <DataView />
              <BoostDataView />
            </>
          )}
          {isGoerli && <MintView />}
        </div>
      </div>
    </>
  );
};

export default Page;
