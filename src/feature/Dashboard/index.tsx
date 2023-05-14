import { useAppContext } from "src/hooks";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { store } = useAppContext();
  return (
    <div>
      <ul>
        {store.favorites.map(({ geocode }) => (
          <Link
            key={geocode.place_id}
            to={`/location/${geocode.lat}/${geocode.lon}`}
          >
            {geocode.address?.place}
          </Link>
        ))}
      </ul>
    </div>
  );
};
