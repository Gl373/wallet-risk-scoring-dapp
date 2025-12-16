# Frontend (React + Vite)

This is the UI for the Wallet Risk Scoring prototype.

## What it does

- Takes a wallet address as input
- Fetches wallet data from **Alchemy** (Base Sepolia)
- Calculates a simple, rule-based risk score
- Stores the score on-chain in `WalletRiskScore` (`setScore`)
- Waits for confirmation, then reads the stored score (`getScore`)

## Setup

1) Install dependencies:

```bash
npm install
```

2) Create `frontend/.env`:

```bash
VITE_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY_HERE
```

3) Start dev server:

```bash
npm run dev
```

Open `http://localhost:5173/`.

## Notes

- Use a web3 wallet (Coinbase Wallet or MetaMask) on **Base Sepolia**.
- This is a prototype for educational use (not a production risk model).
