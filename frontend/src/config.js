// Adress till det deployade WalletRiskScore-kontraktet på Base Sepolia
export const CONTRACT_ADDRESS = '0x2Dd80e4504E65c66a6Bc6871c238784817a0fE3a';

// Förenklad ABI för WalletRiskScore-kontraktet (endast de funktioner vi använder)
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