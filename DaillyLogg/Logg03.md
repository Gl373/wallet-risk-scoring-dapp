### Daglig logg – Dag 6 fortsättning + första delen av Dag 7

- **Frontend: koppla in Alchemy på riktigt**  
  - Lade till `VITE_ALCHEMY_API_KEY` i `frontend/.env` och såg till att frontend och kontraktsdelen har separata `.env`-filer.  
  - Uppdaterade `frontend/src/alchemyApi.js` så den loggar vilket API-nyckelvärde som laddas (trunkerat) och anropar Alchemy Base Sepolia med `eth_getBalance`.  
  - Kopplade in `fetchWalletBalance` i `checkRiskForWallet` i `App.jsx` och verifierade i webbläsarens Console att balansen loggas korrekt.

- **Fix för wagmi v3 / React-setup**  
  - Upptäckte att `WagmiConfig` inte finns i `wagmi@3`, vilket gjorde att sidan blev tom.  
  - Installerade `@tanstack/react-query` och uppdaterade `main.jsx` till att använda `WagmiProvider` + `QueryClientProvider` runt `App`.  
  - Efter ändringen laddas dApp:en korrekt igen på `http://localhost:5173/`.

- **UI-justeringar**  
  - Justerade `App.css` så att `html, body, #root` täcker hela höjden och använder samma mörka bakgrund.  
  - Centrerade kortet vertikalt (`align-items: center`), vilket tar bort den stora “tomma/vita” ytan och ger mer dApp-känsla.

- **Första enkla scoringlogiken (`riskScoring.js`)**  
  - Skapade funktionen `calculateRiskScore(alchemyData)` som tar balansen från Alchemy (wei → ETH) och beräknar ett enkelt risk-score.  
  - Valde en medvetet enkel, junior-vänlig modell: startscore 50, justeringar beroende på balans:  
    - 0 ETH ⇒ −10 poäng och note: "Wallet has 0 ETH (new or inactive account)" (tolkat som låg/okänd risk, inte high).  
    - Balans < 0.01 ETH ⇒ +10 poäng och note: "Wallet balance is very low (< 0.01 ETH)".  
    - Balans > 1 ETH ⇒ −10 poäng och note: "Wallet has healthy balance (> 1 ETH)".  
  - Klampade score till 0–100 och mappade till nivåer: `<30 = Low`, `<70 = Medium`, annars `High`.  
  - Kopplade in funktionen i `checkRiskForWallet` så UI:t nu visar ett “riktigt” score och nivå baserat på Alchemy-datan i stället för hårdkodad 42.

---

### Var jag ligger nu

- Dag 6-målet (fungera API-anrop mot Alchemy och visa något meningsfullt i UI:t) är uppnått.  
- Första versionen av scoringlogik (Dag 7-del) är implementerad och känns rimlig för en junior-studentmodell.

### Plan för imorgon (Dag 7 fortsättning)

- Finputsa dokumentation: skriva kort i rapporten/loggen varför 0 ETH inte klassas som “high risk” utan snarare låg/okänd risk i min förenklade modell.  
- Flytta GitHub-kortet "Connect frontend to smart contract" till In Progress och börja koppla `checkRiskForWallet` till `WalletRiskScore`-kontraktet (skriva score on-chain och läsa tillbaka).  
- Förbereda enkel felhantering/UX för on-chain-flödet (t.ex. väntar på transaktion, avbruten transaktion, felmeddelanden).


