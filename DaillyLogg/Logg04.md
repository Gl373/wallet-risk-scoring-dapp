### Daglig logg – Dag 8: koppla frontend till smart contract + UI-justeringar

- **On-chain skrivning från frontend (`setScore`)**  
  - Laddade in kontraktets ABI och adress i `frontend/src/config.js` (`CONTRACT_ADDRESS` + förenklad `CONTRACT_ABI` för `getScore` och `setScore`).  
  - Uppdaterade `wagmiConfig` till att använda `WagmiProvider` med `injected()`‑connector, så webbläsar‑wallet (Coinbase/MetaMask) kan användas som signer.  
  - I `App.jsx` la jag till wagmi‑hooks (`useAccount`, `useConnect`, `useDisconnect`, `useWriteContract`) och ett `Connect wallet`‑flöde.  
  - Kopplade in on-chain skrivning i `checkRiskForWallet`: efter att Alchemy-balanserna hämtats och `calculateRiskScore` räknat ut score, kallas `setScore(walletAddress, score)` på `WalletRiskScore`‑kontraktet.  
  - Verifierade i browserns Console att ett riktigt `setScore tx hash: 0x...` returneras och att transaktionen går mot Base Sepolia med rätt kontraktsadress.

- **Adress- och nätverksfixar**  
  - Upptäckte fel “Address ... is invalid” från viem; berodde på att kontraktsadressen i `config.js` hade fel sista tecken (`...F E30` i stället för `...F E3a`).  
  - Korrigerade `CONTRACT_ADDRESS` till samma värde som i `workplan.md` och testade om tills felmeddelandet försvann.  
  - Säkerställde att Coinbase Wallet‑extensionen är inställd på nätverket **Base Sepolia** (samma som Hardhat‑deploy och wagmi‑konfigurationen).

- **Wallet-flöde och pedagogik**  
  - La till en tydlig "Connect wallet" / "Disconnect"‑sektion med statusrad: "Connected: 0x...." eller "Not connected".  
  - Lagt in en kontroll i `checkRiskForWallet` som kräver att användaren har en ansluten wallet innan `setScore` körs (`Please connect your wallet first`).  
  - Resonemang: skiljer på **adressen som analyseras** (inputfältet) och **adressen som signerar transaktionen** (ansluten wallet) – viktigt att kunna förklara vid examinering.

- **UI-uppdateringar med “myndighetsprototyp”-känsla**  
  - Uppdaterade `App.css` för en mörk blå/svart gradientbakgrund, mer lik ett internt analysverktyg än en “krypto-leksak”.  
  - Gav kortet en diskret blå toppborder och tyngre skugga för att se mer ut som ett seriöst dashboard-kort.  
  - Introducerade sektionstitlar:  
    - "1. Address input"  
    - "2. Risk assessment (prototype)"  
    - "3. On-chain storage status"  
  - I resultatdelen visas nu score + en liten badge för risknivå (`Low/Medium/High`) med lugna färger, samt en lista med förklarande notes.  
  - Lagt till en meta‑text under huvudrubriken: "Prototype – testnet only (Base Sepolia). Educational use, not production risk assessment." för att tydliggöra att detta är en utbildningsprototyp.

- **CSS-städning (layout-bug)**  
  - Upptäckte att `body` fortfarande var `display: flex` från Vite-standard i `index.css`, vilket gav en konstig, “ojämn” layout längst ned i vyn.  
  - Ändrade `body` till `display: block` och lät `App.css` styra layouten via `.page`, vilket gav en renare och mer förutsägbar layout.

---

### Var jag ligger nu

- Frontend kan nu:
  - Hämta balans från Alchemy (Base Sepolia) för en given adress.  
  - Räkna ut ett enkelt, regelbaserat risk-score i `calculateRiskScore`.  
  - Spara det uträknade scoret on-chain via `setScore` i `WalletRiskScore`‑kontraktet, signerat av den anslutna webbläsar-walleten.  
  - Visa ett snyggare, mer "analystool"-inspirerat gränssnitt med tydlig struktur och prototyp‑disclaimer.

- Dag 6–8 enligt arbetsplanen är i praktiken uppfyllda: API‑anrop, scoring-logik och on‑chain skrivning från frontend fungerar.

### Plan för måndag (nästa arbetsdag)

- **1. Läsa on-chain score och visa i UI (Dag 9)**  
  - Implementera en `getScore`‑read i frontend (via wagmi/viem) som hämtar värdet från `WalletRiskScore` för den aktuella adressen.  
  - Visa on‑chain score i sektionen "3. On-chain storage status" (t.ex. “Stored on-chain score: X / 100” + ev. skillnad mot nyberäknad score).  
  - Verifiera i Base Sepolia‑explorern att det sparade värdet stämmer överens med det som visas i UI:t.

- **2. Grundläggande felhantering och states**  
  - Visa tydliga meddelanden när transaktionen väntar på bekräftelse (loading), när den lyckas, och när den avbryts eller misslyckas.  
  - Förbättra befintlig `errorMessage` så att API‑fel, valideringsfel och on‑chain‑fel skiljs åt på ett begripligt sätt.

- **3. Förberedelse för presentation/rekrytering**  
  - Finjustera UI‑detaljer (små textjusteringar, spacing, ev. länkar till explorer) så applikationen känns som ett litet internt analystsverktyg.  
  - Förbereda en kort muntlig förklaring av hela flödet: "input → Alchemy → scoring → setScore on-chain → (nästa steg: read getScore)" som kan användas vid examinering och i portfolio.


