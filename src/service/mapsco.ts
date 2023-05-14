import { Coordinates, MapsCoGeocode, MapsCoReverseGeocode } from "src/types";

export const fetchGeocodesByKeyword = async (
  searchKeyword: string
): Promise<Array<MapsCoGeocode>> =>
  new Promise((resolve) => {
    resolve([
      {
        bounding_box: [1, 2, 3, 4],
        class: "",
        display_name: "location1",
        importance: 1,
        lat: 1,
        lon: 1,
        osm_id: "",
        osm_type: "",
        place_id: 1,
        powered_by: searchKeyword,
        type: "",
      },
      {
        bounding_box: [1, 2, 3, 4],
        class: "",
        display_name: "location2",
        importance: 0.9,
        lat: 2,
        lon: 2,
        osm_id: "",
        osm_type: "",
        place_id: 2,
        powered_by: searchKeyword,
        type: "",
      },
    ]);
  });

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
