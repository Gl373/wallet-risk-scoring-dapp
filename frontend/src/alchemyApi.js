const ALCHEMY_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

console.log(
  'Loaded VITE_ALCHEMY_API_KEY (frontend):',
  ALCHEMY_KEY ? `${ALCHEMY_KEY.slice(0, 6)}...` : 'MISSING'
);

const ALCHEMY_URL = `https://base-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`;

export async function fetchWalletBalance(address) {
  const body = {
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_getBalance',
    params: [address, 'latest'],
  };

  const response = await fetch(ALCHEMY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();
  return data;
}