import { Coordinates, MapsCoReverseGeocode } from "src/types";
import { useQuery } from "@tanstack/react-query";
import { getWeather, getWeatherCondition } from "../../../provider";
import { useAppContext } from "src/hooks";

export const Favorite = ({
  geocode,
  isCurrent,
}: {
  geocode: Partial<MapsCoReverseGeocode> & Coordinates;
  isCurrent?: boolean;
}) => {
  const {
    store: {
      settings: { units },
    },
  } = useAppContext();
  const { data: weather, status } = useQuery(
    [`weather`, { lat: geocode.lat, lon: geocode.lon, units }],
    () => getWeather({ lat: geocode.lat, lon: geocode.lon, units }),
    { refetchOnWindowFocus: false, retry: false }
  );
  return (
    <div className="min-h-[120px] m-2 md:w-[20vw] flex justify-between rounded-xl p-2 bg-gray-50 ring-1 ring-black ring-opacity-5 shadow select-none">
      <div className="flex flex-col justify-between">
        <div className="align-middle">
          <div className="font-bold text-xl text-zinc-700">
            {isCurrent ? "My location" : geocode.address?.city}
          </div>
          <div className="font-light text-xs align-middle text-zinc-500">
            {geocode.address?.country}
          </div>
        </div>
        <div className="font-light text-xs align-middle mr-1 text-zinc-800 tracking-tight ">
          {getWeatherCondition(
            weather?.timelines.daily[0].values.weatherCodeMax
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="font-thin text-6xl text-center text-zinc-700">
          {weather?.timelines.daily[0].values.temperatureAvg}°
        </div>
        <div className="flex justify-between text-xs tracking-tight text-zinc-500">
          <div>H:{weather?.timelines.daily[0].values.temperatureMax}°</div>
          <div>L:{weather?.timelines.daily[0].values.temperatureMin}°</div>
        </div>
      </div>
    </div>
  );
};
