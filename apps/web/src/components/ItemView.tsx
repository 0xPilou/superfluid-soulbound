import { ethers } from "ethers";
import {
  chain,
  useContractWrite,
  useContractRead,
  usePrepareContractWrite,
} from "wagmi";
import { getAddress, getAbi } from "web3-config";

const StoreView = (props) => {
  const { data: itemDetails } = useContractRead({
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "items",
    args: [props.id],
    watch: true,
  });

  const { config: redeemConfig } = usePrepareContractWrite({
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "redeem",
    args: [props.id, 1],
  });

  const { isLoading: isLoadingRedeem, write: redeem } = useContractWrite({
    ...redeemConfig,
  });

  return (
    <div style={{ margin: "5%" }}>
      <h2>Item {props.id}</h2>
      {itemDetails && (
        <>
          <h3>
            Price : {ethers.utils.formatEther(itemDetails!.price!.toString())}{" "}
            SBTx
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
