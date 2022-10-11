import { useState } from "react";
import { chain, useContractWrite } from "wagmi";
import { getAbi, getAddress } from "web3-config";
import { ethers } from "ethers";

import DropView from "./DropView";
const MintView = () => {
  const drops = [0, 1, 2];

  const [currencyPayout, setCurrencyPayout] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [owner, setOwner] = useState(
    "0x301933aEf6bB308f090087e9075ed5bFcBd3e0B3"
  );

  const [underlying, setUnderlying] = useState("");
  const [baseFlow, setBaseFlow] = useState(1);
  const [baseURI, setBaseURI] = useState("testURI");
  const [name, setName] = useState("Anotherblock ...");
  const [symbol, setSymbol] = useState("ab...");

  const handleChangeCurrencyPayout = (event) => {
    setCurrencyPayout(event.target.value);
  };
  const handleChangeOwner = (event) => {
    setOwner(event.target.value);
  };

  const handleChangeUnderlying = (event) => {
    setUnderlying(event.target.value);
  };

  const handleChangeBaseFlow = (event) => {
    setBaseFlow(event.target.value);
  };

  const handleChangeBaseURI = (event) => {
    setBaseURI(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeSymbol = (event) => {
    setSymbol(event.target.value);
  };

  const { write: createFromLive } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: getAddress(chain.goerli.id, "ABDropManager"),
    contractInterface: getAbi(chain.goerli.id, "ABDropManager"),
    functionName: "createFromLive",
    onSuccessMessage: "created !",
  });

  return (
    <>
      <div style={{ display: "flex" }}>
        {drops.map((key, item) => (
          <DropView key={key} dropId={item} />
        ))}
      </div>
      <div>
        <h4>Create Drop From Live NFT :</h4>
        <div>
          <input
            value={currencyPayout}
            onChange={handleChangeCurrencyPayout}
            placeholder="currencyPayout"
          />
          <input
            value={owner}
            onChange={handleChangeOwner}
            placeholder="owner"
          />
          <input
            value={underlying}
            onChange={handleChangeUnderlying}
            placeholder="underlying"
          />
          <input
            value={baseFlow}
            onChange={handleChangeBaseFlow}
            placeholder="baseFlow"
          />
          <input
            value={baseURI}
            onChange={handleChangeBaseURI}
            placeholder="baseURI"
          />
        </div>
        <div>
          <input value={name} onChange={handleChangeName} placeholder="name" />
          <input
            value={symbol}
            onChange={handleChangeSymbol}
            placeholder="symbol"
          />
        </div>
        <button
          onClick={() => {
            createFromLive({
              recklesslySetUnpreparedArgs: [
                currencyPayout,
                owner,
                underlying,
                ethers.utils.parseEther(baseFlow.toString()),
                baseURI,
                name,
                symbol,
              ],
            });
          }}
        >
          CREATE
        </button>
      </div>
    </>
  );
};

export default MintView;
