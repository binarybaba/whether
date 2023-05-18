import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getReverseGeocode,
  getWeather,
  getWeatherCondition,
} from "src/provider";
import { Tile } from "src/components";
import {
  SunIcon,
  MoonIcon,
  CloudIcon,
  EyeIcon,
} from "@heroicons/react/20/solid";
import { FavoriteIt } from "./FavoriteIt";

export const Location = () => {
  const params = useParams();
  const coordinates = {
    // @ts-ignore
    lat: parseFloat(params.lat), // @ts-ignore
    lon: parseFloat(params.lon),
  };
  const { data: geocode } = useQuery(["reverseGeolocation", coordinates], () =>
    getReverseGeocode(coordinates)
  );

  const { data: weather, status } = useQuery(
    ["weather", coordinates],
    () => getWeather(coordinates),
    { refetchOnWindowFocus: false, retry: false }
  );
  if (!geocode) return null;

  return (
    <div className="flex justify-center h-full">
      <div className="max-w-6xl flex w-full flex-col md:flex-row justify-center md:justify-around">
        <div className="flex flex-col justify-center items-center ring">
          <div className="text-xl font-semibold text-zinc-600 text-center -ml-2 flex">
            <div>
              {geocode.address?.city ||
                geocode.address?.municipality ||
                geocode.address?.county}
            </div>
            {weather && geocode && (
              <FavoriteIt geocode={geocode} weather={weather} />
            )}
          </div>
          <div className="font-extralight text-6xl text-center text-zinc-700 ">
            {weather?.timelines.daily[0].values.temperatureAvg}°
          </div>
          <div className="flex justify-center font-semibold text-zinc-500">
            {getWeatherCondition(
              weather?.timelines.daily[0].values.weatherCodeMax
            )}
          </div>
          <div className="flex flex-row justify-center text-zinc-500 font-semibold">
            <div className="mr-2">
              L:{weather?.timelines.daily[0].values.temperatureMin}°
            </div>
            <div>H:{weather?.timelines.daily[0].values.temperatureMax}°</div>
          </div>
          <div className="flex flex-row justify-center text-zinc-500 font-light mt-2">
            Feels like{" "}
            {weather?.timelines.daily[0].values.temperatureApparentAvg}°
          </div>
        </div>
        <div className="p-4 flex flex-row flex-wrap justify-center ring items-center">
          {weather && (
            <div className=" max-w-sm flex flex-row flex-wrap justify-center">
              <Tile
                Icon={<SunIcon />}
                id="sunrise"
                data={new Date(weather.timelines.daily[0].values.sunriseTime)}
                additionalData="© Tomorrow.io"
              />
              <Tile
                Icon={<MoonIcon />}
                id="sunset"
                data={new Date(weather.timelines.daily[0].values.sunsetTime)}
                additionalData="© Tomorrow.io"
              />
              <Tile
                Icon={<CloudIcon />}
                id="humidity"
                data={weather?.timelines.daily[0].values.humidityAvg}
                additionalData={`L:${weather.timelines.daily[0].values.humidityMin} H:${weather.timelines.daily[0].values.humidityMax}`}
              />
              <Tile
                Icon={<EyeIcon />}
                id="visibility"
                data={weather?.timelines.daily[0].values.visibilityAvg}
                additionalData={`L:${weather.timelines.daily[0].values.visibilityMin} H:${weather.timelines.daily[0].values.visibilityMax}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
