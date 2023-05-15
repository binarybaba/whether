import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getReverseGeocode, getWeather } from "../../provider";

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

  return (
    <div>
      {geocode && (
        <div>
          {geocode.address?.city ||
            geocode.address?.municipality ||
            geocode.address?.county}
        </div>
      )}
      <div>{status}</div>
      <div>Low: {weather?.timelines.daily[0].values.temperatureMin}</div>
      <div>High: {weather?.timelines.daily[0].values.temperatureMax}</div>
      <div>
        Real feel: {weather?.timelines.daily[0].values.temperatureApparentAvg}
      </div>
    </div>
  );
};
