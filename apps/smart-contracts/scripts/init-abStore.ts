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

  if ((await abStore.token()) != ABTokenDeployment.address) {
    const tx = await abStore
      .connect(deployer)
      .setToken(ABTokenDeployment.address);
    await tx.wait();
    console.log(
      `ABStore : Accepted currency set to address : ${ABTokenDeployment.address}`
    );
  }

  let itemIds = [0, 1, 2];
  let quantities = [100, 50, 10];
  let prices = [
    ethers.utils.parseEther("10"),
    ethers.utils.parseEther("100"),
    ethers.utils.parseEther("1000"),
  ];

  for (let i = 0; i < itemIds.length; i++) {
    let tx = await abStore.connect(deployer).addItem(quantities[i], prices[i]);
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
    console.log("*******************************************");
  }

  console.log(
    `------------------------------------------------------------------------------`
  );

  return;
};

main();
