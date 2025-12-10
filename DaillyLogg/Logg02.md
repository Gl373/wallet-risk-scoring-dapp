### Daglig logg – frontend + wagmi + API-förberedelse

- **Frontend: första riktiga versionen av App.jsx**  
  - Rensade bort Vite-standardinnehåll och skrev en egen `App`-komponent med input för wallet-adress, knapp och resultat-ruta.  
  - Lade till state: `walletAddress`, `errorMessage`, `loading`, `result` och en funktion `checkRiskForWallet` som gör enkel validering av adressen (tom sträng + regex för ETH-adress).  
  - Skapade en mockad riskbedömning (`mockScore`, `mockLevel`, `mockNotes`) som visas i UI:t, så jag kan testa flödet utan riktig data ännu.  
  - Byggde en enkel, mörk layout i `App.css` med kort, rubriker och knappar – inget avancerat, men ser ut som en riktig liten dApp.

- **wagmi/viem-setup (Dag 5 från planen)**  
  - Installerade `wagmi` och `viem` i `frontend/` och skapade `wagmiConfig.js` med Base Sepolia som chain (`createConfig` + `http()` transport).  
  - Uppdaterade `main.jsx` till att wrappa hela appen i `<WagmiConfig config={wagmiConfig}>`, så jag kan använda wagmi-hooks senare för att läsa/skriva mot kontraktet.  
  - Kollade att dev-servern fortfarande startar och att UI:t funkar som innan efter ändringen.

- **Git- och .env-städning**  
  - Upptäckte att `.env`-filer inte var helt rätt hanterade (en `.env` i `frontend/` var med i repo).  
  - La till ignore-regler i `frontend/.gitignore` för `.env`/`.env.*` och säkerställde att miljöfiler inte följer med i framtida commits.  
  - Skapade en ny Alchemy-API-nyckel och uppdaterade `contract/.env` (den gamla nyckeln ska inte användas mer).  
  - Flyttade kontraktsadressen till en egen `frontend/src/config.js`, så den inte behöver ligga i `.env` och blir enklare att använda i koden.

- **Förberedelse för Dag 6 (API-anrop)**  
  - Skapade `frontend/src/alchemyApi.js` med en funktion `fetchWalletBalance(address)` som anropar Alchemy med `eth_getBalance` mot Base Sepolia (via `VITE_ALCHEMY_API_KEY`).  
  - Importerade `fetchWalletBalance` i `App.jsx`, men har **ännu inte** lagt in själva anropet i `checkRiskForWallet` eller testat det i webbläsaren.

---

### Plan för imorgon (fortsätta med Dag 6)

- **1. Koppla in Alchemy-anropet i `checkRiskForWallet`**  
  - Inne i `try`-blocket i `checkRiskForWallet`: anropa `fetchWalletBalance(walletAddress)` och logga svaret med `console.log('Alchemy balance response:', data);`.  
  - Säkerställa att rätt miljövariabel finns i `frontend/.env.local` (t.ex. `VITE_ALCHEMY_API_KEY=`) och att dev-servern läser in den.

- **2. Testa API-flödet end-to-end**  
  - Starta `npm run dev`, skriva in en Base Sepolia-plånboksadress och klicka "Check wallet".  
  - Verifiera i browserns konsol att balansen faktiskt loggas ut, och felsöka eventuella fel (fel URL, fel nyckel, CORS, osv.).

- **3. Förbereda Dag 7 (scoring-logik)**  
  - När API-anropet fungerar: tänka ut 3–5 enkla regler för risk-score baserat på data (t.ex. om balansen är 0, om adressen är ny, osv.).  
  - Skissa på en funktion `calculateRiskScore(data)` som ska användas senare för att ersätta den hårdkodade mock-"42" i frontend.
