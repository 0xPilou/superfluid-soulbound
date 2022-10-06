import React, { useState } from "react";
import { getAbi, getAddress } from "web3-config";
import { chain, useContractWrite } from "wagmi";
import { ethers } from "ethers";

function StoreAdminView() {
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
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
      <input onChange={handleChangePrice} placeholder="Price" />
      <button
        onClick={() => {
          addItem({
            recklesslySetUnpreparedArgs: [
              quantity,
              ethers.utils.parseEther(price.toString()),
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
