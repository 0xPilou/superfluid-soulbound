import { useState } from "react";
import { useAccount } from "wagmi";
import { useContractRead, useContractWrite } from "wagmi-lfg";
import { MyNFT__factory } from "web3-config";
const MintView = () => {
  const { address } = useAccount();
  const [quantity, setQuantity] = useState(1);

  const { data: mintCount } = useContractRead(MyNFT__factory, "mintCount");
  const { data: minted } = useContractRead(MyNFT__factory, "balanceOf", {
    args: [address],
    enabled: Boolean(address),
  });
  const { write: mint } = useContractWrite(MyNFT__factory, "mintNft", {
    args: [address, quantity],
    onSuccessMessage: "minted!",
  });

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div>
      {(mintCount && mintCount?.toString()) || null} / 100
      <div>
        <label>Quantity :</label>
        <input value={quantity} onChange={handleChangeQuantity} />
      </div>
      <button onClick={() => mint()}>MINT</button>
      {address && minted && <div>You have minted: {minted?.toString()}</div>}
    </div>
  );
};

export default MintView;
