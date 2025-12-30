import { defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import hardhatVerify from "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

const { ALCHEMY_BASE_SEPOLIA_URL, PRIVATE_KEY, BASESCAN_API_KEY } = process.env;

export default defineConfig({
  solidity: {
    version: "0.8.28",
  },
  plugins: [hardhatEthers, hardhatVerify],
  networks: {
    baseSepolia: {
      type: "http",
      url: ALCHEMY_BASE_SEPOLIA_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  verify: {
    etherscan: {
      apiKey: BASESCAN_API_KEY || "",
    },
  },
});
