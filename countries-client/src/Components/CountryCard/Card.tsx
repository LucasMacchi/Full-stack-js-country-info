import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { GlobalContext } from "../../Context/Globalstate";

export default function CountryCard(props: any) {
  const global = useContext(GlobalContext);
  return (
    <Card sx={{ maxWidth: 300, padding: 0.1 }} raised={true}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.flag}
        title={"flag of " + props.countryName}
      />
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">{props.countryName}</Typography>
      </CardContent>
    </Card>
  );
}
