import express from "express";
import https from "https";
import fs from "fs";
import cors from "cors";
import jwt from "jsonwebtoken"; // Käytetään tokenin luontiin
import bcrypt from "bcrypt"; // Salasanojen hashaukseen

const app = express();
const vehicleDatabase = [];

// Simppeli käyttäjärekisteri (oikeassa sovelluksessa käytä tietokantaa!)
const users = [
  { username: "testi", password: bcrypt.hashSync("salasana", 10) } // Esimerkki
];

const options = {
  key: fs.readFileSync("localhost.key"),
  cert: fs.readFileSync("localhost.crt"),
  passphrase: "Pokkoti03",
};

// Middlewaret
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true })); // Käsittelee FormData-tiedot
app.use(express.json());

// **1. Kirjautumisreitti**
app.post("/login", (req, res) => {
  const { userName, passWord } = req.body;

  // Tarkistetaan käyttäjätunnus ja salasana
  const user = users.find((u) => u.username === userName);
  if (user && bcrypt.compareSync(passWord, user.password)) {
    // Luodaan JWT-token
    const token = jwt.sign({ username: user.username }, "salainen-avain", {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  }

  // Virhe, jos käyttäjätunnus tai salasana on väärä
  res.status(401).send("Virheellinen käyttäjätunnus tai salasana");
});

// **2. Ajoneuvojen haku**
app.get("/vehicles", (req, res) => {
  res.json(vehicleDatabase);
});

// **3. Lomaketietojen lähetys**
app.post("/", (req, res) => {
  console.log("Saapuva data:", req.body);
  const { registernumber, mark } = req.body;

  if (registernumber && mark) {
    vehicleDatabase.push({ registernumber, mark });
    res.status(201).send("Tieto vastaanotettu");
  } else {
    res.status(400).send("Virhe: Tietoja puuttuu");
  }
});

// **4. Oletus GET-reitti**
app.get("/", (req, res) => {
  res.json(vehicleDatabase);
});

// **HTTPS-palvelimen käynnistys**
https.createServer(options, app).listen(5000, () => {
  console.log("HTTPS-palvelin käynnissä portissa 5000");
});