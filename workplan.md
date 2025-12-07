# Arbetsplan – Wallet Risk Scoring dApp

## 1. Översikt och mål

- **Huvudmål**: Få en fungerande dApp där användaren kan skriva in en wallet-adress, få en enkel risk-score, spara den on-chain och läsa ut den igen.
- **Fokus**: Funktion före design. Enkel, stabil MVP som du förstår och kan demonstrera.
- **Teknisk kedja**: React → API (Alchemy/Etherscan/Blockscout) → enkel rule-based scoring i frontend → spara score i smart contract → läsa score → visa score + kort förklaring i UI.

## 2. MVP-scope (måste ha)

- **Smart contract / on-chain**
  - Hardhat-projekt fungerar (compile, test, deploy).
  - Kontrakt `WalletRiskScore` med:
    - Funktion för att spara score för en given wallet-adress.
    - Funktion för att läsa score för en given wallet-adress.
  - Deployat till Base Sepolia, med sparad kontraktsadress.

- **Frontend**
  - React-app (Vite eller CRA) med grundstruktur.
  - Input-fält för wallet-adress + knapp för att trigga risk-analys.
  - Anrop till publik API (Alchemy/Etherscan/Blockscout) för att hämta enkel data (t.ex. antal transaktioner).
  - Enkel rule-based scoring (3–5 regler, t.ex. låg/medium/hög risk).
  - Anropa kontraktet för att spara score.
  - Läsa score från kontraktet och visa:
    - Numerisk score.
    - Kort text (t.ex. "Low risk", "Medium risk", "High risk").

- **Övrigt**
  - Kort README som beskriver hur man kör projektet och hur flödet fungerar.
  - Enkel demo-story (hur du visar upp dAppen).

## 3. Plan före 20 december – tunga delar klara

Målet är att senast 20/12 ha hela kedjan fungerande minst en gång, även om UI är enkelt.

### Dag 1 – Kontrollera setup + Hardhat-grunder

**Mål:** Ha ett fungerande kontrakts-projekt (Hardhat) där du kan kompilera utan fel.

- Öppna projektet i editor och terminal.
- Kontrollera `node -v` och `npm -v`.
- Gå till `contract/` och kör `npm install` (om inte redan gjort).
- Kör `npx hardhat compile` och lös ev. fel tills det går igenom.
- Skriv 3–5 meningar i din dagliga logg om vad som funkar/inte funkar.

### Dag 2 – Minimal `WalletRiskScore`-kontrakt

**Mål:** Ha ett enkelt kontrakt som kompilerar med funktioner för att spara och läsa score.

- Designa minimalt kontrakt (i text):
  - Vilka fält behövs? (wallet, score, ev. explanation).
  - Vilka funktioner behövs? (t.ex. `setScore`, `getScore`).
- Implementera första versionen i `contract/contracts/WalletRiskScore.sol`.
- Kör `npx hardhat compile` tills det går igenom.
- (Bonus) Enkel lokal interaktion via script eller test.
- Reflektera kort: Förstår du vad kontraktet gör rad för rad? Vad vill du förbättra senare?

### Dag 3 – Deploy till Base Sepolia (första gång)

**Mål:** Kunna deploya kontraktet till Base Sepolia och få en kontraktsadress.

- Gå igenom `contract/scripts/deploy.ts` och förstå huvudstegen.
- Konfigurera nödvändig RPC-URL och private key via `.env` (inte commit).
- Kör deploy-kommandot (t.ex. `npx hardhat run scripts/deploy.ts --network baseSepolia`).
- Spara kontraktsadressen i ett dokument (t.ex. här eller i README).
- Verifiera i block explorer att kontraktet finns (om möjligt).

### Dag 4 – Skapa frontend-skelett

**Mål:** Ha en enkel React-app igång med grundlayout.

- Skapa/öppna `frontend/`-projektet.
- Säkerställ att `npm install` fungerar och att dev-servern kan startas.
- Lägg till en enkel sida med:
  - Input-fält för wallet-adress.
  - En knapp, t.ex. "Check risk".
- Skriv i loggen vad som känns tydligt/otydligt med React-delen.

### Dag 5 – Koppla in wagmi/viem + Base Sepolia

**Mål:** Frontend kan prata med Base Sepolia (åtminstone läsa enklare saker).

- Installera `wagmi` och `viem` i frontend.
- Konfigurera en `WagmiConfig` med Base Sepolia.
- Testa en enkel hook (t.ex. läsa chain-id eller liknande) för att se att anslutningen funkar.

### Dag 6 – API-anrop till Alchemy/Etherscan/Blockscout

**Mål:** Frontend hämtar någon enkel data om en wallet via API och loggar det i konsolen.

- Skapa en funktion som tar en wallet-adress och anropar vald API-tjänst.
- Använd en hårdkodad adress först för att förenkla.
- Logga svar-datat i konsolen och identifiera en eller två datapunkter du vill använda för risk-score.

### Dag 7 – Första version av scoring-logik

**Mål:** Ha en enkel funktion i frontend som tar API-datat och returnerar ett score + label.

- Definiera 3–5 enkla regler (t.ex. baserat på tx count eller annan enkel parameter).
- Implementera en funktion `calculateRiskScore(data)` som returnerar:
  - Numeriskt score (t.ex. 0–100).
  - Label (Low/Medium/High).
  - Kort textförklaring.
- Koppla denna funktion till din knapp i UI (men utan kontrakt-anrop än).

### Dag 8 – Spara score on-chain från frontend

**Mål:** När användaren kör analys ska frontend kalla `setScore` i kontraktet.

- Koppla in kontraktsadressen och ABI i frontend.
- Använd wagmi/viem för att göra ett write-anrop till kontraktet.
- Testa med en känd adress och se i block explorer att transaktionen gått igenom.

### Dag 9 – Läsa score on-chain och visa i UI

**Mål:** Frontend kan läsa score från kontraktet och visa det för användaren.

- Implementera en read-funktion (`getScore`) via wagmi/viem.
- Visa det returnerade scoret + label i UI efter att transaktionen är klar.
- Säkerställ att flödet fungerar: input → API → scoring → write → read → visa.

### Dag 10 – Stabilisering + enkel dokumentation

**Mål:** Ha ett fungerande end-to-end-flöde och en första README.

- Kör igenom hela kedjan flera gånger med olika adresser.
- Fixa de mest kritiska buggarna (krascher, tomma inputs etc.).
- Skriv en enkel README med:
  - Projektbeskrivning.
  - Hur man startar contract + frontend.
  - Kort teknisk beskrivning av flödet.

## 4. Efter 20 december – lättare förbättringar (om tid finns)

- UI-förbättringar (färger, layout, tydligare states för loading/error/success).
- Förbättra scoring-logiken (fler regler, bättre thresholds).
- Mer genomarbetad felhantering (t.ex. när API eller nätverk inte svarar).
- Mer dokumentation och kommentarer i koden.
- Förbereda och träna på demo-flödet (skriva manus, testa presentationen).
