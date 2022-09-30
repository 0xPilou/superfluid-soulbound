import { ethers } from "ethers";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useContractRead } from "wagmi-lfg";
import { chain, useContractWrite } from "wagmi";

import {
  ABNFT__factory,
  ABDropManager__factory,
  getAddress,
  getAbi,
} from "web3-config";

type DropProps = {
  dropId: number;
};

const DropView = (props: DropProps) => {
  const { address } = useAccount();
  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const { data: drop } = useContractRead(ABDropManager__factory, "drops", {
    args: [props.dropId],
  });

  const { write: mint } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: getAddress(chain.goerli.id, "ABNFT"),
    contractInterface: getAbi(chain.goerli.id, "ABNFT"),
    functionName: "claimTo",
    args: [address, quantity, props.dropId],
    onSuccessMessage: "minted!",
  });

  return (
    <div
      style={{
        marginLeft: "10%",
        marginRight: "10%",
        marginBottom: "3%",
      }}
    >
      <h2>Drop {props.dropId}</h2>
      {drop && (
        <>
          <h4>Total Supply : {+drop.tokenInfo[1]}</h4>
          <h4>Remaining : {+drop.tokenInfo[1] - +drop.sold}</h4>
          <h4>
            Price : {+ethers.utils.formatEther(drop.tokenInfo[0].toString())}{" "}
            ETH
          </h4>
          <div>
            <h4>Mint Quantity :</h4>
            <input value={quantity} onChange={handleChangeQuantity} />
          </div>
          <button
            onClick={() =>
              mint({
                recklesslySetUnpreparedOverrides: {
                  value: drop.tokenInfo[0].mul(quantity),
                },
              })
            }
          >
            MINT
          </button>
        </>
      )}
    </div>
  );
};

export default DropView;
