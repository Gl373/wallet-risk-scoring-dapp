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

    // Extra (fortfarande enkel) regel: "normal" balans tenderar att vara lägre risk än extremt låg balans.
    // Detta är en prototyp-regel och inte en riktig AML-modell.
    if (balanceEth >= 0.05 && balanceEth <= 1) {
      score -= 5;
      notes.push('Wallet has a normal testnet balance (0.05–1 ETH)');
    }

    // Extra regel: väldigt hög balans kan vara "intressant" och får en liten risk-ökning (för demo-syfte).
    if (balanceEth > 10) {
      score += 5;
      notes.push('Unusually high balance (> 10 ETH) – flagged for review');
    }

    if (score < 0) score = 0;
    if (score > 100) score = 100;

    const level = score < 30 ? 'Low' : score < 70 ? 'Medium' : 'High';

    return { score, level, notes };
  }