import { HeartIcon } from "@heroicons/react/20/solid";

import { MapsCoReverseGeocode, TomorrowForecast } from "src/types";
import { useAppContext } from "src/hooks";
import { ActionType } from "src/context";
import { classNames } from "src/util";

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
