import { Outlet } from "react-router-dom";
import { Navbar } from "src/feature/Navbar";
export const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
