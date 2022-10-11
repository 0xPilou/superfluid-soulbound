import { ethers } from "ethers";
import { useState } from "react";
import { useAccount } from "wagmi";
import { chain, useContractWrite, useContractRead } from "wagmi";

import {
  ABNFT__factory,
  ABDropManager__factory,
  getAddress,
  getAbi,
  ABWrapper__factory,
} from "web3-config";

type DropProps = {
  dropId: number;
};

const DropView = (props: DropProps) => {
  const { address } = useAccount();
  const [quantity, setQuantity] = useState(1);
  const [tokenId, setTokenId] = useState(1);

  const [underlying, setUnderlying] = useState("");

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleChangeTokenId = (event) => {
    setTokenId(event.target.value);
  };

  const handleChangeUnderlying = (event) => {
    setUnderlying(event.target.value);
  };

  handleChangeUnderlying;

  const { data: drop } = useContractRead({
    addressOrName: getAddress(chain.goerli.id, "ABDropManager"),
    contractInterface: getAbi(chain.goerli.id, "ABDropManager"),
    functionName: "drops",
    args: [props.dropId],
  });

  const { write: mint } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: getAddress(chain.goerli.id, "ABNFT"),
    contractInterface: getAbi(chain.goerli.id, "ABNFT"),
    functionName: "claimTo",
    args: [address, quantity, props.dropId],
    onSuccessMessage: "minted!",
  });

  const { write: approve } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: underlying,
    contractInterface: ["function approve(address to, uint256 tokenId)"],
    functionName: "approve",
    onSuccessMessage: "approved!",
  });

  console.log(props.dropId, drop?.nft!);
  const { write: wrap } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: drop?.nft!,
    contractInterface: ["function wrap(uint256 _tokenId)"],
    functionName: "wrap",
    onSuccessMessage: "wrapped!",
  });

  return (
    <div
      style={{
        marginLeft: "10%",
        marginRight: "10%",
        marginBottom: "3%",
      }}
    >
      <h2>Drop {props.dropId}</h2>
      {drop && (
        <>
          <h4>Total Supply : {+drop.tokenInfo[1]}</h4>
          <h4>Remaining : {+drop.tokenInfo[1] - +drop.sold}</h4>
          <h4>
            Price : {+ethers.utils.formatEther(drop.tokenInfo[0].toString())}{" "}
            ETH
          </h4>
          {drop.nft == getAddress(chain.goerli.id, "ABNFT") && (
            <>
              <div>
                <h4>Mint Quantity :</h4>
                <input value={quantity} onChange={handleChangeQuantity} />
              </div>
              <button
                onClick={() =>
                  mint({
                    recklesslySetUnpreparedOverrides: {
                      value: drop.tokenInfo[0].mul(quantity),
                    },
                  })
                }
              >
                MINT
              </button>
            </>
          )}
          {drop.nft != getAddress(chain.goerli.id, "ABNFT") && (
            <>
              <h4>Wrapper :</h4>
              <h5>Underlying</h5>
              <input
                onChange={handleChangeUnderlying}
                placeholder="Underlying Address"
              />

              <div>
                <h4>Select Token ID to wrap :</h4>
                <input onChange={handleChangeTokenId} placeholder="token ID" />
                <button
                  onClick={() =>
                    approve({
                      recklesslySetUnpreparedArgs: [drop.nft, tokenId],
                    })
                  }
                >
                  APPROVE
                </button>
                <button
                  onClick={() =>
                    wrap({
                      recklesslySetUnpreparedArgs: [tokenId],
                    })
                  }
                >
                  WRAP
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DropView;
