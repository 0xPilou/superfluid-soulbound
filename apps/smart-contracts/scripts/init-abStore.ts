import { ethers } from "ethers";
import hre from "hardhat";
import StoreDeployment from "web3-config/deployments/optimismGoerli/ABStore.json";
import ABTokenDeployment from "web3-config/deployments/optimismGoerli/ABToken.json";

const main = async () => {
  console.log(
    `-------------------------------- INIT ABStore --------------------------------`
  );
  const [deployer] = await hre.ethers.getSigners();

  const Store = new ethers.Contract(
    StoreDeployment.address,
    StoreDeployment.abi,
    deployer
  );
  const abStore = await Store.deployed();

  const tx = await abStore
    .connect(deployer)
    .setToken(ABTokenDeployment.address);
  await tx.wait();
  console.log(
    `ABStore : Accepted currency set to address : ${ABTokenDeployment.address}`
  );

  let itemIds = [0, 1, 2];
  let quantities = [100, 50, 10];
  let pricesAB = [
    ethers.utils.parseEther("0.001"),
    ethers.utils.parseEther("0.01"),
    ethers.utils.parseEther("0.1"),
  ];

  let pricesETH = [
    ethers.utils.parseEther("0.001"),
    ethers.utils.parseEther("0.01"),
    ethers.utils.parseEther("0.1"),
  ];

  for (let i = 0; i < itemIds.length; i++) {
    let tx = await abStore
      .connect(deployer)
      .addItem(quantities[i], pricesAB[i], pricesETH[i]);
    await tx.wait();

    console.log("-------------------------------------------");
    console.log("Item Added : ");
    console.log("-------------------------------------------");
    console.log("   Item Id       : ", itemIds[i]);
    console.log("   Item Price    : ");
    console.log(
      "       - ",
      ethers.utils.formatEther(pricesAB[i].toString()),
      "ABT"
    );
    console.log(
      "       - ",
      ethers.utils.formatEther(pricesETH[i].toString()),
      "ETH"
    );
    console.log("   Item Quantity : ", quantities[i]);
    console.log("*******************************************");
  }

  console.log(
    `------------------------------------------------------------------------------`
  );

  return;
};

main();
