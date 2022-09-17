import { chain, useContractRead } from "wagmi";
import { getAddress, getAbi } from "web3-config";
import ItemView from "./ItemView";

const StoreView = () => {
  const { data: nbItems } = useContractRead({
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "nbItems",
  });

  let itemIds = [];
  for (let i = 0; i < nbItems!.toNumber(); i++) {
    itemIds.push(i);
  }

  return (
    <>
      <h1>Store</h1>
      <div>
        <span>Items in Store : {nbItems!.toNumber()}</span>
        <div style={{ display: "flex" }}>
          {itemIds.map((item) => (
            <ItemView id={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default StoreView;
