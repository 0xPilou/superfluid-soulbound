import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';

export function calculateStream(flowRate, mul) {
  return BigNumber.from(flowRate).div(10).mul(mul);
}

type Props = {
  flowRate: number;
  balance: BigNumber;
};

const Balance = ({ balance, flowRate }: Props) => {
  const [bal] = useState(balance);
  const formatted = ethers.utils.formatEther(bal);
  const [extra, setExtra] = useState(calculateStream(flowRate, 1));

  useEffect(() => {
    let count = 1;
    const int = setInterval(() => {
      setExtra(calculateStream(flowRate, count));
      count++;
    }, 100);
    return () => {
      clearInterval(int);
    };
  }, []);

  const final = extra.add(bal);

  //   console.log(ethers.utils.formatEther(calculateStream(flowRate, 1)));
  return <div>Balance: {ethers.utils.formatEther(final)}</div>;
};

export default Balance;
