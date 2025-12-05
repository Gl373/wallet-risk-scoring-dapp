import { defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import * as dotenv from "dotenv";

dotenv.config();

const { ALCHEMY_BASE_SEPOLIA_URL, PRIVATE_KEY } = process.env;

export default defineConfig({
  solidity: {
    version: "0.8.28",
  },
  plugins: [hardhatEthers],
  networks: {
    baseSepolia: {
      type: "http",
      url: ALCHEMY_BASE_SEPOLIA_URL || "",
      // Lägg din privata nyckel i .env som PRIVATE_KEY (utan 0x-prefix går också bra)
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
});
