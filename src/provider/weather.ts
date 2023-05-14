import { fetchWeatherByCoordinates } from "src/service";
import { Coordinates } from "src/types";
import { isCoordinates } from "../util";

export const getWeather = async (args: Coordinates) => {
  if (!isCoordinates({ lat: args.lat, lon: args.lon })) return;
  return await fetchWeatherByCoordinates(args);
};
