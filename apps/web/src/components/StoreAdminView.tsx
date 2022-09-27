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
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "addItem",
  });

  return (
    <div>
      <h3>Store Admin Function :</h3>
      <div>
        <label>Quantity :</label>
        <input value={quantity} onChange={handleChangeQuantity} />
      </div>
      <div>
        <label>Price :</label>
        <input value={price} onChange={handleChangePrice} />
      </div>
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
        Add Item
      </button>
    </div>
  );
}

export default StoreAdminView;
