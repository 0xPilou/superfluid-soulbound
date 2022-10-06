import { ethers } from "ethers";
import { useContractRead } from "wagmi-lfg";
import { getAddress, getAbi, ABStream__factory } from "web3-config";

type BoostProps = {
  id: number;
};

const BoostView = (props: BoostProps) => {
  const { data: boost } = useContractRead(ABStream__factory, "boosts", {
    args: [props.id],
  });

  return (
    <div
      style={{
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "3%",
      }}
    >
      <h2>Boost {props.id}</h2>
      {boost && (
        <>
          <h3>Condition : </h3>
          <h3>----- Drop ID : {boost.condition[0].toString()}</h3>
          <h3>---- Quantity : {boost.condition[1].toString()}</h3>
          <h3>
            Increase :{" "}
            {ethers.utils.formatEther(boost.increase.mul(86400).toString())} ABT
            / day
          </h3>
        </>
      )}
    </div>
  );
};

export default BoostView;
