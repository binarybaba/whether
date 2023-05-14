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
  new Promise((resolve) => {
    resolve({
      bounding_box: [1, 2, 3, 4],
      class: "",
      display_name: "location1",
      importance: 1,
      lat: 1,
      lon: 1,
      osm_id: "",
      osm_type: "",
      place_id: 1,
      powered_by: "",
      type: "",
      address: {
        country: "",
        country_code: "",
        place: "",
      },
    });
  });
