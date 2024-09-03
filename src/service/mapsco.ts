import { Coordinates, MapsCoGeocode, MapsCoReverseGeocode } from "src/types";
import axios from "axios";

export const GEOCODE_SERVICE_URL = `https://geocode.maps.co/`;

export const fetchGeocodesByKeyword = async (
  searchKeyword: string
): Promise<Array<MapsCoGeocode>> => {
  const apiKey = process.env.REACT_APP_MAPSCO_API_KEY
  return axios(`${GEOCODE_SERVICE_URL}search?q=${searchKeyword}&api_key=${apiKey}`).then(
      (res) => res.data
  );
}


export const fetchReverseGecode = async (
  coordinates: Coordinates
): Promise<MapsCoReverseGeocode> =>
{
  const apiKey = process.env.REACT_APP_MAPSCO_API_KEY
  return axios(
      `${GEOCODE_SERVICE_URL}reverse?lat=${coordinates.lat}&lon=${coordinates.lon}&api_key=${apiKey}`
  ).then((res) => res.data);
}
