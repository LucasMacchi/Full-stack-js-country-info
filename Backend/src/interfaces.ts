export interface IAvailableCountry {
  countryCode: string;
  name: string;
  flag?: string;
}

export interface IpopulationCounts {
  year: number;
  value: number;
}

export interface ICountryInfo {
  borderCountries: IAvailableCountry[];
  historicalPopulation: IpopulationCounts[];
  flag: string;
}
interface IBordersRaw {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: null;
}
export interface IBorderData {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: IBordersRaw[];
}

export interface IpopulationComplete {
  country: string;
  code: string;
  iso3: string;
  populationCounts: IpopulationCounts[];
}

export interface IPopulationRaw {
  error: boolean;
  msg: string;
  data: IpopulationComplete[];
}
export interface IFlagRaw {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

export interface IFlagRequest {
  error: boolean;
  msg: string;
  data: IFlagRaw[];
}
