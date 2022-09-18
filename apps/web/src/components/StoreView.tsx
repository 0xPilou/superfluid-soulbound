import { ethers } from "ethers";
import { SetStateAction, useState } from "react";
import {
  chain,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
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

  const { config: addItemConfig } = usePrepareContractWrite({
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "addItem",
    args: [1, 1],
  });

  const { isLoading: isLoadingAddItem, write: addItem } = useContractWrite({
    ...addItemConfig,
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
        <>
          <h1>Store 🛒</h1>
          <div>
            <h3>Items in Store : {nbItems!.toNumber()}</h3>
            <div style={{ display: "flex" }}>
              {itemIds.map((item) => (
                <ItemView id={item} />
              ))}
            </div>
          </div>
          <div>
            <h3>Store Admin Function :</h3>
            <div>
              <label>Quantity :</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleChangeQuantity}
              />
            </div>
            <div>
              <label>Price :</label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={handleChangePrice}
              />
            </div>
            <button
              type="submit"
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
        </>
      )}
    </>
  );
};

export default StoreView;
