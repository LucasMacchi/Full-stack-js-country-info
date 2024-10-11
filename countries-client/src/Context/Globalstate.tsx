import { useReducer } from "react";
import { createContext } from "react";
import { IPropsChildren, IGlobalContext, IAction } from "../interfaces";
import actions from "./actions";
import axios from "axios";

export const GlobalContext = createContext<IGlobalContext | null>(null);
const serverUrl = process.env.REACT_APP_SERVER_URL;

//Reducer
const globalReducer = (
  state: IGlobalContext,
  action: IAction
): IGlobalContext => {
  const { payload, type } = action;
  switch (type) {
    case actions.GET_COUNTRIES:
      return { ...state, availableCountries: payload };
    case actions.GET_COUNTRY_DETAIL:
      return { ...state, countryDetails: payload };
    default:
      return state;
  }
};

//Global state

export default function GlobalState(props: IPropsChildren) {
  const getCountries = async () => {
    try {
      const countries = (await axios.get(serverUrl + "/countries/available"))
        .data;
      console.log(countries);
      dispatch({
        type: actions.GET_COUNTRIES,
        payload: countries,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getCountriesDetails = async (countryName: string) => {
    try {
      if (countryName === "none") {
        const countryInfo = {
          borderCountries: [],
          historicalPopulation: [],
          flag: "",
        };
        dispatch({
          type: actions.GET_COUNTRY_DETAIL,
          payload: countryInfo,
        });
      } else {
        const countryInfo = (
          await axios.get(serverUrl + "/countries/info/" + countryName)
        ).data;
        dispatch({
          type: actions.GET_COUNTRY_DETAIL,
          payload: countryInfo,
        });
        console.log(countryInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialState: IGlobalContext = {
    availableCountries: [],
    countryDetails: { borderCountries: [], historicalPopulation: [], flag: "" },
    getCountries,
    getCountriesDetails,
  };
  //uso del Reducer
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={state}>
      {props.children}
    </GlobalContext.Provider>
  );
}
