import { ethers } from "ethers";
import { useState } from "react";
import { chain, useContractRead, useContractWrite } from "wagmi";
import { getAddress, getAbi } from "web3-config";
import ItemView from "./ItemView";

const StoreView = () => {
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const { data: nbItems } = useContractRead({
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "nbItems",
  });

  const { write: addItem } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "addItem",
  });

  let itemIds = [];
  if (nbItems) {
    for (let i = 0; i < nbItems!.toNumber(); i++) {
      itemIds.push(i);
    }
  }

  return (
    <>
      {nbItems && (
        <div style={{ marginBottom: "5%" }}>
          <h1>Store 🛒</h1>
          <div>
            <h3>Items in Store : {nbItems!.toNumber()}</h3>
            <div style={{ display: "flex" }}>
              {itemIds.map((key, item) => (
                <ItemView key={key} id={item} />
              ))}
            </div>
          </div>
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
        </div>
      )}
    </>
  );
};

export default StoreView;
