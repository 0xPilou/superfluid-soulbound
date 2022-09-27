import { useState } from "react";
import { chain, useContractRead, useContractWrite } from "wagmi";
import { getAddress, getAbi } from "web3-config";
import ItemView from "./ItemView";
import StoreAdminView from "./StoreAdminView";

function getItemIds(cart: any[]): number[] {
  let idArray: number[] = [];

  cart.forEach((element, index) => {
    if (element === true) {
      idArray.push(index);
    }
  });
  return idArray;
}

function getItemQty(cart: any[]): number[] {
  let qtyArray: number[] = [];

  cart.forEach((element) => {
    if (element === true) {
      qtyArray.push(1);
    }
  });
  return qtyArray;
}

const StoreView = () => {
  const { data: nbItems } = useContractRead({
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "nbItems",
  });

  const { write: purchase } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "purchase",
  });

  let itemIds = [];
  if (nbItems) {
    for (let i = 0; i < nbItems!.toNumber(); i++) {
      itemIds.push(i);
    }
  }
  const [cart, setCart] = useState(new Array(itemIds.length).fill(false));
  const [cartDetails, setCartDetails] = useState(new Array(0));

  console.log(getItemIds(cart));
  // console.log(cartDetails);
  // console.log("CART:", cart);

  return (
    <>
      {nbItems && (
        <div style={{ marginBottom: "5%" }}>
          <h1>Store 🛒</h1>
          <div>
            <h3>Items in Store : {nbItems!.toNumber()}</h3>
            <div style={{ display: "flex" }}>
              {itemIds.map((key, item) => (
                <ItemView
                  key={key}
                  id={item}
                  cart={cart}
                  setCart={setCart}
                />
              ))}
            </div>
            <div>
              <button
                onClick={() => {
                  purchase({
                    recklesslySetUnpreparedArgs: [
                      getItemIds(cart),
                      getItemQty(cart),
                    ],
                  });
                }}
              >
                BUY
              </button>
            </div>
          </div>
          <StoreAdminView />
        </div>
      )}
    </>
  );
};

export default StoreView;
