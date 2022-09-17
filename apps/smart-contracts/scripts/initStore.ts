import { ethers } from "ethers";
import hre from "hardhat";
import StoreDeployment from "web3-config/deployments/optimismGoerli/Store.json";
import SuperSoulboundDeployment from "web3-config/deployments/optimismGoerli/SuperSoulbound.json";

const main = async () => {
  const url = "https://goerli.optimism.io";
  const provider = new ethers.providers.JsonRpcProvider(url);

  const [deployer] = await hre.ethers.getSigners();

  const Store = new ethers.Contract(
    StoreDeployment.address,
    StoreDeployment.abi,
    provider
  );
  const store = await Store.deployed();

  if ((await store.token()) != SuperSoulboundDeployment.address) {
    const tx = await store
      .connect(deployer)
      .setToken(SuperSoulboundDeployment.address);
    await tx.wait();
  }

  let itemIds = [0, 1, 2];
  let quantities = [100, 50, 10];
  let prices = [
    ethers.utils.parseEther("0.01"),
    ethers.utils.parseEther("0.1"),
    ethers.utils.parseEther("1"),
  ];

  itemIds.forEach(async (item) => {
    let tx = await store
      .connect(deployer)
      .addItem(item, quantities[item], prices[item]);
    await tx.wait();

    console.log("-------------------------------------------");
    console.log("Item Added : ");
    console.log("-------------------------------------------");
    console.log(":::Item Id       : ", item);
    console.log(
      ":::Item Price    : ",
      ethers.utils.formatEther(prices[item].toString())
    );
    console.log(":::Item Quantity : ", quantities[item]);
  });

  return;
};

main();
