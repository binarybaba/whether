import { useContext } from "react";

import { AppContext } from "src/context";

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw Error("No context! Wrap your component in the AppContext.Provider");
  }
  return context;
};
