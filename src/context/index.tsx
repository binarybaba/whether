import { createContext, ReactNode, useReducer } from "react";
import type { Location, MapsCoGeocode, TomorrowForecast } from "src/types";

export enum UNIT_SYSTEM {
  METRIC = "metric",
  IMPERIAL = "imperial",
}

export enum ActionType {
  CHANGE_UNITS = "CHANGE_UNITS",
  FAVORITE = "FAVORITE",
}

export type Settings = {
  units: UNIT_SYSTEM.METRIC | UNIT_SYSTEM.IMPERIAL;
};

type Store = {
  favorites: Array<Location>;
  settings: Settings;
};

type ChangeSystemAction = {
  type: ActionType.CHANGE_UNITS;
  payload: UNIT_SYSTEM.METRIC | UNIT_SYSTEM.IMPERIAL;
};

type FavoriteAction = {
  type: ActionType.FAVORITE;
  payload: Location;
};

type Dispatch = (action: ChangeSystemAction | FavoriteAction) => void;

export const DEFAULT_STATE: Store = {
  favorites: [
    {
      geocode: {
        lat: -33.8548157,
        lon: 151.2164539,
        place_id: 288026077,
        address: {
          country: "Australia",
          country_code: "AU",
          city: "Sydney",
        },
      },
    },
    {
      geocode: {
        lat: 51.4538022,
        lon: -2.5972985,
        place_id: 10273833,
        address: {
          country: "United Kingdom",
          country_code: "GB",
          city: "Bristol",
        },
      },
    },
  ],
  settings: {
    units: UNIT_SYSTEM.METRIC,
  },
};

export const reducer = (
  state: Store,
  action: ChangeSystemAction | FavoriteAction
): Store => {
  switch (action.type) {
    case ActionType.CHANGE_UNITS:
      return {
        ...state,
        settings: {
          units: action.payload,
        },
      };
    case ActionType.FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default: {
      console.debug(`Action is not configured. Store stays unchanged`);
      return state;
    }
  }
};

export const AppContext = createContext<
  { store: Store; dispatch: Dispatch } | undefined
>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [store, dispatch] = useReducer(reducer, DEFAULT_STATE);
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
