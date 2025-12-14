import { fetchWalletBalance } from './alchemyApi';
import { calculateRiskScore } from './riskScoring';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config';
import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useWriteContract } from 'wagmi';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContractAsync } = useWriteContract();

  function isValidAddress(address) {
    // enkel koll att adressen ser ut som en ETH-adress
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  const checkRiskForWallet = async () => {
    setErrorMessage('');
    setResult(null);

    if (!walletAddress) {
      setErrorMessage('Please enter a wallet address');
      return;
    }

    if (!isValidAddress(walletAddress)) {
      setErrorMessage('Invalid wallet address');
      return;
    }

    if (!isConnected) {
      setErrorMessage('Please connect your wallet first');
      return;
    }

    setLoading(true);

    try {
      // 1. Hämta data från Alchemy för den inskrivna adressen
      const balanceData = await fetchWalletBalance(walletAddress);
      console.log('Alchemy balance response:', balanceData);

      // 2. Räkna ut risk utifrån Alchemy-datan 
      const { score, level, notes } = calculateRiskScore(balanceData);

      // 3. Spara score on-chain i WalletRiskScore-kontraktet
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'setScore',
        args: [walletAddress, BigInt(score)],
      });
      console.log('setScore tx hash:', txHash);

      // 4. Visa resultatet i UI:t
      setResult({ score, level, notes });
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('Failed to check risk. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='page'>
      <div className='card'>
        <h1 className='title'>Wallet Risk Scoring dApp</h1>
        <p className='meta-subtitle'>
          Prototype – testnet only (Base Sepolia). Educational use, not production risk assessment.
        </p>

        <div className='section meta-bar'>
          <span className='meta-text'>
            {isConnected && address
              ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
              : 'Not connected'}
          </span>
          {isConnected ? (
            <button className='button' onClick={() => disconnect()}>
              Disconnect
            </button>
          ) : (
            <button
              className='button'
              onClick={() => {
                if (connectors && connectors[0]) {
                  connect({ connector: connectors[0] });
                }
              }}>
              Connect wallet
            </button>
          )}
        </div>

        <div className='section'>
          <div className='section-title'>1. Address input</div>
          <label className='label' htmlFor='wallet'>
            Wallet address
          </label>
          <input
            id='wallet'
            type='text'
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder='0x...'
            className='input'
          />
          <button
            onClick={checkRiskForWallet}
            className='button'
            disabled={loading}>
            {loading ? 'Checking...' : 'Check wallet'}
          </button>
        </div>

        {errorMessage && <div className='error'>{errorMessage}</div>}

        <div className='section'>
          <div className='section-title'>2. Risk assessment (prototype)</div>
          <h2 className='subtitle'>Result</h2>
          {result ? (
            <div className='result-box'>
              <div className='risk-summary'>
                <strong>Score:</strong> {result.score} / 100
                <span
                  className={`risk-badge risk-badge-${result.level.toLowerCase()}`}>
                  {result.level}
                </span>
              </div>
              <p>
                <strong>Explanation:</strong>
              </p>
              <ul>
                {result.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className='placeholder'>
              No score yet. Enter a wallet and click "Check wallet".
            </p>
          )}
        </div>

        <div className='section'>
          <div className='section-title'>3. On-chain storage status</div>
          <div className='onchain-box'>
            <p>
              When you run an analysis, the calculated score is written to the{' '}
              <code>WalletRiskScore</code> contract on Base Sepolia via <code>setScore</code>.
            </p>
            <p>
              Reading the stored score back into the UI is planned as a next step in the
              prototype (on-chain read flow).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
