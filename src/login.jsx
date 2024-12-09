import { useNavigate } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Routerin navigointiin

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Huom: JSON, ei "JSON"
        },
        body: JSON.stringify({ userName, passWord }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token); // Tallennetaan token
        alert("Kirjautuminen onnistui");
        setAuth(true);
        navigate("/"); // Ohjaus pääsivulle
      } else {
        setError("Virheellinen käyttäjätunnus tai salasana");
      }
    } catch (error) {
      console.error("Virhe kirjautumisessa:", error);
      setError("Jotain meni pieleen. Yritä uudelleen.");
    }
  };

  return (
    <div>
      <h2>Kirjaudu sisään</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Vaihdetaan punaiseksi virheilmoituksille */}
      <form onSubmit={handleLogin}>
        <div>
          <label>Käyttäjätunnus: </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Salasana: </label>
          <input
            type="password" // Vaihdettu type
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            required
          />
        </div>
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  );
};
export default Login;