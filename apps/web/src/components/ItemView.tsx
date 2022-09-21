import { ethers } from "ethers";
import { chain, useContractWrite, useContractRead } from "wagmi";
import { getAddress, getAbi } from "web3-config";

type StoreProps = {
  id: number;
};

const StoreView = (props: StoreProps) => {
  const { data: itemDetails } = useContractRead({
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "items",
    args: [props.id],
    // watch: true,
  });

  const { write: redeem } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "redeem",
  });

  return (
    <div
      style={{
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "3%",
      }}
    >
      <h2>Item {props.id}</h2>
      {itemDetails && (
        <>
          <h3>
            Price : {ethers.utils.formatEther(itemDetails!.price!.toString())}{" "}
            ABT
          </h3>
          <h3>Quantity : {itemDetails!.quantity.toNumber()} units</h3>
          <div>
            <button
              onClick={() => {
                redeem({
                  recklesslySetUnpreparedArgs: [props.id, 1],
                });
              }}
            >
              Redeem
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StoreView;
