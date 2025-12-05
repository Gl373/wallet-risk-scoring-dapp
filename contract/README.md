![Hackathon-3-banner](/banner.png)
![Hackathon-3-overview](/overview.png)

# AMPD Labs - Profile Factory Template Contract
Getting started with Solidity and Foundry. _We will build a smart contract using a FactoryPattern, deploy it to the Base blockchain on the Sepolia testnet and interact with the smart contract through base scan._

## ⚙️ Prerequisites 
_Before we start there are a few things you need to do._
* Create Coinbase Wallet - https://www.coinbase.com/wallet/articles/getting-started-extension#create-a-new-wallet
* Fund wallet with Base Sepolia from Faucet - https://www.alchemy.com/faucets/base-sepolia
* Go to https://basescan.org/register and sign up
* Then go and create an API key at: https://basescan.org/myapikey
* Create a file called `.env` in the project root with the following content:
```bash
BASE_SEPOLIA_RPC=https://sepolia.base.org
BASESCAN_API_KEY=your_api_key_here
```
* Copy your BaseScan API key into the `BASESCAN_API_KEY` field in the `.env` file
* Install Foundry: `curl -L https://foundry.paradigm.xyz | bash`
* VSCode setup: https://book.getfoundry.sh/config/vscode
* If you are on Windows look into the remappings.txt file and update the paths.

## 📝 Environment Setup
_Load environment variables before deployment_

1. Load the environment variables:
```bash
source .env
```

2. Verify variables are loaded:
```bash
echo $BASE_SEPOLIA_RPC
echo $BASESCAN_API_KEY
```

3. If you see the URLs and API key, you're ready to deploy!

## ✨Notes (for Base Sepolia Testnet)
_Setting up deployer_

🚨 You will need the private key from your coinbase wallet (NEVER show this to anyone EVER!).
🔐 When you have your private key run the command below to store your private key in an encrypted state on your local machine.
```
cast wallet import deployer --interactive
```
To get your private key go to your CoinBase Wallet > Settings > Show Private Key. Paste it to the terminal after running the command and then set a password.

## 🚀 Deployment 
```bash
forge create ./src/PurpleProofRegistry.sol:PurpleProofRegistry --rpc-url $BASE_SEPOLIA_RPC --account deployer --verify --etherscan-api-key $BASESCAN_API_KEY --broadcast
```

## Verification of contract deployed by contract ✅
```bash
# Encode constructor args
cast abi-encode "constructor(string,string,string[])" "test" "test" '[]'

# Verify
forge verify-contract --rpc-url $BASE_SEPOLIA_RPC --compiler-version 0.8.24 \
  --optimizer-runs 200 --constructor-args 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000474657374000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
0x294c8bEAD4385040B61C079349609cbA0537614E src/Profile.sol:Profile --etherscan-api-key $BASESCAN_API_KEY
```# Sample Hardhat 3 Beta Project (minimal)
![Hackathon-3-banner](/banner.png)
![Hackathon-3-overview](/overview.png)

# AMPD Labs - Profile Factory Template Contract
Getting started with Solidity and Foundry. _We will build a smart contract using a FactoryPattern, deploy it to the Base blockchain on the Sepolia testnet and interact with the smart contract through base scan._

## ⚙️ Prerequisites 
_Before we start there are a few things you need to do._
* Create Coinbase Wallet - https://www.coinbase.com/wallet/articles/getting-started-extension#create-a-new-wallet
* Fund wallet with Base Sepolia from Faucet - https://www.alchemy.com/faucets/base-sepolia
* Go to https://basescan.org/register and sign up
* Then go and create an API key at: https://basescan.org/myapikey
* Create a file called `.env` in the project root with the following content:
```bash
BASE_SEPOLIA_RPC=https://sepolia.base.org
BASESCAN_API_KEY=your_api_key_here
```
* Copy your BaseScan API key into the `BASESCAN_API_KEY` field in the `.env` file
* Install Foundry: `curl -L https://foundry.paradigm.xyz | bash`
* VSCode setup: https://book.getfoundry.sh/config/vscode
* If you are on Windows look into the remappings.txt file and update the paths.

## 📝 Environment Setup
_Load environment variables before deployment_

1. Load the environment variables:
```bash
source .env
```

2. Verify variables are loaded:
```bash
echo $BASE_SEPOLIA_RPC
echo $BASESCAN_API_KEY
```

3. If you see the URLs and API key, you're ready to deploy!

