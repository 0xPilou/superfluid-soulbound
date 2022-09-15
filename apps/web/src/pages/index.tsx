import ConnectButton from "../components/ConnectButton";
import OptimismActions from "../components/OptimismActions";
import GoerliActions from "../components/GoerliActions";
import useIsMounted from "../hooks/useIsMounted";
import { BigNumber, ethers } from "ethers";
import { request, gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import {
  chain,
  useAccount,
  useBalance,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

export function calculateStream(flowRate) {
  const stream = flowRate * (86400 * 30);
  return stream;
}

const Page = () => {
  const { address } = useAccount();
  const { chain: activeChain } = useNetwork();

  // const cashflowAddress = getAddress(chain.optimismGoerli.id, "MyNFT");
  const cashflowAddress = "0xeaD7472314DB5968A7a7DC0174A0c1466E05E404";

  const { data: streams = [], ...rest } = useQuery(
    ["streams", address],
    async () => {
      const res = await request(
        "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-optimism-goerli",
        gql`
          query Streams($address: String!, $sender: String!) {
            streams(where: { receiver: $address, sender: $sender }) {
              token {
                id
                symbol
              }

              createdAtTimestamp
              updatedAtTimestamp
              currentFlowRate
              streamedUntilUpdatedAt
              streamPeriods {
                startedAtTimestamp
                stoppedAtTimestamp
              }
            }
          }
        `,
        {
          address: address?.toLowerCase(),
          sender: cashflowAddress.toLowerCase(),
        }
      );
      return res.streams;
    },
    { enabled: Boolean(address) }
  );
  const { isLoading, switchNetwork } = useSwitchNetwork();
  const isOptimism = activeChain?.id === chain.optimismGoerli.id;
  const isGoerli = activeChain?.id === chain.goerli.id;
  const mounted = useIsMounted();
  if (!mounted) {
    return null;
  }

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <ConnectButton />

        {!isOptimism && (
          <button onClick={() => switchNetwork(chain.optimismGoerli.id)}>
            Go to optimism
          </button>
        )}

        {!isGoerli && (
          <button onClick={() => switchNetwork(chain.goerli.id)}>
            Go to goerli
          </button>
        )}

        {isOptimism && streams[0]?.currentFlowRate && (
          <div>
            <OptimismActions />
          </div>
        )}
        {isGoerli && <GoerliActions />}
        <div style={{ marginTop: 100 }}>
          <div>The Graph:</div>
          {streams?.map((stream) => (
            <div>
              <div>Flow raw: {stream.currentFlowRate} </div>
              <div>
                FLowrate: {ethers.utils.formatEther(stream.currentFlowRate)} /s
              </div>
              <div>{calculateStream(stream.currentFlowRate)} /month</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
