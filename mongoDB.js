import express from "express"
const app = express();
const port = 5000; // Määritä portti täällä

app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});