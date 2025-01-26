import React from "react";

import {useState} from "react";

import styles from "./App2.module.css"
const App2 = () => {
  const [formData, setFormData] = useState({
    rekisterinumero: "",
    merkki: "",
    malli: "",
    moottori: "",
    vetotapa: "",
    ensirekisterointi: "",
    ajokilometrit: "",
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Syötetyt tiedot:", formData);
    // Lähetä lomaketiedot palvelimelle
    fetch("https://localhost:5000/api/autot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (!response.ok) throw new Error("Virhe tiedon lähetyksessä!");
      return response.json();
    })
    .then((data) => {
      console.log("Lähetys onnistui:", data);
      // Nollataan lomake
      setFormData({
        rekisterinumero: "",
        merkki: "",
        malli: "",
        moottori: "",
        vetotapa: "",
        ensirekisterointi: "",
        ajokilometrit: "",
      });
    })
    .catch((err) => {
      console.error("Virhe:", err.message);
    });
};
  return (
    <div>
      <h1>Syötä uusi auto</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
              />
            </label>
          </div>
        ))}
        <button type="submit">Lähetä</button>
      </form>
    </div>
  );
};

export default App2;
