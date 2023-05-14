import { useLoaderData } from "react-router-dom";
import { Location as LocationType } from "src/types";

export const Location = () => {
  const { geocode, weather } = useLoaderData() as LocationType;
  return (
    <div>
      <div>
        {geocode.address?.city ||
          geocode.address?.municipality ||
          geocode.address?.county}
      </div>
      <div>Low: {weather?.timelines.daily[0].values.temperatureMin}</div>
      <div>High: {weather?.timelines.daily[0].values.temperatureMax}</div>
      <div>
        Real feel: {weather?.timelines.daily[0].values.temperatureApparentAvg}
      </div>
    </div>
  );
};
