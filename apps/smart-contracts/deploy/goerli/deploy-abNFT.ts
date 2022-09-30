import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { AB_DROP_MANAGER_NAME, AB_NFT_NAME } from "../../deploy-constants";
import ABRelayDeployment from "web3-config/deployments/optimismGoerli/ABRelay.json";

const L2_MESSENGER_ADDR = "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  const abDropManager = await deployments.get(AB_DROP_MANAGER_NAME);

  const erc721Name = "name";
  const erc721Symbol = "symbol";
  const URI = "testURI";

  if (!URI) {
    throw new Error("Missing URI");
  }

  const deployment = await deploy(AB_NFT_NAME, {
    from: deployer,
    args: [
      abDropManager.address,
      L2_MESSENGER_ADDR,
      ABRelayDeployment.address,
      URI,
      erc721Name,
      erc721Symbol,
    ],
  });
  deployments.log("");
  deployments.log(
    "------------------------------------------------------------------------------------------------------------------------------"
  );
  deployments.log(
    `Contract ${AB_NFT_NAME} deployed at ${deployment.address} on Goerli`
  );
  deployments.log("");
  deployments.log(
    `npx hardhat verify --network goerli ${deployment.address} ${abDropManager.address} ${L2_MESSENGER_ADDR} ${ABRelayDeployment.address} ${URI} ${erc721Name} ${erc721Symbol} `
  );
  deployments.log(
    "------------------------------------------------------------------------------------------------------------------------------"
  );
};

func.tags = [AB_NFT_NAME];
func.dependencies = [AB_DROP_MANAGER_NAME];
func.skip = async (env) => env.network.name !== "goerli";

export default func;
