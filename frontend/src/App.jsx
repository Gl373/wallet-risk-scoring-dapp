import { fetchWalletBalance } from './alchemyApi';
import { calculateRiskScore } from './riskScoring';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config';
import { useState } from 'react';
import {
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
  usePublicClient,
  useReadContract,
  useWriteContract,
} from 'wagmi';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [lastTxHash, setLastTxHash] = useState(null);
  const [onChainScore, setOnChainScore] = useState(null);
  // Enkel status som hjälper oss (och examinatorn) följa on-chain flödet steg för steg
  const [onChainStatus, setOnChainStatus] = useState('Idle');

  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  // Vi läser score från kontraktet med getScore(wallet). Vi sätter enabled:false
  // så den inte spam-läser på varje keypress. I stället refetchar vi manuellt
  // direkt efter en setScore() (Alternativ A: read direkt efter write).
  const readWalletArg = /^0x[a-fA-F0-9]{40}$/.test(walletAddress)
    ? walletAddress
    : '0x0000000000000000000000000000000000000000';

  const {
    refetch: refetchOnChainScore,
    isFetching: isReadingOnChainScore,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getScore',
    args: [readWalletArg],
    query: { enabled: false },
  });

  function isValidAddress(address) {
    // enkel koll att adressen ser ut som en ETH-adress
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  const checkRiskForWallet = async () => {
    setErrorMessage('');
    setResult(null);
    setOnChainStatus('Idle');
    // Nollställ on-chain info för att UI:t inte ska visa gamla värden
    setOnChainScore(null);
    setLastTxHash(null);

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
      // (Alternativ B: vi väntar på confirmation innan vi läser tillbaka med getScore)
      setOnChainStatus('Waiting for wallet signature...');
      const txHash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'setScore',
        args: [walletAddress, BigInt(score)],
      });
      console.log('setScore tx hash:', txHash);
      setLastTxHash(txHash);

      // 4. Dag 9 (Alternativ B): Vänta tills transaktionen är mined/confirmed.
      // Varför: då kan vi direkt läsa rätt värde från kontraktet.
      setOnChainStatus('Transaction sent. Waiting for confirmation...');
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash: txHash });
      } else {
        // Bör inte hända i normalfallet, men bra med en tydlig status för felsökning
        setOnChainStatus('No RPC client available (cannot confirm tx)');
      }

      // 5. Läs on-chain score efter confirmation
      setOnChainStatus('Confirmed. Reading stored score...');
      const readResult = await refetchOnChainScore();
      if (readResult?.data != null) {
        setOnChainScore(readResult.data);
        console.log('getScore (on-chain) result:', readResult.data);
        // Visa "confirmed" först när vi faktiskt har läst tillbaka värdet.
        setOnChainStatus('Stored score loaded ✅');
      } else {
        setOnChainStatus('Confirmed, but no score returned');
      }

      // 6. Visa resultatet i UI:t
      setResult({ score, level, notes });
    } catch (err) {
      console.error('Error:', err);
      setOnChainStatus('Failed');
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
              <strong>Status:</strong> {onChainStatus}
            </p>
            <p>
              <strong>Last tx:</strong>{' '}
              {lastTxHash
                ? `${lastTxHash.slice(0, 10)}...${lastTxHash.slice(-8)}`
                : 'N/A'}
            </p>
            <p>
              <strong>Stored on-chain score:</strong>{' '}
              {isReadingOnChainScore
                ? 'Reading...'
                : onChainScore != null
                  ? `${onChainScore.toString()} / 100`
                  : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
