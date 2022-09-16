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

  let tx = await store
    .connect(deployer)
    .setToken(SuperSoulboundDeployment.address);
  await tx.wait();

  const itemId = 0;
  const quantity = 100;
  const price = ethers.utils.parseEther("0.1");

  tx = await store.connect(deployer).addItem(itemId, quantity, price);
  await tx.wait();

  console.log("Item Added : ");
  console.log("-------------------------------------------");
  console.log(":::Item Id       : ", itemId);
  console.log(
    ":::Item Price    : ",
    ethers.utils.formatEther(price.toString())
  );
  console.log(":::Item Quantity : ", quantity);
  return;
};

main();
