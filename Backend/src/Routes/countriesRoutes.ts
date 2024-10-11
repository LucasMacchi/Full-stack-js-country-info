import { Router, Request, Response } from "express";
import availableCountries from "../Controller/availableCountries";
import countryInfo from "../Controller/countryInfo";
export const countriesRouter = Router();

countriesRouter.get("/", (_req, res) => {
  res.send("Countries routes working.");
});

countriesRouter.get("/available", async (_req: Request, res: Response) => {
  try {
    const response = await availableCountries();
    if (response) {
      res.send(response);
    } else {
      res.status(401).send("No countries available");
    }
  } catch (error) {
    res.status(404).send("Error while requesting information");
  }
});

countriesRouter.get(
  "/info/:countryName",
  async (req: Request, res: Response) => {
    try {
      const countryName: string = req.params.countryName;
      const response = await countryInfo(countryName);
      if (response) {
        res.send(response);
      } else {
        res.status(401).send("No information about this country");
      }
    } catch (error) {
      //console.log(error)
      res.status(404).send("Error while requesting information");
    }
  }
);
