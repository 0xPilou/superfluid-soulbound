import { chain, useAccount } from "wagmi";
import { Cashflow__factory, getAddress } from "web3-config";
import { request, gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useContractRead } from "wagmi-lfg";

export function calculateMonthlyStream(flowRate: number) {
  const stream = flowRate * (86400 * 30);
  return stream;
}

const DataView = () => {
  const { address } = useAccount();
  const cashflowAddress = getAddress(chain.optimismGoerli.id, "Cashflow");

  const { data: streams = [] } = useQuery(
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

  const { data: flow } = useContractRead(Cashflow__factory, "getFlow", {
    args: [address],
  });

  const flowRate = flow && flow[1];

  return (
    <div style={{ marginBottom: "5%" }}>
      <h1>Data 💾</h1>
      <h2>Subgraph Data :</h2>
      {streams.length === 0 && <h4>No Streams Found in the Subgraph</h4>}
      {streams?.map((stream, index) => (
        <div key={index}>
          <div>
            {ethers.utils.formatEther(stream.currentFlowRate)} ABT / second
          </div>
          <div>
            {+ethers.utils.formatEther(stream.currentFlowRate) * 86400} ABT /
            day
          </div>
          <div>
            {+ethers.utils.formatEther(stream.currentFlowRate) * (86400 * 30)}{" "}
            ABT / month
          </div>
        </div>
      ))}
      {flowRate && (
        <>
          <h2> On-Chain Data</h2>
          <div>{ethers.utils.formatEther(flowRate)} ABT / second</div>
          <div>{+ethers.utils.formatEther(flowRate) * 86400} ABT / day</div>
          <div>
            {+ethers.utils.formatEther(flowRate) * (86400 * 30)} ABT / month
          </div>
        </>
      )}
    </div>
  );
};

export default DataView;
