import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "src/hooks";
import { getGeocodeListByKeyword } from "src/provider";
import { MapsCoGeocode } from "src/types";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

function classNames(...classes: [string]) {
  return classes.filter(Boolean).join(" ");
}

export const Search = () => {
  const navigate = useNavigate();
  const [typingQuery, setTypingQuery] = useState<string>("");
  const debouncedQuery = useDebouncedValue(typingQuery);
  const { data: searchResults } = useQuery(
    ["lookup", debouncedQuery],
    () => getGeocodeListByKeyword(debouncedQuery),
    { enabled: !!debouncedQuery.length }
  );
  const handleGeocodeClick = (geocode: MapsCoGeocode) => {
    setTypingQuery("");
    navigate(`/location/${geocode.lat}/${geocode.lon}`);
  };
  return (
    <Combobox
      as="div"
      value={typingQuery} // @ts-ignore
      onChange={(geocode) => handleGeocodeClick(geocode)}
    >
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setTypingQuery(event.target.value)}
          displayValue={() => typingQuery}
          placeholder="Search for any city.."
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {searchResults && searchResults.length > 0 && (
          <Combobox.Options className="absolute  left-0 z-10 mt-1 min-h-full max-w-[512px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {searchResults.map((geocode) => (
              <Combobox.Option
                key={geocode.place_id}
                value={geocode}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-8 pr-4",
                    // @ts-ignore
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        // @ts-ignore
                        selected && "font-semibold"
                      )}
                    >
                      {geocode.display_name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 left-0 flex items-center pl-1.5",
                          // @ts-ignore
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};
