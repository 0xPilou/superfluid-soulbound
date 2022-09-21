import { ethers } from "ethers";
import hre from "hardhat";
import StoreDeployment from "web3-config/deployments/optimismGoerli/Store.json";
import ABTokenDeployment from "web3-config/deployments/optimismGoerli/ABToken.json";

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  const Store = new ethers.Contract(
    StoreDeployment.address,
    StoreDeployment.abi,
    deployer
  );
  const store = await Store.deployed();

  if ((await store.token()) != ABTokenDeployment.address) {
    const tx = await store
      .connect(deployer)
      .setToken(ABTokenDeployment.address);
    await tx.wait();
  }

  let itemIds = [0, 1, 2];
  let quantities = [100, 50, 10];
  let prices = [
    ethers.utils.parseEther("0.01"),
    ethers.utils.parseEther("0.1"),
    ethers.utils.parseEther("1"),
  ];

  for (let i = 0; i < itemIds.length; i++) {
    let tx = await store.connect(deployer).addItem(quantities[i], prices[i]);
    await tx.wait();

    console.log("-------------------------------------------");
    console.log("Item Added : ");
    console.log("-------------------------------------------");
    console.log("   Item Id       : ", itemIds[i]);
    console.log(
      "   Item Price    : ",
      ethers.utils.formatEther(prices[i].toString())
    );
    console.log("   Item Quantity : ", quantities[i]);
  }

  return;
};

main();
