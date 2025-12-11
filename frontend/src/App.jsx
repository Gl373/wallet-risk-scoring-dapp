import { fetchWalletBalance } from './alchemyApi';
import { calculateRiskScore } from './riskScoring';
import { useState } from 'react';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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

    setLoading(true);

    try {
      // 1. Hämta data från Alchemy för den inskrivna adressen
      const balanceData = await fetchWalletBalance(walletAddress);
      console.log('Alchemy balance response:', balanceData);

      // 2. Räkna ut risk utifrån Alchemy-datan 
      const { score, level, notes } = calculateRiskScore(balanceData);

      // 3. Visa resultatet i UI:t
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

        <div className='section'>
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
          <h2 className='subtitle'>Result</h2>
          {result ? (
            <div className='result-box'>
              <p>
                <strong>Score:</strong> {result.score} / 100
              </p>
              <p>
                <strong>Risk level:</strong> {result.level}
              </p>
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
      </div>
    </div>
  );
}

export default App;
