import { Coordinates, TomorrowForecast } from "src/types";

export const fetchWeatherByCoordinates = async (
  coordinates: Coordinates
): Promise<TomorrowForecast> =>
  new Promise((resolve) => {
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
            },
          },
        ],
      },
      location: coordinates,
    });
  });
