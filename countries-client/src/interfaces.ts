export interface IAvailableCountry {
  countryCode: string;
  name: string;
  flag: string;
}
export interface IAction {
  type: string;
  payload: any;
}
export interface IPropsChildren {
  children: React.ReactNode | JSX.Element | JSX.Element[];
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

export interface IGlobalContext {
  availableCountries: IAvailableCountry[];
  countryDetails: ICountryInfo;
  getCountries: () => void;
  getCountriesDetails: (countryName: string) => void;
}
