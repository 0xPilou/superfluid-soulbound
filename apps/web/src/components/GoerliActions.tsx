import { useAccount, useBalance } from 'wagmi';
import { useContractRead, useContractWrite } from 'wagmi-lfg';
import { MyNFT__factory } from 'web3-config';
const GoerliActions = () => {
  const { address } = useAccount();

  const { data: mintCount } = useContractRead(MyNFT__factory, 'mintCount');
  const { data: minted } = useContractRead(MyNFT__factory, 'balanceOf', {
    args: [address],
    enabled: Boolean(address),
  });
  const { write: mint } = useContractWrite(MyNFT__factory, 'mintNft', {
    args: [address, 1],
    onSuccessMessage: 'minted!',
  });

  return (
    <div>
      {(mintCount && mintCount?.toString()) || null}/ 100
      <button onClick={() => mint()}>MINT</button>
      {address && minted && <div>You have minted: {minted?.toString()}</div>}
    </div>
  );
};

export default GoerliActions;
