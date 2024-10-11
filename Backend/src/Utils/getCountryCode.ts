import { IAvailableCountry } from "../interfaces";
import axios from "axios";

export default async function (country: string): Promise<string> {
  const countries = (
    await axios.get<IAvailableCountry[]>(
      "https://date.nager.at/api/v3/AvailableCountries"
    )
  ).data;
  let response: IAvailableCountry = { countryCode: "", name: "" };
  countries.forEach((c) => {
    if (c.name === country) response = c;
    console.log(c);
  });
  console.log(response);

  return response.countryCode;
}
