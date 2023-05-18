import {
  MapsCoGeocode,
  MapsCoReverseGeocode,
  TomorrowForecast,
} from "src/types";
import { HeartIcon } from "@heroicons/react/20/solid";
import { useAppContext } from "src/hooks";
import { ActionType } from "../../../context";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export const FavoriteIt = ({
  geocode,
  weather,
}: {
  geocode: MapsCoReverseGeocode;
  weather: TomorrowForecast;
}) => {
  const {
    store: { favorites },
    dispatch,
  } = useAppContext();

  const isAFavorite = favorites.find(
    (favorite) => favorite.geocode.place_id === geocode.place_id
  );

  const handleClick = () => {
    if (!isAFavorite) {
      dispatch({
        type: ActionType.FAVORITE,
        payload: {
          geocode,
          weather,
        },
      });
    }
  };

  return (
    <button type="button" onClick={handleClick} data-testid="favorite-button">
      <HeartIcon
        className={classNames(
          isAFavorite ? "text-rose-600" : "text-stone-300",
          "h-4 w-4"
        )}
      />
    </button>
  );
};
