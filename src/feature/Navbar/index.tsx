import { Search } from "./Search";
import { Settings } from "./Settings";
import Logo from "src/logo.svg";

export const Navbar = () => {
  return (
    <div className="relative flex flex-col md:flex-row justify-between p-2 shadow">
      <img src={Logo} alt="" className="h-10 ml-0 md:ml-4" />
      <div className="w-full md:w-[256px] flex flex-col">
        <Search />
      </div>
      <div className="absolute right-1 md:relative">
        <Settings />
      </div>
    </div>
  );
};
