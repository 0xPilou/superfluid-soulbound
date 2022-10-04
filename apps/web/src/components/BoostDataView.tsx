import { ethers } from "ethers";
import { useState } from "react";
import { chain, useContractRead, useContractWrite } from "wagmi";
import { getAddress, getAbi } from "web3-config";
import BoostView from "./BoostView";

const BoostDataView = () => {
  const [dropIds, setDropIds] = useState<number[]>([]);
  const [dropId, setDropId] = useState(1);

  const [amounts, setAmounts] = useState<number[]>([]);
  const [amount, setAmount] = useState(1);

  const [addressGrant, setAddressGrant] = useState("");
  const [addressRevoke, setAddressRevoke] = useState("");

  const [increase, setIncrease] = useState(1);
  const [increaseGrant, setIncreaseGrant] = useState(1);
  const [increaseRevoke, setIncreaseRevoke] = useState(1);

  const handleChangeIncrease = (event) => {
    setIncrease(event.target.value);
  };

  const handleChangeIncreaseGrant = (event) => {
    setIncreaseGrant(event.target.value);
  };

  const handleChangeIncreaseRevoke = (event) => {
    setIncreaseRevoke(event.target.value);
  };

  const handleChangeAddressGrant = (event) => {
    setAddressGrant(event.target.value);
  };

  const handleChangeAddressRevoke = (event) => {
    setAddressRevoke(event.target.value);
  };

  const handleChangeDropId = (event) => {
    setDropId(event.target.value);
  };

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleAddCondition = () => {
    setDropIds(dropIds.concat(dropId));
    setAmounts(amounts.concat(amount));
  };

  const handleClearCondition = () => {
    setDropIds([]);
    setAmounts([]);
  };

  const { data: nbBoosts } = useContractRead({
    addressOrName: getAddress(chain.optimismGoerli.id, "ABStream"),
    contractInterface: getAbi(chain.optimismGoerli.id, "ABStream"),
    functionName: "nbBoost",
  });

  const { write: addBoost } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: getAddress(chain.optimismGoerli.id, "ABStream"),
    contractInterface: getAbi(chain.optimismGoerli.id, "ABStream"),
    functionName: "addBoost",
  });

  const { write: grantSpecialBoost } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: getAddress(chain.optimismGoerli.id, "ABStream"),
    contractInterface: getAbi(chain.optimismGoerli.id, "ABStream"),
    functionName: "grantSpecialBoost",
  });

  const { write: revokeSpecialBoost } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: getAddress(chain.optimismGoerli.id, "ABStream"),
    contractInterface: getAbi(chain.optimismGoerli.id, "ABStream"),
    functionName: "revokeSpecialBoost",
  });

  let boostIds = [];
  if (nbBoosts) {
    for (let i = 0; i < nbBoosts.toNumber(); i++) {
      boostIds.push(i);
    }
  }
  return (
    <>
      <h1>Boosts 🚀</h1>
      {nbBoosts && (
        <>
          <h3>Number of Boost : {nbBoosts.toNumber()}</h3>

          <div style={{ display: "flex" }}>
            {boostIds.map((key, item) => (
              <BoostView key={key} id={item} />
            ))}
          </div>
        </>
      )}
      <h2>Boost Admin Function :</h2>
      <h3>Add Boost :</h3>
      <div>
        <h4>Condition :</h4>
        <div>
          <input onChange={handleChangeDropId} placeholder="Drop Id" />
          <input onChange={handleChangeAmount} placeholder="Amount" />
          <button
            onClick={() => {
              handleAddCondition();
            }}
          >
            Add Condition
          </button>
        </div>
      </div>
      <div>--- Drop ID : {dropIds.toString()}</div>
      <div>--- Quantity : {amounts.toString()}</div>
      <button
        onClick={() => {
          handleClearCondition();
        }}
      >
        Clear Condition
      </button>
      <div>
        <h4>Increase :</h4>
        <div>
          <input onChange={handleChangeIncrease} placeholder="ABT / second" />
        </div>
      </div>
      <button
        onClick={() => {
          addBoost({
            recklesslySetUnpreparedArgs: [
              dropIds,
              amounts,
              ethers.utils.parseEther(increase.toString()),
            ],
          });
        }}
      >
        Add Boost
      </button>
      <h3>Special Boost :</h3>
      <div>
        <h4>Grant Boost :</h4>
        <input onChange={handleChangeAddressGrant} placeholder="User Address" />
        <input onChange={handleChangeIncreaseGrant} placeholder="Increase" />
        <button
          onClick={() => {
            grantSpecialBoost({
              recklesslySetUnpreparedArgs: [
                addressGrant,
                ethers.utils.parseEther(increaseGrant.toString()),
              ],
            });
          }}
        >
          Grant Boost
        </button>
      </div>
      <div>
        <h4>Revoke Boost :</h4>
        <input
          onChange={handleChangeAddressRevoke}
          placeholder="User Address"
        />
        <input onChange={handleChangeIncreaseRevoke} placeholder="Increase" />
        <button
          onClick={() => {
            revokeSpecialBoost({
              recklesslySetUnpreparedArgs: [
                addressRevoke,
                ethers.utils.parseEther(increaseRevoke.toString()),
              ],
            });
          }}
        >
          Revoke Boost
        </button>
      </div>
    </>
  );
};

export default BoostDataView;
