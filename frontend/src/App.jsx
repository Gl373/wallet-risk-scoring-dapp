import { fetchWalletBalance } from './alchemyApi';
import { calculateRiskScore } from './riskScoring';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config';
import { useState } from 'react';
import {
  useChainId,
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
  // Enkel "debug toggle": i dev (npm run dev) får vi loggar, i production blir det tyst.
  const DEBUG = import.meta.env.DEV;
  const debugLog = (...args) => {
    if (DEBUG) console.log(...args);
  };

  const [walletAddress, setWalletAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState('Idle');
  const [result, setResult] = useState(null);
  const [lastTxHash, setLastTxHash] = useState(null);
  const [onChainScore, setOnChainScore] = useState(null);
  // Enkel status som hjälper oss (och examinatorn) följa on-chain flödet steg för steg
  const [onChainStatus, setOnChainStatus] = useState('Idle');

  const chainId = useChainId();

  // wagmi v3: useAccount/connectAsync/disconnectAsync är markerade som deprecated aliases.
  // Vi använder de rekommenderade API:erna för att slippa "överstruket" i editorn.
  const { address, isConnected } = useConnection();
  const connectors = useConnectors();
  const { mutateAsync: connectWallet } = useConnect();
  const { mutateAsync: disconnectWallet } = useDisconnect();
  const { mutateAsync: writeContract } = useWriteContract();
  const publicClient = usePublicClient();

  // Vi läser score från kontraktet med getScore(wallet). Vi sätter enabled:false
  // så den inte spam-läser på varje keypress. Vi refetchar manuellt när vi behöver.
  const readWalletArg = isValidAddress(walletAddress)
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

  function formatHash(hash) {
    if (!hash) return 'N/A';
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  }

  function getExplorerLinks(txHash) {
    if (!txHash) return null;
    return {
      basescanTx: `https://sepolia.basescan.org/tx/${txHash}`,
    };
  }

  function getFriendlyErrorMessage(err) {
    // Wagmi/viem ger ofta Error-objekt med olika former. Vi gör en enkel, tydlig mapping.
    const msg = (err && typeof err === 'object' && 'message' in err && err.message)
      ? String(err.message)
      : '';

    // MetaMask/Coinbase: användaren klickade "Reject"/"Cancel"
    if (
      msg.toLowerCase().includes('user rejected') ||
      msg.toLowerCase().includes('user rejected the request') ||
      msg.toLowerCase().includes('rejected') ||
      msg.toLowerCase().includes('denied')
    ) {
      return 'Transaction was rejected in the wallet.';
    }

    if (msg.toLowerCase().includes('insufficient funds')) {
      return 'Insufficient funds for gas on Base Sepolia.';
    }

    if (msg.toLowerCase().includes('chain mismatch') || msg.toLowerCase().includes('wrong network')) {
      return 'Wrong network. Please switch your wallet to Base Sepolia.';
    }

    if (msg.toLowerCase().includes('timeout') || msg.toLowerCase().includes('timed out')) {
      return 'Network timeout. Please try again.';
    }

    if (msg.toLowerCase().includes('score must be between 0 and 100')) {
      return 'Contract rejected the score (must be between 0 and 100).';
    }

    if (msg.toLowerCase().includes('api request failed')) {
      return 'Alchemy API request failed (check API key / network).';
    }

    return 'Failed to check risk. Please try again.';
  }

  const checkRiskForWallet = async () => {
    setErrorMessage('');
    setResult(null);
    setOnChainStatus('Idle');
    setAnalysisStatus('Idle');
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

    // Bas Sepolia = 84532
    if (chainId !== 84532) {
      setErrorMessage('Wrong network. Please switch your wallet to Base Sepolia.');
      return;
    }

    setLoading(true);
    setAnalysisStatus('Fetching wallet data from Alchemy...');

    try {
      // 1. Hämta data från Alchemy för den inskrivna adressen
      const balanceData = await fetchWalletBalance(walletAddress);
      debugLog('Alchemy balance response:', balanceData);

      // 2. Räkna ut risk utifrån Alchemy-datan 
      setAnalysisStatus('Calculating risk score...');
      const { score, level, notes } = calculateRiskScore(balanceData);

      // 3. Spara score on-chain i WalletRiskScore-kontraktet
      // (Alternativ B: vi väntar på confirmation innan vi läser tillbaka med getScore)
      setAnalysisStatus('Writing score on-chain...');
      setOnChainStatus('Waiting for wallet signature...');
      const txHash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'setScore',
        args: [walletAddress, BigInt(score)],
      });
      debugLog('setScore tx hash:', txHash);
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
      setAnalysisStatus('Reading stored score from contract...');
      setOnChainStatus('Confirmed. Reading stored score...');
      const readResult = await refetchOnChainScore();
      if (readResult?.data != null) {
        setOnChainScore(readResult.data);
        debugLog('getScore (on-chain) result:', readResult.data);
        // Visa "confirmed" först när vi faktiskt har läst tillbaka värdet.
        setOnChainStatus('Stored score loaded ✅');
      } else {
        setOnChainStatus('Confirmed, but no score returned');
      }

      // 6. Visa resultatet i UI:t
      setResult({ score, level, notes });
      setAnalysisStatus('Done ✅');
    } catch (err) {
      debugLog('Error:', err);
      setOnChainStatus('Failed');
      setAnalysisStatus('Failed');
      setErrorMessage(getFriendlyErrorMessage(err));
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
            <button
              className='button'
              onClick={() => {
                // disconnectWallet returnerar en Promise, men vi behöver inte await:a här
                void disconnectWallet();
              }}>
              Disconnect
            </button>
          ) : (
            <button
              className='button'
              onClick={() => {
                const firstConnector = connectors?.[0];
                if (!firstConnector) {
                  setErrorMessage('No wallet connector found. Please install a web3 wallet extension.');
                  return;
                }
                // connectWallet returnerar en Promise, men vi behöver inte await:a här
                void connectWallet({ connector: firstConnector });
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
          <p className='meta-text'>
            <strong>Status:</strong> {analysisStatus}
          </p>
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
              {formatHash(lastTxHash)}
            </p>
            {lastTxHash && (
              <div className='onchain-links'>
                <a
                  className='onchain-link'
                  href={getExplorerLinks(lastTxHash).basescanTx}
                  target='_blank'
                  rel='noreferrer'>
                  View tx on Basescan
                </a>
                <a
                  className='onchain-link'
                  href={`https://sepolia.basescan.org/address/${CONTRACT_ADDRESS}`}
                  target='_blank'
                  rel='noreferrer'>
                  View contract on Basescan
                </a>
              </div>
            )}
            <p>
              <strong>Stored on-chain score:</strong>{' '}
              {isReadingOnChainScore
                ? 'Reading...'
                : onChainScore != null
                  ? `${onChainScore.toString()} / 100`
                  : 'N/A'}
            </p>
            {onChainScore != null && (
              <div className='success'>
                On-chain storage verified: getScore returned {onChainScore.toString()}.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
