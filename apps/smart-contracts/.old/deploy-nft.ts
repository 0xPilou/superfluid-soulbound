import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import ABRelayDeployment from "web3-config/deployments/optimismGoerli/ABRelay.json";

const name = "MyNFT";

const L2_MESSENGER_ADDR = "0x5086d1eEF304eb5284A0f6720f79403b4e9bE294";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const erc20Symbol = "NFT";
  const erc20Name = "NFT";

  const deployment = await deploy(name, {
    from: deployer,
    args: [
      erc20Name,
      erc20Symbol,
      L2_MESSENGER_ADDR,
      ABRelayDeployment.address,
    ],
  });
  deployments.log("");
  deployments.log(
    "------------------------------------------------------------------------------------------------------------------------------"
  );
  deployments.log(
    `Contract ${name} deployed at ${deployment.address} on Goerli`
  );
  deployments.log("");
  deployments.log(
    `npx hardhat verify --network goerli ${deployment.address} ${erc20Name} ${erc20Symbol} ${L2_MESSENGER_ADDR} ${ABRelayDeployment.address} `
  );
  deployments.log(
    "------------------------------------------------------------------------------------------------------------------------------"
  );
};

func.tags = ["GOERLI", name];
func.skip = async (env) => env.network.name !== "goerli";

export default func;
