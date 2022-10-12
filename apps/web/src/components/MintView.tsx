import { useState } from "react";
import { chain, useContractWrite } from "wagmi";
import { getAbi, getAddress } from "web3-config";
import { ethers } from "ethers";

import DropView from "./DropView";
const MintView = () => {
  const drops = [0, 1];

  return (
    <>
      <div style={{ display: "flex" }}>
        {drops.map((key, item) => (
          <DropView key={key} dropId={item} />
        ))}
      </div>
    </>
  );
};

export default MintView;