## ✨Notes (for Base Sepolia Testnet)
_Setting up deployer_

🚨 You will need the private key from your coinbase wallet (NEVER show this to anyone EVER!).
🔐 When you have your private key run the command below to store your private key in an encrypted state on your local machine.
```
cast wallet import deployer --interactive
```
To get your private key go to your CoinBase Wallet > Settings > Show Private Key. Paste it to the terminal after running the command and then set a password.

## 🚀 Deployment 
```bash
forge create ./src/PurpleProofRegistry.sol:PurpleProofRegistry --rpc-url $BASE_SEPOLIA_RPC --account deployer --verify --etherscan-api-key $BASESCAN_API_KEY --broadcast
```

## Verification of contract deployed by contract ✅
```bash
# Encode constructor args
cast abi-encode "constructor(string,string,string[])" "test" "test" '[]'

# Verify
forge verify-contract --rpc-url $BASE_SEPOLIA_RPC --compiler-version 0.8.24 \
  --optimizer-runs 200 --constructor-args 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000474657374000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
0x294c8bEAD4385040B61C079349609cbA0537614E src/Profile.sol:Profile --etherscan-api-key $BASESCAN_API_KEY
```
![Hackathon-3-banner](/banner.png)
![Hackathon-3-overview](/overview.png)

# AMPD Labs - Profile Factory Template Contract
Getting started with Solidity and Foundry. _We will build a smart contract using a FactoryPattern, deploy it to the Base blockchain on the Sepolia testnet and interact with the smart contract through base scan._

## ⚙️ Prerequisites 
_Before we start there are a few things you need to do._
* Create Coinbase Wallet - https://www.coinbase.com/wallet/articles/getting-started-extension#create-a-new-wallet
* Fund wallet with Base Sepolia from Faucet - https://www.alchemy.com/faucets/base-sepolia
* Go to https://basescan.org/register and sign up
* Then go and create an API key at: https://basescan.org/myapikey
* Create a file called `.env` in the project root with the following content:
```bash
BASE_SEPOLIA_RPC=https://sepolia.base.org
BASESCAN_API_KEY=your_api_key_here
```
* Copy your BaseScan API key into the `BASESCAN_API_KEY` field in the `.env` file
* Install Foundry: `curl -L https://foundry.paradigm.xyz | bash`
* VSCode setup: https://book.getfoundry.sh/config/vscode
* If you are on Windows look into the remappings.txt file and update the paths.

## 📝 Environment Setup
_Load environment variables before deployment_

1. Load the environment variables:
```bash
source .env
```

2. Verify variables are loaded:
```bash
echo $BASE_SEPOLIA_RPC
echo $BASESCAN_API_KEY
```

3. If you see the URLs and API key, you're ready to deploy!

## ✨Notes (for Base Sepolia Testnet)
_Setting up deployer_

🚨 You will need the private key from your coinbase wallet (NEVER show this to anyone EVER!).
🔐 When you have your private key run the command below to store your private key in an encrypted state on your local machine.
```
cast wallet import deployer --interactive
```
To get your private key go to your CoinBase Wallet > Settings > Show Private Key. Paste it to the terminal after running the command and then set a password.

## 🚀 Deployment 
```bash
forge create ./src/PurpleProofRegistry.sol:PurpleProofRegistry --rpc-url $BASE_SEPOLIA_RPC --account deployer --verify --etherscan-api-key $BASESCAN_API_KEY --broadcast
```

## Verification of contract deployed by contract ✅
```bash
# Encode constructor args
cast abi-encode "constructor(string,string,string[])" "test" "test" '[]'

# Verify
forge verify-contract --rpc-url $BASE_SEPOLIA_RPC --compiler-version 0.8.24 \
  --optimizer-runs 200 --constructor-args 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000474657374000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
0x294c8bEAD4385040B61C079349609cbA0537614E src/Profile.sol:Profile --etherscan-api-key $BASESCAN_API_KEY
```This project has a minimal setup of Hardhat 3 Beta, without any plugins.
![Hackathon-3-banner](/banner.png)
![Hackathon-3-overview](/overview.png)

# AMPD Labs - Profile Factory Template Contract
Getting started with Solidity and Foundry. _We will build a smart contract using a FactoryPattern, deploy it to the Base blockchain on the Sepolia testnet and interact with the smart contract through base scan._

