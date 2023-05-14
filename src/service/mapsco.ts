import { Coordinates, MapsCoGeocode, MapsCoReverseGeocode } from "src/types";
import axios from "axios";

export const GEOCODE_SERVICE_URL = `https://geocode.maps.co/`;

export const fetchGeocodesByKeyword = async (
  searchKeyword: string
): Promise<Array<MapsCoGeocode>> =>
  axios(`${GEOCODE_SERVICE_URL}search?q=${searchKeyword}`).then(
    (res) => res.data
  );

export const fetchReverseGecode = async (
  coordinates: Coordinates
): Promise<MapsCoReverseGeocode> =>
  axios(
    `${GEOCODE_SERVICE_URL}reverse?lat=${coordinates.lat}&lon=${coordinates.lon}`
  ).then((res) => res.data);
