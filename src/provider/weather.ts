import { fetchWeatherByCoordinates } from "src/service";
import { Coordinates } from "src/types";

export const getWeather = async (args: Coordinates) => {
  if (!args.lat || !args.lon) return;
  return await fetchWeatherByCoordinates(args);
};
