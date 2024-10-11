import { useEffect } from "react";
import "./App.css";
import CountryCard from "./Components/CountryCard/Card";
import { useContext } from "react";
import { GlobalContext } from "./Context/Globalstate";
import { Grid2 } from "@mui/material";
import { Link } from "react-router-dom";
function App() {
  const global = useContext(GlobalContext);
  useEffect(() => {
    global?.getCountries();
  }, []);

  return (
    <div className="homeDiv">
      {global?.availableCountries.map((c) => (
        <Link to={"/" + c.name}>
          <CountryCard key={c.name} countryName={c.name} flag={c.flag} />
        </Link>
      ))}
    </div>
  );
}

export default App;
