import axios from "axios";
import {
  ICountryInfo,
  IBorderData,
  IAvailableCountry,
  IPopulationRaw,
  IpopulationCounts,
  IFlagRequest,
} from "../interfaces";
import getCountryCode from "../Utils/getCountryCode";

export default async function (countryName: string): Promise<ICountryInfo> {
  const countryCode = await getCountryCode(countryName);
  if (countryCode) {
    const dataPopulation = (
      await axios.get<IPopulationRaw>(
        "https://countriesnow.space/api/v0.1/countries/population"
      )
    ).data;
    let populationClean: IpopulationCounts[] = [];
    dataPopulation.data.forEach((p) => {
      if (p.country === countryName) populationClean = p.populationCounts;
    });

    const dataFlag = (
      await axios.get<IFlagRequest>(
        "https://countriesnow.space/api/v0.1/countries/flag/images"
      )
    ).data.data;
    let flag: string = "";
    dataFlag.forEach((f) => {
      if (f.name === countryName) flag = f.flag;
    });
    const dataBorders = (
      await axios.get<IBorderData>(
        "https://date.nager.at/api/v3/CountryInfo/" + countryCode
      )
    ).data;
    const bordersClean: IAvailableCountry[] = dataBorders.borders.map(
      (b): IAvailableCountry => {
        return { name: b.commonName, countryCode: b.countryCode };
      }
    );
    bordersClean.forEach((c) => {
      dataFlag.forEach((f) => {
        if (f.name === c.name) {
          c.flag = f.flag;
        }
      });
    });
    const countryInfo: ICountryInfo = {
      borderCountries: bordersClean,
      historicalPopulation: populationClean,
      flag: flag,
    };
    console.log(countryInfo);
    return countryInfo;
  } else {
    throw Error("This country does not exist.");
  }
}
