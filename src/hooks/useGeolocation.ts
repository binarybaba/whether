import { useState, useEffect } from "react";

export const useGeolocation = (isEnabled: boolean) => {
  const [state, setState] = useState<GeolocationPosition | undefined>();
  let mounted = true;

  const onEvent: PositionCallback = (event) => {
    if (mounted) {
      setState(event);
    }
  };
  const onError: PositionErrorCallback = (error) => {
    console.debug(`error in determining user location`, error);
    setState(undefined);
  };

  useEffect(() => {
    if (isEnabled) {
      navigator.geolocation.getCurrentPosition(onEvent, onError);
    }

    return () => {
      mounted = false;
    };
  }, []);

  return state;
};
