# Uitslagen delen tussen apparaten (Google Sheet)

De app bewaart uitslagen standaard alleen in de browser. Met deze koppeling komen ze in een Google Sheet en zien alle apparaten dezelfde stand. De Sheet kan je ook zelf openen voor eigen analyses.

## 1. Sheet en script maken (eenmalig, ongeveer 5 minuten)

1. Maak een nieuwe Google Sheet (sheets.new). De naam maakt niet uit.
2. Kies **Extensies → Apps Script**.
3. Verwijder de voorbeeldcode en plak de inhoud van `apps-script/Code.gs` uit deze repo.
4. Verander bovenin `TOKEN` van `'VERANDER-MIJ'` naar een eigen wachtwoord (bijvoorbeeld een willekeurige reeks letters en cijfers). Bewaar het wachtwoord, je hebt het straks nodig.
5. Klik op **Implementeren → Nieuwe implementatie**, kies het type **Web-app** en stel in:
   - Uitvoeren als: **Ik**
   - Wie heeft toegang: **Iedereen**
6. Klik op **Implementeren** en geef toestemming wanneer Google erom vraagt.
7. Kopieer de **Web-app-URL** (begint met `https://script.google.com/macros/s/...`).

Het tabblad "Wedstrijden" wordt automatisch aangemaakt bij de eerste synchronisatie.

Wijzig je later de code, kies dan **Implementeren → Implementaties beheren → Bewerken → Nieuwe versie**. Anders blijft de oude versie actief.

## 2. App koppelen

1. Open de app, ga naar **Stand → Synchroniseren tussen apparaten**.
2. Plak de Web-app-URL en het wachtwoord en klik op **Koppel**.
3. Bestaande uitslagen op dit apparaat worden meteen naar de Sheet gestuurd.
4. Open de koppellink die daarna in hetzelfde blok staat op je andere apparaten, dan zijn die ook gekoppeld.

## Goed om te weten

- **Werkt niet in een claude.ai-artifact.** Die omgeving blokkeert verbindingen naar Google. De koppeling werkt in de app op een eigen webadres, bijvoorbeeld GitHub Pages (Settings → Pages → branch en map `/ (root)`; een gratis Pages-site heeft een publieke repo nodig).
- **Beveiliging.** Wie de Web-app-URL én het wachtwoord kent, kan de uitslagen lezen en wijzigen. De koppellink bevat beide. Deel hem alleen met de groep.
- **Offline.** Lukt synchroniseren niet, dan blijven wijzigingen lokaal staan en worden ze bij de volgende synchronisatie alsnog verstuurd.
- **Namen** mogen geen komma bevatten; de Sheet bewaart de spelers per team gescheiden door komma's.
- Wedstrijden die je direct in de Sheet wijzigt of verwijdert, verschijnen bij de volgende synchronisatie in de app.
