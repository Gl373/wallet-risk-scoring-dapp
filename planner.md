# Wallet Risk Scoring dApp

Small exam project where I build a simple dApp that does a basic risk check on a crypto wallet.

The user enters a wallet address in the frontend. The app fetches some basic data about the wallet from a public API (Alchemy / block explorer), calculates a simple risk score in the frontend and stores that score on-chain in a small smart contract. The stored score can then be read back and shown in the UI.

The goal is to keep the scope small but still show a realistic Web3 flow: frontend → API → simple scoring → smart contract storage → frontend display.

---

## Project goals

- Let a user input a wallet address and get a basic risk score with a short explanation.
- Connect a React frontend to a Solidity smart contract on Base Sepolia.
- Keep all logic in the frontend and use the contract only for storage.
- Deliver a small, stable MVP that I fully understand and can demo.

---

## Tech stack

- **Smart contract:** Solidity + Hardhat  
- **Frontend:** React (Vite or CRA) + viem / wagmi (or similar)  
- **Network:** Base Sepolia testnet  
- **Data source:** Alchemy (blockchain data API)  
- **Tooling:** GitHub, GitHub Projects (Kanban), Node.js, npm  
- **Docs:** This README + code comments + project plan (school doc)

---

## Technical flow (overview)

1. User opens the dApp and enters a wallet address.
2. Frontend calls an Alchemy / block explorer endpoint to fetch basic info about the wallet (for example tx count or simple interaction data).
3. Frontend calculates a basic risk score using a few rule-based checks.
4. Frontend sends the score to the smart contract, which stores it together with the wallet address.
5. Frontend reads the stored score from the contract.
6. The UI shows the score and a short explanation to the user.

All logic stays in the frontend. The smart contract is only responsible for `setScore` and `getScore`.

---

## Project structure (planned)

```text
wallet-risk-scoring-dapp/
  README.md
  contract/
    contracts/
      WalletRiskScore.sol
    scripts/
      deploy.js
    hardhat.config.js
    package.json
    .env (not committed)
  frontend/
    src/
    package.json
    vite.config.* / similar


# wallet-risk-scoring-dapp

1 Project idea summary 
This project is about building a lightweight Wallet Risk Scoring dApp that helps users understand if a crypto wallet may be risky based on activity patterns and interactions with known suspicious contracts. I chose this idea because manual wallet analysis is time-consuming, and I wanted to create a tool that demonstrates a simplified version of real-world risk assessment. It also aligns with my long-term goal of applying for a crypto analyst position within law enforcement, so I wanted a project that reflects that type of work. The value of the product is that it gives users a fast, easy-to-understand risk indicator without needing advanced tools or experience
2 Target audience
The target audience is beginners in blockchain, developers, and users who want a simple way to check if a wallet might be risky. They are interested because it helps them make safer decisions before interacting with unknown addresses.
The tool is useful on both an educational and practical level.
3 Goal of your product/project
The goal is to build a simple dApp where the user can enter a wallet address and get back a basic risk score with a short explanation. The focus is on connecting a frontend to a smart contract and showing how on-chain data can be used in a clear and practical way. The scope is intentionally kept small to ensure the project is realistic within the timeframe and can be fully completed with good quality.
By the end of five weeks, the smart contract and the frontend should be working together in a stable, minimal version ready for demo.
4 Tech stack
I chose a tech stack that keeps the project small and easy to build while still reflecting a real Web3 setup. The frontend handles all the logic, and the smart contract is only used to store the final score.
The stack uses Solidity with Hardhat, React with wagmi/viem, and a public block explorer API, with documentation added to GitHub.
5 Technical flow
The user enters a wallet address in the frontend, which then fetches basic data from a public block explorer API. The frontend calculates a simple risk score based on a few predefined rules and stores the result on-chain in a small smart contract. The score is then read back and displayed clearly to the user in the interface.
6 Legal considerations

The dApp only uses public blockchain data, so no personal or sensitive information is handled. The risk score is presented as an indicator and not a confirmed judgement, which keeps the tool within safe boundaries.
There are no regulatory obstacles as long as the results are shown as a simple analysis.
7 References
I will mainly use the documentation for the tools included in the project, such as Solidity, Hardhat, wagmi/viem and the Base Sepolia network. I will also look at the public API guides from Etherscan or Blockscout to understand how to fetch wallet data.
For inspiration, I will check a few simple open-source examples that show how frontend apps interact with smart contracts.
