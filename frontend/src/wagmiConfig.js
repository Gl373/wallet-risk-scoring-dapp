import { http, createConfig } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

const ALCHEMY_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;
const BASE_SEPOLIA_RPC_URL = ALCHEMY_KEY
  ? `https://base-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`
  : undefined;

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [injected()],
  transports: {
    [baseSepolia.id]: http(BASE_SEPOLIA_RPC_URL),
  },
});
