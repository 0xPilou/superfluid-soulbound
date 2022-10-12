/*
npx hardhat run scripts/info-feeData.ts    
*/

import { ethers } from "ethers";

const main = async () => {
  console.log("");
  console.log(
    `-------------------------------- GAS PRICE --------------------------------`
  );
  console.log("");

  const url = `https://eth-goerli.g.alchemy.com/v2/${process.env.GOERLI_ALCHEMY_KEY}`;
  const provider = new ethers.providers.JsonRpcProvider(url);

  let feeData = await provider.getFeeData();

  let gasPrice = ethers.utils.formatUnits(feeData.gasPrice, "gwei");
  let maxFeePerGas = ethers.utils.formatUnits(feeData.maxFeePerGas, "gwei");
  let maxPriorityFeePerGas = ethers.utils.formatUnits(
    feeData.maxPriorityFeePerGas,
    "gwei"
  );

  console.log("Gas Price                : ", gasPrice, "gwei");
  console.log("Max Fee Per Gas          : ", maxFeePerGas, "gwei");
  console.log("Max Priority Fee Per Gas : ", maxPriorityFeePerGas, "gwei");
  console.log("");
  console.log(
    `------------------------------------------------------------------------------`
  );

  return;
};

main();