## ⚙️ Prerequisites 
_Before we start there are a few things you need to do._
* Create Coinbase Wallet - https://www.coinbase.com/wallet/articles/getting-started-extension#create-a-new-wallet
* Fund wallet with Base Sepolia from Faucet - https://www.alchemy.com/faucets/base-sepolia
* Go to https://basescan.org/register and sign up
* Then go and create an API key at: https://basescan.org/myapikey
* Create a file called `.env` in the project root with the following content:
```bash
BASE_SEPOLIA_RPC=https://sepolia.base.org
BASESCAN_API_KEY=your_api_key_here
```
* Copy your BaseScan API key into the `BASESCAN_API_KEY` field in the `.env` file
* Install Foundry: `curl -L https://foundry.paradigm.xyz | bash`
* VSCode setup: https://book.getfoundry.sh/config/vscode
* If you are on Windows look into the remappings.txt file and update the paths.

## 📝 Environment Setup
_Load environment variables before deployment_

1. Load the environment variables:
```bash
source .env
```

2. Verify variables are loaded:
```bash
echo $BASE_SEPOLIA_RPC
echo $BASESCAN_API_KEY
```

3. If you see the URLs and API key, you're ready to deploy!

## ✨Notes (for Base Sepolia Testnet)
_Setting up deployer_

🚨 You will need the private key from your coinbase wallet (NEVER show this to anyone EVER!).
🔐 When you have your private key run the command below to store your private key in an encrypted state on your local machine.
```
cast wallet import deployer --interactive
```
To get your private key go to your CoinBase Wallet > Settings > Show Private Key. Paste it to the terminal after running the command and then set a password.

## 🚀 Deployment 
```bash
forge create ./src/PurpleProofRegistry.sol:PurpleProofRegistry --rpc-url $BASE_SEPOLIA_RPC --account deployer --verify --etherscan-api-key $BASESCAN_API_KEY --broadcast
```

## Verification of contract deployed by contract ✅
```bash
# Encode constructor args
cast abi-encode "constructor(string,string,string[])" "test" "test" '[]'

# Verify
forge verify-contract --rpc-url $BASE_SEPOLIA_RPC --compiler-version 0.8.24 \
  --optimizer-runs 200 --constructor-args 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000474657374000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
0x294c8bEAD4385040B61C079349609cbA0537614E src/Profile.sol:Profile --etherscan-api-key $BASESCAN_API_KEY
```
![Hackathon-3-banner](/banner.png)
![Hackathon-3-overview](/overview.png)

# AMPD Labs - Profile Factory Template Contract
Getting started with Solidity and Foundry. _We will build a smart contract using a FactoryPattern, deploy it to the Base blockchain on the Sepolia testnet and interact with the smart contract through base scan._

## ⚙️ Prerequisites 
_Before we start there are a few things you need to do._
* Create Coinbase Wallet - https://www.coinbase.com/wallet/articles/getting-started-extension#create-a-new-wallet
* Fund wallet with Base Sepolia from Faucet - https://www.alchemy.com/faucets/base-sepolia
* Go to https://basescan.org/register and sign up
* Then go and create an API key at: https://basescan.org/myapikey
* Create a file called `.env` in the project root with the following content:
```bash
BASE_SEPOLIA_RPC=https://sepolia.base.org
BASESCAN_API_KEY=your_api_key_here
```
* Copy your BaseScan API key into the `BASESCAN_API_KEY` field in the `.env` file
* Install Foundry: `curl -L https://foundry.paradigm.xyz | bash`
* VSCode setup: https://book.getfoundry.sh/config/vscode
* If you are on Windows look into the remappings.txt file and update the paths.

## 📝 Environment Setup
_Load environment variables before deployment_

1. Load the environment variables:
```bash
source .env
```

2. Verify variables are loaded:
```bash
echo $BASE_SEPOLIA_RPC
echo $BASESCAN_API_KEY
```

3. If you see the URLs and API key, you're ready to deploy!

## ✨Notes (for Base Sepolia Testnet)
_Setting up deployer_

🚨 You will need the private key from your coinbase wallet (NEVER show this to anyone EVER!).
🔐 When you have your private key run the command below to store your private key in an encrypted state on your local machine.
```
cast wallet import deployer --interactive
```
To get your private key go to your CoinBase Wallet > Settings > Show Private Key. Paste it to the terminal after running the command and then set a password.

## 🚀 Deployment 
```bash
forge create ./src/PurpleProofRegistry.sol:PurpleProofRegistry --rpc-url $BASE_SEPOLIA_RPC --account deployer --verify --etherscan-api-key $BASESCAN_API_KEY --broadcast
```

