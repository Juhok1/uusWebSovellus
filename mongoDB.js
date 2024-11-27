const mongoose = require('mongoose')
import express from 'express'
const app = express();
const port = 5000; // Määritä portti täällä
const register = process.argv[0];
const mark = process.argv[1];
const uri = "mongodb+srv://juho_k_21:h8A84q3J4.u9VAY@cluster0.vaszlwb.mongodb.net/"

app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});
mongoose.set('strictQuery', false)
mongoose.connect(uri)
  .then(() => console.log('Yhteys MongoDB:hen onnistui!'))
  .catch(err => console.error('Yhteysvirhe:', err));

const carSchema = {
  fregistrer: String,
  fmark: String
}
const Note = mongoose.model('autotietokantas',carSchema)  

const car = new Note({
  fregister: register,
  fmark: mark,
})

Note.find({}).then(result => {
  result.forEach(note =>{
    console.log(note);
  })
  mongoose.connection.close();
})
car.save()