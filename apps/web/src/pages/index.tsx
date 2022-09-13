import {
  chain,
  useAccount,
  useBalance,
  useNetwork,
  useSwitchNetwork,
} from 'wagmi';
import { useContractRead, useContractWrite } from 'wagmi-lfg';
import { getAddress, MyNFT__factory } from 'web3-config';
import ConnectButton from '../components/ConnectButton';
import { request, gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { BigNumber, ethers } from 'ethers';
import OptimismActions from '../components/OptimismActions';
import GoerliActions from '../components/GoerliActions';
import useIsMounted from '../hooks/useIsMounted';

export function calculateStream(flowRate) {
  const stream = ethers.utils.formatEther(
    BigNumber.from(flowRate * (86400 * 30))
  );
  return stream;
}

const Page = () => {
  const { address } = useAccount();
  const { chain: activeChain } = useNetwork();
  const cashflowAddress = getAddress(chain.optimismGoerli.id, 'MyNFT');

  const { data: streams = [], ...rest } = useQuery(
    ['streams', address],
    async () => {
      const res = await request(
        'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-optimism-goerli',
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
          address: address.toLowerCase(),
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
    <div style={{ display: 'grid', gap: 20 }}>
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
