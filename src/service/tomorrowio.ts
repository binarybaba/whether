import { Coordinates, TomorrowForecast } from "src/types";
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
  coordinates: Coordinates,
  fields = DEFAULT_FIELDS,
  units = "metric"
): Promise<TomorrowForecast> => {
  const _fields = fields.join(",");
  const _location = [coordinates.lat, coordinates.lon].join(",");
  const _units = units;
  const API_KEY = process.env.REACT_APP_TOMORROW_API_KEY;
  return axios(
    `${WEATHER_SERVICE_URL}?fields=${_fields}&units=${_units}&location=${_location}&apikey=${API_KEY}`
  ).then((res) => res.data);
};
