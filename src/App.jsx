import { useState, useEffect } from "react";

const App = () => {
  const [registernumber, setRegisternumber] = useState("");
  const [mark, setMark] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const showNotification = () => {
    if (Notification.permission === "granted") {
      const notification = new Notification("Data haettu", {
        body: "Tietojen haku onnistui!",
        color: "green"
      });

      setTimeout(() => {
        notification.close();
      }, 5000);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showNotification();
        }
      });
    }
  };
  

  const handleInput = (event) => {
    event.preventDefault();

    const data = {
      registernumber,
      mark,
    };

    console.log("Lähetettävä data:", data);

    fetch("https://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Datan lähetys onnistui");
          setRegisternumber("");
          setMark("");
        } else {
          console.error("Virhe lähetyksessä:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchData = () => {
    fetch("https://localhost:5000/vehicles", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datan haku onnistui", data);
        setVehicleData(data);
        showNotification();
        setIsButtonClicked(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const handleUsernameChange = (event) => {
    setRegisternumber(event.target.value);
  };

  const handleUsernameChange2 = (event) => {
    setMark(event.target.value);
  };

  

  return (
    <div>
      <p>Tervetuloa autotietokantaan</p>
      <form onSubmit={handleInput}>
        <div>rekisterinumero</div>
        <input
          value={registernumber}
          name="registernumber"
          onChange={handleUsernameChange}
        />
        <div>auton merkki</div>
        <input value={mark} name="mark" onChange={handleUsernameChange2} />
        <button type="submit">Lähetä</button>
      </form>
      <div>
  <button id="fetchbutton" onClick={fetchData}>Hae</button>
  {vehicleData ? (
    <div>
      <h2>Ajoneuvotiedot:</h2>
      <ul>
        {vehicleData.map((vehicle, index) => (
          <li key={index}>
            Rekisterinumero: {vehicle.registernumber}, Merkki: {vehicle.mark}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>Ei ajoneuvotietoja</p>
  )}
</div>
</div>
)}
export default App;
