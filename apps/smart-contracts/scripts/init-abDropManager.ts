import { ethers } from "ethers";
import hre from "hardhat";
import ABDropManagerDeployment from "web3-config/deployments/goerli/ABDropManager.json";
import ABNFTDeployment from "web3-config/deployments/goerli/ABNFT.json";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const EMPTY_MERKLE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

const DROP_0_PRICE = "0.05";
const DROP_1_PRICE = "0.08";
const DROP_0_SUPPLY = 100;
const DROP_1_SUPPLY = 50;

const SHARE_PER_TOKEN = 20000;
const RIGHTHOLDER_FEE = 1000000;

const SALES_INFO = [1, 1, 1, 1];

const main = async () => {
  console.log(
    `-------------------------------- INIT ABDropManager --------------------------------`
  );
  const [deployer] = await hre.ethers.getSigners();

  const ABDropManager = new ethers.Contract(
    ABDropManagerDeployment.address,
    ABDropManagerDeployment.abi,
    deployer
  );
  const abDropManager = await ABDropManager.deployed();

  let createTx = await abDropManager.create(
    ZERO_ADDRESS,
    deployer,
    ABNFTDeployment.address,
    hre.ethers.utils.parseEther(DROP_0_PRICE),
    DROP_0_SUPPLY,
    SHARE_PER_TOKEN,
    RIGHTHOLDER_FEE,
    SALES_INFO,
    EMPTY_MERKLE
  );

  await createTx.wait();

  createTx = await abDropManager.create(
    ZERO_ADDRESS,
    deployer,
    ABNFTDeployment.address,
    hre.ethers.utils.parseEther(DROP_1_PRICE),
    DROP_1_SUPPLY,
    SHARE_PER_TOKEN,
    RIGHTHOLDER_FEE,
    SALES_INFO,
    EMPTY_MERKLE
  );

  await createTx.wait();

  console.log(`Drop #0 Created : `);
  console.log(`     - Supply : ${DROP_0_SUPPLY} `);
  console.log(`     - Price : ${DROP_0_PRICE} `);

  console.log(`***********************************`);

  console.log(`Drop #1 Created : `);
  console.log(`     - Supply : ${DROP_1_SUPPLY} `);
  console.log(`     - Price : ${DROP_1_PRICE} `);

  console.log(
    `------------------------------------------------------------------------------`
  );
  return;
};

main();
