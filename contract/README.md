# Contract (Hardhat)

Hardhat v3 project containing the `WalletRiskScore` smart contract deployed to **Base Sepolia**.

## Contract overview

`WalletRiskScore.sol` stores a simple score per wallet address:

- `setScore(address wallet, uint256 score)` – writes a score (0–100) on-chain
- `getScore(address wallet)` – reads the stored score

## Setup

Install dependencies:

```bash
npm install
```

Create `contract/.env` (do NOT commit it):

```bash
ALCHEMY_BASE_SEPOLIA_URL=YOUR_RPC_URL_HERE
PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE
BASESCAN_API_KEY=YOUR_BASESCAN_API_KEY_HERE
```

## Compile

```bash
npx hardhat compile
```

## Deploy (Base Sepolia)

```bash
npx hardhat run scripts/deploy.ts --network baseSepolia
```

## Verify (Basescan / explorer)

```bash
npx hardhat verify --network baseSepolia 0x6c8f25A69e3516039d9DC1531afA2bFE292d6c05
```

If the contract has no constructor arguments (this project), the address is enough.


