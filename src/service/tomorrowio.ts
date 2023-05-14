import { TomorrowForecast } from "src/types";

export const fetchWeatherByCoordinates = async (): Promise<TomorrowForecast> =>
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
            },
          },
        ],
      },
    });
  });
