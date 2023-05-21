import { Link } from "react-router-dom";

export const GlobalError = () => {
  return (
    <div className="h-full min-h-full w-full bg-amber-50 flex justify-center bg-cover  bg-[url(https://images.unsplash.com/photo-1571948246947-6b6447772017)]">
      <div className="max-w-6xl mt-8 p-4">
        <div className="text-3xl font-black text-center uppercase text-zinc-600 ">
          Oops!
        </div>
        <div className="text-2xl text-zinc-500 text-center">
          Sorry, something's gone wrong and we're looking into it{" "}
        </div>
      </div>
    </div>
  );
};
