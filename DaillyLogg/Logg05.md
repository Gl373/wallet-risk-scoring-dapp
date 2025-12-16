### Daglig logg – Dag 9: läsa on-chain score + verifiering + polish

- **Dag 9: läsa score on-chain och visa i UI**  
  - Implementerade en read av `getScore(wallet)` i frontend med wagmi/viem.  
  - Först gjorde jag “Alternativ A” (read direkt efter write) för att förstå grunderna.  
  - Uppgraderade sedan till “Alternativ B”: vänta på att transaktionen är **confirmed** innan read görs, så att UI alltid visar rätt on-chain värde direkt efter `setScore`.  
  - Lade till en enkel statusrad i UI under “3. On-chain storage status” som visar stegen: signering → skickad → väntar confirmation → läser score → score laddad.

- **Explorer-verifiering (varför och vad som hände)**  
  - Syftet med verifiering: få “Code / Read Contract / Write Contract” i en block explorer (så det är lätt att visa och granska kontraktet).  
  - Körda kommandot `npx hardhat verify --network baseSepolia <address>`.  
  - När Basescan API-nyckel saknades fick jag fel (API key empty) för Etherscan/Basescan‑delen.  
  - Kontraktet verifierades däremot på Blockscout/Sourcify och jag kunde använda “Read Contract” och “Write Contract” där för att dubbelkolla `getScore` och `setScore`.

- **UI/UX (små förbättringar)**  
  - Förtydligade “on-chain status” så det blir lätt att demonstrera flödet under examinering/intervju.  
  - Fortsatt målet att hålla koden enkel och “juniorvänlig”, men ändå tydlig och spårbar.

---

### Var jag ligger nu

- Kedjan fungerar end-to-end i prototypen: **input → Alchemy → scoring → setScore → wait confirm → getScore → visa i UI**.

### Nästa steg

- **README/Demo**: säkerställa att README beskriver hur man kör projektet och att det finns en enkel demo-checklista.  
- **Stabilisering**: bättre felmeddelanden när användare avbryter signering, när fel nätverk är valt, eller när API/RPC inte svarar.


