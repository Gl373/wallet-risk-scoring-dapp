// Adress till det deployade WalletRiskScore-kontraktet på Base Sepolia
export const CONTRACT_ADDRESS = '0x6c8f25A69e3516039d9DC1531afA2bFE292d6c05';

// Förenklad ABI för WalletRiskScore-kontraktet (endast de funktioner som vi använder)
export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'getScore',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'score',
        type: 'uint256',
      },
    ],
    name: 'setScore',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];