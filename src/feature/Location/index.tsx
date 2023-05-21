import { useParams } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import {
  SunIcon,
  MoonIcon,
  CloudIcon,
  EyeIcon,
} from "@heroicons/react/20/solid";

import {
  getReverseGeocode,
  getWeather,
  getWeatherCondition,
} from "src/provider";
import { GlobalError, Tile } from "src/components";
import { FavoriteIt } from "./FavoriteIt";
import { useAppContext } from "src/hooks";
import { formatTemperature, classNames } from "src/util";

export const Location = () => {
  const params = useParams();
  const {
    store: {
      settings: { units },
    },
  } = useAppContext();
  const coordinates = {
    // @ts-ignore
    lat: parseFloat(params.lat), // @ts-ignore
    lon: parseFloat(params.lon),
  };
  const { data: geocode, error: geocodeError } = useQuery(
    ["reverseGeolocation", coordinates],
    () => getReverseGeocode(coordinates)
  );

  const {
    data: weather,
    isLoading,
    isFetching,
    error: weatherError,
  } = useQuery(
    ["weather", { ...coordinates, units }],
    () => getWeather({ ...coordinates, units }),
    { refetchOnWindowFocus: false, retry: false }
  );
  if (weatherError || geocodeError) {
    return <GlobalError />;
  }

  return (
    <div className="transition-all">
      <div
        className={classNames(
          "relative h-1 w-full overflow-hidden",
          isLoading || isFetching ? "animate-color-change" : ""
        )}
      />
      <Transition
        show={!!(geocode && weather)}
        enter="transition-opacity duration-400"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex justify-center h-full">
          <div className="max-w-6xl flex w-full flex-col md:flex-row justify-center md:justify-around">
            <div className="flex flex-col justify-center items-center">
              <div className="text-xl font-semibold text-zinc-600 text-center -ml-2 flex">
                {geocode && (
                  <div>
                    {geocode.address?.city ||
                      geocode.address?.municipality ||
                      geocode.address?.county}
                  </div>
                )}
                {weather && geocode && (
                  <FavoriteIt geocode={geocode} weather={weather} />
                )}
              </div>
              <div className="font-extralight text-6xl text-center text-zinc-700 ">
                {formatTemperature(
                  weather?.timelines.daily[0].values.temperatureAvg
                )}
              </div>
              <div className="flex justify-center font-semibold text-zinc-500">
                {getWeatherCondition(
                  weather?.timelines.daily[0].values.weatherCodeMax
                )}
              </div>
              <div className="flex flex-row justify-center text-zinc-500 font-semibold">
                <div className="mr-2">
                  L:
                  {formatTemperature(
                    weather?.timelines.daily[0].values.temperatureMin
                  )}
                </div>
                <div>
                  H:
                  {formatTemperature(
                    weather?.timelines.daily[0].values.temperatureMax
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-center text-zinc-500 font-light mt-2">
                Feels like{" "}
                {formatTemperature(
                  weather?.timelines.daily[0].values.temperatureApparentAvg
                )}
              </div>
            </div>
            <div className="p-4 flex flex-row flex-wrap justify-center items-center">
              {weather && (
                <div className=" max-w-sm flex flex-row flex-wrap justify-center">
                  <Tile
                    Icon={<SunIcon />}
                    id="sunrise"
                    data={
                      new Date(weather.timelines.daily[0].values.sunriseTime)
                    }
                    additionalData="© Tomorrow.io"
                  />
                  <Tile
                    Icon={<MoonIcon />}
                    id="sunset"
                    data={
                      new Date(weather.timelines.daily[0].values.sunsetTime)
                    }
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
      </Transition>
    </div>
  );
};
