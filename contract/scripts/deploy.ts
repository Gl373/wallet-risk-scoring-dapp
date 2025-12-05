import { network } from "hardhat";

async function main() {
  // Anslut till nätverket som valts med --network (t.ex. baseSepolia)
  const { ethers } = await network.connect();

  const contract = await ethers.deployContract("WalletRiskScore");
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("WalletRiskScore deployed to:", address);
  console.log(`BaseScan: https://sepolia.basescan.org/address/${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
