import { useAppContext } from "src/hooks";
import { Link } from "react-router-dom";
import { Favorite } from "./Favorite";
import { useGeolocation } from "src/hooks";
import { MyLocation } from "./Mylocation";

export const Dashboard = () => {
  const {
    store: { favorites },
  } = useAppContext();
  const isMyLocationFavorited = !!favorites.find(
    (favorite) => favorite.isCurrent
  );
  const userLocation = useGeolocation(!isMyLocationFavorited);
  return (
    <div className="flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="p-4 flex flex-col md:flex-row flex-wrap md:justify-center">
          {userLocation && <MyLocation userGeolocation={userLocation} />}
          {favorites
            .sort((a) => (a.isCurrent ? -1 : 1))
            .map(({ geocode, isCurrent }) => (
              <Link
                key={geocode.place_id}
                to={`/location/${geocode.lat}/${geocode.lon}`}
              >
                <Favorite geocode={geocode} isCurrent={isCurrent} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
