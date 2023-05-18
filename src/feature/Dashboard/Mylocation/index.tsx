import { useQuery } from "@tanstack/react-query";
import { getReverseGeocode, getWeather } from "src/provider";
import { useAppContext } from "src/hooks";
import { useEffect } from "react";
import { ActionType } from "../../../context";

export const MyLocation = ({
  userGeolocation,
}: {
  userGeolocation: GeolocationPosition;
}) => {
  const {
    coords: { latitude: lat, longitude: lon },
  } = userGeolocation;
  const { dispatch } = useAppContext();
  const { data: geocode } = useQuery(["reverseGeolocation", { lat, lon }], () =>
    getReverseGeocode({ lat, lon })
  );
  const { data: weather } = useQuery(
    [`weather`, { lat: geocode?.lat, lon: geocode?.lon }],
    () => getWeather({ lat: geocode?.lat, lon: geocode?.lon }),
    { refetchOnWindowFocus: false, retry: false, enabled: !!geocode }
  );
  useEffect(() => {
    if (geocode && weather) {
      dispatch({
        type: ActionType.FAVORITE,
        payload: {
          geocode,
          weather,
          isCurrent: true,
        },
      });
    }
  }, [geocode, weather]);
  return null;
};