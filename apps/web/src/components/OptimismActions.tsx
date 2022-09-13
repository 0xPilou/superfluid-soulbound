import { BigNumber, ethers } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import {
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { useContractRead } from 'wagmi-lfg';
import { Cashflow__factory } from 'web3-config';
import Balance from './Balance';

const OptimismActions = () => {
  const { address } = useAccount();

  const { data: daixBalance } = useBalance({
    addressOrName: address,
    watch: true,
    token: '0xaC7A5cf2E0A6DB31456572871Ee33eb6212014a9', //fDAIx
  });

  const { data: daiBalance } = useBalance({
    addressOrName: address,
    watch: true,
    token: '0xd0de1486f69495d49c02d8f541b7dadf9cf5cd91', //fDAI
  });

  const { data: flow } = useContractRead(Cashflow__factory, 'getFlow', {
    args: [address],
    // address: '0xBDEb8A291367a213f7BBE4b1F8B22631D704c2c3',
  });

  const flowRate = flow && flow[1];

  const { config, ...rest } = usePrepareContractWrite({
    addressOrName: '0xaC7A5cf2E0A6DB31456572871Ee33eb6212014a9',
    contractInterface: new Interface(['function downgrade(uint256 amount)']),
    functionName: 'downgrade',
    args: [daixBalance?.value.sub(1)],
    enabled: Boolean(daixBalance?.value),
  });

  const { data, isLoading, isSuccess, write, ...rest2 } =
    useContractWrite(config);

  return (
    <div>
      <div>{daixBalance?.formatted || null} fDAI</div>
      <div>{daiBalance?.formatted || null} fDAIx</div>

      {flowRate && (
        <div>flowRate from chain: {ethers.utils.formatEther(flowRate)}</div>
      )}

      {daixBalance?.value && flowRate && (
        <Balance balance={daixBalance?.value} flowRate={Number(flowRate)} />
      )}

      <button disabled={!write || isLoading} onClick={() => write()}>
        convert to DAI
      </button>
    </div>
  );
};

export default OptimismActions;
