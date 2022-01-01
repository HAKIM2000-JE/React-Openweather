import Axios from "axios";
import { WEATHER_URL, FORECAST_URL } from "../constants";

const  REACT_APP_API_KEY= '282e3728fc3bcede60ff4bf241903353'

const getFullUrl = url => (
  `${url}&APPID=${REACT_APP_API_KEY}&lang=fr&units=metric`
)

export const getWeatherData = async city => {
  const response = await Axios.get(getFullUrl(`${WEATHER_URL}?q=${city}`));

  return response.data;
};

export const getForecastData = async city => {
  const response = await Axios.get(getFullUrl(`${FORECAST_URL}?q=${city}`));

  return response.data;
};