## Verification of contract deployed by contract ✅
```bash
# Encode constructor args
cast abi-encode "constructor(string,string,string[])" "test" "test" '[]'

# Verify
forge verify-contract --rpc-url $BASE_SEPOLIA_RPC --compiler-version 0.8.24 \
  --optimizer-runs 200 --constructor-args 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000474657374000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
0x294c8bEAD4385040B61C079349609cbA0537614E src/Profile.sol:Profile --etherscan-api-key $BASESCAN_API_KEY
```## What's included?
![Hackathon-3-banner](/banner.png)
![Hackathon-3-overview](/overview.png)

# AMPD Labs - Profile Factory Template Contract
Getting started with Solidity and Foundry. _We will build a smart contract using a FactoryPattern, deploy it to the Base blockchain on the Sepolia testnet and interact with the smart contract through base scan._

## ⚙️ Prerequisites 
_Before we start there are a few things you need to do._
* Create Coinbase Wallet - https://www.coinbase.com/wallet/articles/getting-started-extension#create-a-new-wallet
* Fund wallet with Base Sepolia from Faucet - https://www.alchemy.com/faucets/base-sepolia
* Go to https://basescan.org/register and sign up
* Then go and create an API key at: https://basescan.org/myapikey
* Create a file called `.env` in the project root with the following content:
```bash
BASE_SEPOLIA_RPC=https://sepolia.base.org
BASESCAN_API_KEY=your_api_key_here
```
* Copy your BaseScan API key into the `BASESCAN_API_KEY` field in the `.env` file
* Install Foundry: `curl -L https://foundry.paradigm.xyz | bash`
* VSCode setup: https://book.getfoundry.sh/config/vscode
* If you are on Windows look into the remappings.txt file and update the paths.

## 📝 Environment Setup
_Load environment variables before deployment_

1. Load the environment variables:
```bash
source .env
```

2. Verify variables are loaded:
```bash
echo $BASE_SEPOLIA_RPC
echo $BASESCAN_API_KEY
```

3. If you see the URLs and API key, you're ready to deploy!

## ✨Notes (for Base Sepolia Testnet)
_Setting up deployer_

🚨 You will need the private key from your coinbase wallet (NEVER show this to anyone EVER!).
🔐 When you have your private key run the command below to store your private key in an encrypted state on your local machine.
```
cast wallet import deployer --interactive
```
To get your private key go to your CoinBase Wallet > Settings > Show Private Key. Paste it to the terminal after running the command and then set a password.

## 🚀 Deployment 
```bash
forge create ./src/PurpleProofRegistry.sol:PurpleProofRegistry --rpc-url $BASE_SEPOLIA_RPC --account deployer --verify --etherscan-api-key $BASESCAN_API_KEY --broadcast
```

## Verification of contract deployed by contract ✅
```bash
# Encode constructor args
cast abi-encode "constructor(string,string,string[])" "test" "test" '[]'

# Verify
forge verify-contract --rpc-url $BASE_SEPOLIA_RPC --compiler-version 0.8.24 \
  --optimizer-runs 200 --constructor-args 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000474657374000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
0x294c8bEAD4385040B61C079349609cbA0537614E src/Profile.sol:Profile --etherscan-api-key $BASESCAN_API_KEY
```
![Hackathon-3-banner](/banner.png)
![Hackathon-3-overview](/overview.png)

# AMPD Labs - Profile Factory Template Contract
Getting started with Solidity and Foundry. _We will build a smart contract using a FactoryPattern, deploy it to the Base blockchain on the Sepolia testnet and interact with the smart contract through base scan._

## ⚙️ Prerequisites 
_Before we start there are a few things you need to do._
* Create Coinbase Wallet - https://www.coinbase.com/wallet/articles/getting-started-extension#create-a-new-wallet
* Fund wallet with Base Sepolia from Faucet - https://www.alchemy.com/faucets/base-sepolia
* Go to https://basescan.org/register and sign up
* Then go and create an API key at: https://basescan.org/myapikey
* Create a file called `.env` in the project root with the following content:
```bash
BASE_SEPOLIA_RPC=https://sepolia.base.org
BASESCAN_API_KEY=your_api_key_here
```
* Copy your BaseScan API key into the `BASESCAN_API_KEY` field in the `.env` file
* Install Foundry: `curl -L https://foundry.paradigm.xyz | bash`
* VSCode setup: https://book.getfoundry.sh/config/vscode
* If you are on Windows look into the remappings.txt file and update the paths.

