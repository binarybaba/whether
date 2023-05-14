import { Coordinates } from "../types";

export const isLatitude = (num: number) => isFinite(num) && Math.abs(num) <= 90;

export const isLongitude = (num: number) =>
  isFinite(num) && Math.abs(num) <= 180;

export const isCoordinates = ({ lat, lon }: Coordinates) => {
  if (isNaN(lat) || isNaN(lon)) {
    return false;
  }
  return !(!isLatitude(lat) || !isLongitude(lon));
};
