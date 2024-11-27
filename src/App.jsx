import { useState, useRef, useEffect } from "react"









const App = () => {
  const [registernumber, setRegisternumber] = useState('');
  const [mark, setMark] = useState('');
  const formRef = useRef(null);
  const [vehicleData, setVehicleData] = useState(null);
  const handleInput = (event) =>{
    event.preventDefault();


    

    fetch("https://localhost:5000",{
      method: "POST",
      body: new FormData(formRef.current),
    })
    .then(response => response.status(201))
    .then(data => {
      console.log("Datan lähetys onnistui")
      setRegisternumber('')
      setMark('')
    })
    .catch((error) =>{
      console.error('Error:', error)
    })
  
    setRegisternumber(''); //Tyjentää kentän lähettämisen jälkeen
    setMark('');
    console.log("Pass the information of the vehicle")};

    const fetchData = () => {
      fetch("https://localhost:5000", {
        method: "GET",
      })
        
        .then(data => {
          console.log("Datan haku onnistui", data);
          setVehicleData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
  
    // useEffect, joka hakee tiedot komponentin ladatessa
    useEffect(() => {
      fetchData();
    }, []);
    

    const handleUsernameChange = (event) => {
      setRegisternumber(event.target.value);
    };

    const handleUsernameChange2 = (event) => {
      setMark(event.target.value);
    };
  return(
  <div>
    <p>Tervetuloa autotietokantaan</p>
    <form ref={formRef} onSubmit ={handleInput} >
    <div>rekisterinumero</div>
    <input 
    value = {registernumber}
    name = "registernumber"
    onChange = {handleUsernameChange}/>
      <div>auton merkki</div>
      <input
      value = {mark}
      name = "mark"
      onChange = {handleUsernameChange2}/>
      <button type="submit">Lähetä</button>
    </form>
    <div>
        <h3>Haetut ajoneuvot:</h3>
        {vehicleData ? (
          vehicleData.map((vehicle, index) => (
            <div key={index}>
              <p>Rekisterinumero: {vehicle.registernumber}</p>
              <p>Merkki: {vehicle.mark}</p>
            </div>
          ))
        ) : (
          <p>Ei ajoneuvotietoja</p>
        )}
      </div>
  </div>
)}
export default App