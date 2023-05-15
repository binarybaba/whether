import { useAppContext } from "src/hooks";
import { Link } from "react-router-dom";
import { Favorite } from "./Favorite";

export const Dashboard = () => {
  const { store } = useAppContext();
  return (
    <div className="flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="p-4 flex flex-col md:flex-row flex-wrap md:justify-center">
          {store.favorites.map(({ geocode }) => (
            <Link
              key={geocode.place_id}
              to={`/location/${geocode.lat}/${geocode.lon}`}
            >
              <Favorite geocode={geocode} />
            </Link>
          ))}
          {store.favorites.map(({ geocode }) => (
            <Link
              key={geocode.place_id}
              to={`/location/${geocode.lat}/${geocode.lon}`}
            >
              <Favorite geocode={geocode} />
            </Link>
          ))}
          {store.favorites.map(({ geocode }) => (
            <Link
              key={geocode.place_id}
              to={`/location/${geocode.lat}/${geocode.lon}`}
            >
              <Favorite geocode={geocode} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
