import Typography from "@mui/material/Typography";
import { Divider, Paper } from "@mui/material";
import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../Context/Globalstate";
import { useParams, useNavigate } from "react-router-dom";
import CountryCard from "../CountryCard/Card";
import { Link } from "react-router-dom";
import "../../App.css";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DetailsPage() {
  const global = useContext(GlobalContext);
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    global?.getCountries();
    if (country) {
      global?.getCountriesDetails(country);
    } else navigate("/");
  }, []);

  const borders = () => {
    if (global?.countryDetails.borderCountries) {
      return (
        <Box>
          <Box
            marginBottom={1.5}
            display={"flex"}
            justifyContent={"flex-start"}
          >
            <Typography variant="h4">Countries it borders</Typography>
          </Box>
          <div className="homeDiv">
            {global?.countryDetails.borderCountries.map((c) => (
              <Link
                to={"/" + c.name}
                onClick={() => {
                  global.getCountriesDetails(c.name);
                }}
              >
                <CountryCard key={c.name} countryName={c.name} flag={c.flag} />
              </Link>
            ))}
          </div>
        </Box>
      );
    }
  };

  return (
    <Box padding={0.7}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <IconButton
          onClick={() => {
            navigate("/");
            global?.getCountriesDetails("none");
          }}
        >
          <HomeIcon></HomeIcon>
        </IconButton>
        <Typography variant="h2">{country}</Typography>
        <div></div>
      </Box>
      <Divider sx={{ marginBottom: 0.5 }} />
      <Box display={"flex"} justifyContent={"center"}>
        <img src={global?.countryDetails.flag} width={"500px"} />
      </Box>
      <Divider sx={{ marginTop: 2 }} />
      {borders()}
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="h6">Population History</Typography>
      </Box>
      <Box sx={{ margin: 1 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={global?.countryDetails.historicalPopulation}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis dataKey="value" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
