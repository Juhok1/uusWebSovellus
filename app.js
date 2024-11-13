import mongoose from 'mongoose'
import express from 'express'
const app = express();
const port = process.env.PORT || 5000; // Määritä portti täällä

// Korvaa <username>, <password>, <cluster-url> ja <dbname> omilla arvoillasi
const uri = 'mongodb+srv://juho_k_21:zFoxV96t6mzmgcif@cluster0.vaszlwb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});
mongoose.connect(uri)
  .then(() => console.log('Yhteys MongoDB:hen onnistui!'))
  .catch(err => console.error('Yhteysvirhe:', err));
  