import { IAvailableCountry, IFlagRequest } from "../interfaces";
import axios from "axios";

export default async function () {
  const countries = await (
    await axios.get<IAvailableCountry[]>(
      "https://date.nager.at/api/v3/AvailableCountries"
    )
  ).data;
  const dataFlag = (
    await axios.get<IFlagRequest>(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    )
  ).data.data;
  countries.forEach((c) => {
    dataFlag.forEach((f) => {
      if (f.name === c.name) {
        c.flag = f.flag;
      }
    });
  });
  return countries;
}
