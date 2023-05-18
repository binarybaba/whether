import { Coordinates, TomorrowForecast } from "src/types";
import { UNIT_SYSTEM } from "src/context";

export const fetchWeatherByCoordinates = async (
  args: Coordinates & { units: UNIT_SYSTEM }
): Promise<TomorrowForecast> =>
  new Promise((resolve) => {
    console.log("resolving for", args.units);
    resolve({
      timelines: {
        daily: [
          {
            time: "",
            // @ts-ignore
            values: {
              temperatureMin: 15,
              temperatureMax: 17,
              temperatureAvg: 16,
              weatherCodeMax: 7114,
              temperatureApparentAvg: 18,
              visibilityAvg: 15.87,
              visibilityMax: 16,
              visibilityMin: 12.94,
              humidityAvg: 58.1,
              humidityMax: 82.69,
              humidityMin: 39,
              sunriseTime: "2023-05-17T19:41:00Z",
              sunsetTime: "2023-05-18T09:33:00Z",
            },
          },
        ],
      },
      location: {
        lat: args.lat,
        lon: args.lon,
      },
    });
  });
