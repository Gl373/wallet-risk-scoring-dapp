### Daglig logg – Dag 10-ish: stabilisering + polish (UI states, felhantering, scoring och explorer-länkar)

- **Stabilisering i frontend (UI states / statusflöde)**  
  - La till tydliga status-texter som visar vad appen gör just nu: hämtar data från Alchemy → räknar score → skriver on-chain → väntar confirmation → läser tillbaka on-chain score → klart.  
  - Syfte: göra flödet lätt att följa i demo och minska “mystiska” väntetider.

- **Förbättrad felhantering (user-friendly)**  
  - Förbättrade `getFriendlyErrorMessage` så vanliga problem får tydliga felmeddelanden, t.ex.:
    - användaren avbryter signering (“Transaction was rejected…”)
    - fel nätverk (Base Sepolia krävs)
    - timeout / nätverksproblem
    - otillräckligt med gas (insufficient funds)
    - kontraktet avvisar score (0–100)
  - La även till tydligt fel om ingen wallet-connector hittas (om användaren saknar extension).

- **Scoring: små förbättringar (#14)**  
  - Lade till 1–2 extra regler i `riskScoring.js` som fortfarande är “juniorvänliga” och enkla att motivera:
    - “normal” testnet-balance (0.05–1 ETH) ger lite lägre risk  
    - “väldigt hög” balans (> 10 ETH) flaggas för review (+ liten riskökning)
  - Målet är inte att göra en riktig AML-modell, utan visa tydlig logik som går att förklara.

- **Remove unnecessary complexity (#18)**  
  - Städa bort onödiga loggar och duplicerad kod:
    - införde en enkel debug-toggle så `console.log` bara används i dev-läge
    - återanvände valideringsfunktionen i stället för duplicerad regex
    - lade små hjälpfunktioner för läsbarhet (t.ex. format av tx-hash)

- **UI improvements (#17)**  
  - Lade till klickbara explorer-länkar i UI under “On-chain storage status” så man kan öppna transaktionen/kontraktet direkt.  
  - Valde att köra **Basescan-only** i UI och README (tog bort Blockscout-länkar för att hålla det konsekvent).

---

### Var jag ligger nu

- Projektet har ett stabilt end-to-end flöde:  
  **input → Alchemy → scoring → setScore (on-chain) → wait confirm → getScore (on-chain) → visa i UI**.

### Nästa steg

- (Valfritt) skapa ett kort “demo script”/manus för examinering och portfolio.


