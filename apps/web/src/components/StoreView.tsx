import { chain, useContractRead } from "wagmi";
import { getAddress, getAbi } from "web3-config";
import ItemView from "./ItemView";

const StoreView = () => {
  const { data: nbItems } = useContractRead({
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "nbItems",
  });

  return (
    <>
      <h1>Store</h1>
      <div>
        <span>Items in Store : {nbItems!.toNumber()}</span>
        <div style={{ display: "flex" }}>
          <ItemView id={0} />
          <ItemView id={1} />
          <ItemView id={2} />
        </div>
      </div>
    </>
  );
};

export default StoreView;
