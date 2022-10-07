import React, { useState } from "react";
import { getAbi, getAddress } from "web3-config";
import { chain, useContractWrite } from "wagmi";
import { ethers } from "ethers";

function StoreAdminView() {
  const [priceABT, setPriceABT] = useState(1);
  const [priceETH, setPriceETH] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleChangePriceABT = (event) => {
    setPriceABT(event.target.value);
  };
  const handleChangePriceETH = (event) => {
    setPriceETH(event.target.value);
  };
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const { write: addItem } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: getAddress(chain.optimismGoerli.id, "ABStore"),
    contractInterface: getAbi(chain.optimismGoerli.id, "ABStore"),
    functionName: "addItem",
  });

  return (
    <div>
      <h3>Store Admin Function :</h3>
      <h4>Add Item :</h4>
      <input onChange={handleChangeQuantity} placeholder="Supply" />
      <input onChange={handleChangePriceABT} placeholder="Price ABT" />
      <input onChange={handleChangePriceETH} placeholder="Price ETH" />
      <button
        onClick={() => {
          addItem({
            recklesslySetUnpreparedArgs: [
              quantity,
              ethers.utils.parseEther(priceABT.toString()),
              ethers.utils.parseEther(priceETH.toString()),
            ],
          });
        }}
      >
        ADD
      </button>
    </div>
  );
}

export default StoreAdminView;
