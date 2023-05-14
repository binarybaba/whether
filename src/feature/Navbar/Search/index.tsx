import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "src/hooks";
import { getGeocodeListByKeyword } from "src/provider";
import { MapsCoGeocode } from "src/types";

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
    navigate(`/location?lat=${geocode.lat}&lon=${geocode.lon}`);
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search for a city"
        value={typingQuery}
        onChange={(e) => setTypingQuery(e.currentTarget.value)}
      />
      {searchResults &&
        searchResults.map((geocode: MapsCoGeocode) => (
          <div
            role="button"
            key={geocode.place_id}
            onClick={() => handleGeocodeClick(geocode)}
          >
            {geocode.display_name}
          </div>
        ))}
    </>
  );
};
