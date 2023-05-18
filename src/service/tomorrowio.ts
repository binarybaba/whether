import { Coordinates, TomorrowForecast } from "src/types";
import { UNIT_SYSTEM } from "src/context";
import axios from "axios";

export const WEATHER_SERVICE_URL =
  "https://api.tomorrow.io/v4/weather/forecast";
export const DEFAULT_FIELDS = [
  "temperature",
  "humidity",
  "sunriseTime",
  "sunsetTime",
  "visibility",
];
// rest of fields in https://docs.tomorrow.io/reference/data-layers-core#data-fields
export const fetchWeatherByCoordinates = async (
  args: Coordinates & { units: UNIT_SYSTEM }
): Promise<TomorrowForecast> => {
  const fields = DEFAULT_FIELDS.join(",");
  const { units, lat, lon } = args;
  const location = [lat, lon].join(",");
  const API_KEY = process.env.REACT_APP_TOMORROW_API_KEY;
  return axios(
    `${WEATHER_SERVICE_URL}?fields=${fields}&units=${units}&location=${location}&apikey=${API_KEY}`
  ).then((res) => res.data);
};
