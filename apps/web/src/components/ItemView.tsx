import { ethers } from "ethers";
import { chain, useContractRead } from "wagmi";
import { getAddress, getAbi } from "web3-config";

type ItemProps = {
  id: number;
  cart: any[];
  setCart: any;
};

const ItemView = (props: ItemProps) => {
  const { data: itemDetails } = useContractRead({
    addressOrName: getAddress(chain.optimismGoerli.id, "Store"),
    contractInterface: getAbi(chain.optimismGoerli.id, "Store"),
    functionName: "items",
    args: [props.id],
    // watch: true,
  });

  const handleSelectItem = (position: number) => {
    const updatedCart = props.cart.map((item, index) =>
      index === position ? !item : item
    );
    props.setCart(updatedCart);
  };

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
          <input
            type="checkbox"
            id={`custom-checkbox-${props.id}`}
            checked={props.cart[props.id]}
            onChange={() => handleSelectItem(props.id)}
          />
        </>
      )}
    </div>
  );
};

export default ItemView;
