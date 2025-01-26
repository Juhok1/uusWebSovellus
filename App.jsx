  import { useState } from "react";
  import { Routes, Route, useNavigate } from "react-router-dom";
  import App2 from "./App2";
  import App3 from "./App3";

  import styles from "./App.module.css";



  const App = () => {
    const [gear, setGear] = useState(0); // Oletusvaihde
    const navigate = useNavigate(); // React Routerin navigointifunktio

    const changeGear = (newGear) => {
      setGear(newGear);
      if (newGear === 1){
        navigate("/SyotaUusiAuto"); // Navigointi reittiin

      }
      if (newGear === 2) {
        window.open("https://localhost:5000/api/autot") //Navigoi tietokannassa oleviin autoihin
      }
      if (newGear === 3){
        navigate("/autosimulaatio")
      }
      if (newGear === 4){

      }
      if (newGear === 5){
        
      }
      if (newGear === 6){
        
      }
      if (newGear === -1){
        if (window.history.length >= 1){
        navigate(-1)
      }
      else{
        window.location.href("https://localhost:5173")
      }
    }
    };

    return (
      <div className ={styles.body}>
        <h1></h1>
        {/* Vaihteen vaihtopainikkeet */}
        <div>
          <button onClick={() => changeGear(1)}>Vaihde 1</button>
          <button onClick={() => changeGear(2)}>Vaihde 2</button>
          <button onClick={() => changeGear(3)}>Vaihde 3</button>
          <button onClick={() => changeGear(-1)}>R</button>
        </div>
        <Routes>
          <Route path="/" element={<h1>Tervetuloa autotietokantaan</h1>} />
          <Route path="/SyotaUusiAuto" element={<App2 />} />
          <Route path="/AutoSimulaatio" element={<App3 />}/>
        </Routes>
      </div>
    );
  };

  export default App;
