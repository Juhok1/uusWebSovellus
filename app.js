import https from 'https';
import fs from 'fs';
import App from "./src/App.jsx"


App.use();
const options = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt'),
  passphrase: "", //Salasana piilotettu
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  console.log("Palvelin käynnissä portissa 5000")
  res.end(app);
}).listen(5000);