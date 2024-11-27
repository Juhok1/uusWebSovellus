import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18 käyttää `createRoot`
import './index.css';  // Täällä voidaan määrittää tyylit
import App from './App.jsx';  // App-komponentti


// React 18:n uusi renderöintitapa (root API)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderöi App-komponentti HTML-elementtiin, jonka id on 'root'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// (Valinnainen) Web vitals -suoritustiedot
