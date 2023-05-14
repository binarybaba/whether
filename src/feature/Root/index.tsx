import { Outlet } from "react-router-dom";
import { Navbar } from "src/feature/Navbar";
import { AppProvider } from "src/context";

export const Root = () => {
  return (
    <AppProvider>
      <Navbar />
      <Outlet />
    </AppProvider>
  );
};
