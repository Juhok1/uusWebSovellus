## Autotietokanta

Web-sovellus, johon voi syöttää auton rekisterinumeron ja merkin. Tallennettujen autojen tietoja voi myös hakea tietokannasta.

## Ominaisuudet

-Uusien autojen lisääminen tietokantaan
-Kannan tietojen tulostus


##Teknologiat

- Frontend: [React] /JavaScript XML
- Backend: [Node.js] /JavaScript
- Protokollat: HTTPS, HTTP

##Asennus ja käyttöönotto

Sovelluksen asennus:

1. Kloonaa repositorio

2. Siirry projektikansioon

3. Asenna riippuvuudet
   -npm install
4. Käynnistä palvelin ja frontend komennoilla:
   frontend: npm run dev
   backend: node app.js
5. Palvelin käyttää HTTPS:ää, joten käyttöönottoa varten on luotava avaintiedostot
   -käytä komentoa: openssl req -nodes -new -x509 -keyout server.key -out server.cert -days 365
   -siirrä nämä tiedostot projektikansioon (huolehdi kuitenkin, että nämä tiedostot eivät päädy versionhallintaan. Tätä varten varmista, että .gitignore -tiedostossa on kirjoitettuna "server.key" ja "server.crt"
Nyt sovelluksen pitäisi olla käyttövalmis.
