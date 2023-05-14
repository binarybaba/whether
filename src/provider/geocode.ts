import { fetchGeocodesByKeyword, fetchReverseGecode } from "src/service";
import { Coordinates } from "src/types";

export const getGeocodeListByKeyword = async (q = "") => {
  if (!q.length) {
    return [];
  }
  return await fetchGeocodesByKeyword(q);
};

export const getReverseGeocode = async (coordinates: Coordinates) => {
  return await fetchReverseGecode(coordinates);
};
