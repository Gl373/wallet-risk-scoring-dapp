# Wallet Risk Scoring dApp (Base Sepolia)

Prototype dApp that calculates a simple, rule-based wallet risk score using Alchemy data, then stores and reads the score on-chain from a smart contract on **Base Sepolia**.

## Project structure

- `contract/` – Hardhat v3 project (Solidity contract + deploy/verify)
- `frontend/` – React + Vite UI (Alchemy fetch + scoring + on-chain write/read)
- `DaillyLogg/` – daily progress logs

## Deployed contract

- **Network**: Base Sepolia (chainId 84532)
- **Contract**: `WalletRiskScore`
- **Address**: `0x2Dd80e4504E65c66a6Bc6871c238784817a0fE3a`
- **Basescan**: [`sepolia.basescan.org/address/0x2Dd80e4504E65c66a6Bc6871c238784817a0fE3a`](https://sepolia.basescan.org/address/0x2Dd80e4504E65c66a6Bc6871c238784817a0fE3a)

### Notes (important for demo)

- **Contract address vs Contract Creator**: the *contract address* is where the code lives (and has a **Contract** tab on Basescan). **Contract Creator** is the wallet that deployed it.
- **If you only see “Transactions” and no “Contract” tab** on Basescan, you are likely looking at a normal wallet address (EOA), not a contract.
- **How to find the contract address from a deployer**: open the deployer address on Basescan → **Transactions** → click a **Contract Creation** tx → copy **Created Contract Address**.

## Prerequisites

- Node.js + npm
- A web3 wallet (Coinbase Wallet or MetaMask) set to **Base Sepolia**

## Environment variables (do NOT commit secrets)

### `contract/.env`

Create `contract/.env`:

```bash
ALCHEMY_BASE_SEPOLIA_URL=YOUR_RPC_URL_HERE
PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE
BASESCAN_API_KEY=YOUR_BASESCAN_API_KEY_HERE
```

### `frontend/.env`

Create `frontend/.env`:

```bash
VITE_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY_HERE
```

## Run the project

### 1) Contract (optional for demo)

```bash
cd contract
npm install
```

Deploy (if you want to deploy a new contract):

```bash
npx hardhat run scripts/deploy.ts --network baseSepolia
```

Verify (optional – enables explorer “Read/Write Contract” UI):

```bash
npx hardhat verify --network baseSepolia 0x2Dd80e4504E65c66a6Bc6871c238784817a0fE3a
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the app at `http://localhost:5173/`.

## Demo flow (quick script)

1. Open the frontend and click **Connect wallet**.
2. Make sure the wallet network is **Base Sepolia**.
3. Paste a wallet address and click **Check wallet**.
4. The app:
   - fetches balance from Alchemy
   - calculates a score (rule-based)
   - writes the score on-chain via `setScore`
   - waits for confirmation
   - reads the stored score back via `getScore`
5. Verify the transaction and contract interaction in an explorer (Basescan).