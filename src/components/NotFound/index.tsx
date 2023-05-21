import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-full min-h-full w-full bg-amber-50 flex justify-center items-center bg-cover  bg-[url(https://images.unsplash.com/photo-1510133768164-a8f7e4d4e3dc)]">
      <div className="max-w-6xl">
        <div className="text-3xl font-black uppercase text-zinc-600 ">
          Lost?
        </div>
        <div className="text-2xl text-zinc-500 text-center">
          We cannot find this location
        </div>
        <div className="text-sky-700 text-xl">
          <Link to="/">Try again</Link>
        </div>
      </div>
    </div>
  );
};
