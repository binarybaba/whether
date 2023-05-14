import { MapsCoGeocode } from "src/types";

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
        lat: "01",
        lon: "01",
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
        lat: "02",
        lon: "02",
        osm_id: "",
        osm_type: "",
        place_id: 2,
        powered_by: searchKeyword,
        type: "",
      },
    ]);
  });