## 📝 Environment Setup
_Load environment variables before deployment_

1. Load the environment variables:
```bash
source .env
```

2. Verify variables are loaded:
```bash
echo $BASE_SEPOLIA_RPC
echo $BASESCAN_API_KEY
```

3. If you see the URLs and API key, you're ready to deploy!

## ✨Notes (for Base Sepolia Testnet)
_Setting up deployer_

🚨 You will need the private key from your coinbase wallet (NEVER show this to anyone EVER!).
🔐 When you have your private key run the command below to store your private key in an encrypted state on your local machine.
```
cast wallet import deployer --interactive
```
To get your private key go to your CoinBase Wallet > Settings > Show Private Key. Paste it to the terminal after running the command and then set a password.

## 🚀 Deployment 
```bash
forge create ./src/PurpleProofRegistry.sol:PurpleProofRegistry --rpc-url $BASE_SEPOLIA_RPC --account deployer --verify --etherscan-api-key $BASESCAN_API_KEY --broadcast
```

## Verification of contract deployed by contract ✅
```bash
# Encode constructor args
cast abi-encode "constructor(string,string,string[])" "test" "test" '[]'

# Verify
forge verify-contract --rpc-url $BASE_SEPOLIA_RPC --compiler-version 0.8.24 \
  --optimizer-runs 200 --constructor-args 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000474657374000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
0x294c8bEAD4385040B61C079349609cbA0537614E src/Profile.sol:Profile --etherscan-api-key $BASESCAN_API_KEY
```The project includes native support for TypeScript, Hardhat scripts, tasks, and support for Solidity compilation and tests.
![Hackathon-3-banner](/banner.png)
![Hackathon-3-overview](/overview.png)

# AMPD Labs - Profile Factory Template Contract
Getting started with Solidity and Foundry. _We will build a smart contract using a FactoryPattern, deploy it to the Base blockchain on the Sepolia testnet and interact with the smart contract through base scan._

## ⚙️ Prerequisites 
_Before we start there are a few things you need to do._
* Create Coinbase Wallet - https://www.coinbase.com/wallet/articles/getting-started-extension#create-a-new-wallet
* Fund wallet with Base Sepolia from Faucet - https://www.alchemy.com/faucets/base-sepolia
* Go to https://basescan.org/register and sign up
* Then go and create an API key at: https://basescan.org/myapikey
* Create a file called `.env` in the project root with the following content:
```bash
BASE_SEPOLIA_RPC=https://sepolia.base.org
BASESCAN_API_KEY=your_api_key_here
```
* Copy your BaseScan API key into the `BASESCAN_API_KEY` field in the `.env` file
* Install Foundry: `curl -L https://foundry.paradigm.xyz | bash`
* VSCode setup: https://book.getfoundry.sh/config/vscode
* If you are on Windows look into the remappings.txt file and update the paths.

## 📝 Environment Setup
_Load environment variables before deployment_

1. Load the environment variables:
```bash
source .env
```

2. Verify variables are loaded:
```bash
echo $BASE_SEPOLIA_RPC
echo $BASESCAN_API_KEY
```

3. If you see the URLs and API key, you're ready to deploy!

## ✨Notes (for Base Sepolia Testnet)
_Setting up deployer_

🚨 You will need the private key from your coinbase wallet (NEVER show this to anyone EVER!).
🔐 When you have your private key run the command below to store your private key in an encrypted state on your local machine.
```
cast wallet import deployer --interactive
```
To get your private key go to your CoinBase Wallet > Settings > Show Private Key. Paste it to the terminal after running the command and then set a password.

## 🚀 Deployment 
```bash
forge create ./src/PurpleProofRegistry.sol:PurpleProofRegistry --rpc-url $BASE_SEPOLIA_RPC --account deployer --verify --etherscan-api-key $BASESCAN_API_KEY --broadcast
```

## Verification of contract deployed by contract ✅
```bash
# Encode constructor args
cast abi-encode "constructor(string,string,string[])" "test" "test" '[]'

# Verify
forge verify-contract --rpc-url $BASE_SEPOLIA_RPC --compiler-version 0.8.24 \
  --optimizer-runs 200 --constructor-args 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000474657374000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 \
0x294c8bEAD4385040B61C079349609cbA0537614E src/Profile.sol:Profile --etherscan-api-key $BASESCAN_API_KEY
```