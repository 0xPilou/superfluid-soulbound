import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import {
  chain,
  useContractRead,
  useContractReads,
  useContractWrite,
} from "wagmi";
import { getAddress, getAbi, ABStore__factory } from "web3-config";
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

function getTotalETH(cart: any[], ethPrices: any[]): BigNumber {
  let totalETH: BigNumber = BigNumber.from("0");
  cart.forEach((element, index) => {
    if (element === true) {
      console.log(ethPrices[index][1]);
      totalETH = totalETH.add(ethPrices[index][1]);
    }
  });
  return totalETH;
}

type ContractsParam = {
  addressOrName: string;
  contractInterface: any;
  functionName: string;
  args: any;
}[];

const StoreView = () => {
  const { data: nbItems } = useContractRead({
    addressOrName: getAddress(chain.optimismGoerli.id, "ABStore"),
    contractInterface: getAbi(chain.optimismGoerli.id, "ABStore"),
    functionName: "nbItems",
  });

  const { write: purchase } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: getAddress(chain.optimismGoerli.id, "ABStore"),
    contractInterface: getAbi(chain.optimismGoerli.id, "ABStore"),
    functionName: "purchase",
  });

  let itemIds = [];
  if (nbItems) {
    for (let i = 0; i < nbItems!.toNumber(); i++) {
      itemIds.push(i);
    }
  }
  const [cart, setCart] = useState(new Array(itemIds.length).fill(false));

  let contractParam: ContractsParam = [];

  for (let item in itemIds) {
    contractParam.push({
      addressOrName: getAddress(chain.optimismGoerli.id, "ABStore"),
      contractInterface: getAbi(chain.optimismGoerli.id, "ABStore"),
      functionName: "items",
      args: [item],
    });
  }

  const { data: ethPrices } = useContractReads({
    contracts: contractParam,
  });

  return (
    <>
      {nbItems && ethPrices && (
        <div style={{ marginBottom: "5%" }}>
          <h1>Store 🛒</h1>
          <div>
            <h3>Items in Store : {nbItems!.toNumber()}</h3>
            <div style={{ display: "flex" }}>
              {itemIds.map((key, item) => (
                <ItemView key={key} id={item} cart={cart} setCart={setCart} />
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
                    recklesslySetUnpreparedOverrides: {
                      value: getTotalETH(cart, ethPrices),
                    },
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
