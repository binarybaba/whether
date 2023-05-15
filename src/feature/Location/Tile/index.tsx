import { ReactNode } from "react";

type TileProps = {
  Icon: ReactNode;
  name: string;
  data: string | number;
  additionalData?: string;
};
export const Tile = ({ Icon, name, data, additionalData }: TileProps) => (
  <div className="flex justify-between rounded-xl py-2 px-2 bg-gray-50 ring-1 ring-black ring-opacity-5  select-none flex-col h-[120px] min-w-[148px] m-2">
    <div className="flex-col justify-between">
      <div className="flex flex-row align-middle text-gray-400 h-4 mb-1">
        <div className="h-4 w-4">{Icon}</div>
        <div className="font-bold text-xs tracking-tighter ml-1">
          {name.toUpperCase()}
        </div>
      </div>
      <div className="text-4xl font-light text-zinc-700">{data}</div>
    </div>
    <div className="text-xs text-zinc-400">{additionalData}</div>
  </div>
);
