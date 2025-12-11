export function calculateRiskScore(alchemyData) {
    const balanceWei = BigInt(alchemyData.result);
    const balanceEth = Number(balanceWei) / 1e18; // räcker för testnet

    let score = 50;          // enkel grundnivå
    const notes = [];        // korta förklaringar som visas i UI:t

    // 0 ETH = låg/okänd risk
    if (balanceEth === 0) {
      score -= 10;
      notes.push('Wallet has 0 ETH (new or inactive account)');
    } else if (balanceEth < 0.01) {
      score += 10;
      notes.push('Wallet balance is very low (< 0.01 ETH)');
    } else if (balanceEth > 1) {
      score -= 10;
      notes.push('Wallet has healthy balance (> 1 ETH)');
    }

    if (score < 0) score = 0;
    if (score > 100) score = 100;

    const level = score < 30 ? 'Low' : score < 70 ? 'Medium' : 'High';

    return { score, level, notes };
  }