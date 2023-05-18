import { isCoordinates } from "../util";
import { LoaderFunction } from "react-router-dom";

type Params = {
  params: {
    lat: string;
    lon: string;
  };
};
// @ts-ignore because i am running out of time
export const locationLoader: LoaderFunction = async ({ params }: Params) => {
  if (!params.lat || !params.lon) {
    throw Error();
  }
  const lat = parseFloat(params.lat);
  const lon = parseFloat(params.lon);
  if (!isCoordinates({ lat, lon })) {
    throw Error();
  }

  return new Promise((resolve) => resolve("")); // dummy so we can validate up top
};
