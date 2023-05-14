import { useLoaderData } from "react-router-dom";

export const Location = () => {
  const data = useLoaderData();
  console.log(data);
  return <div>Location</div>;
};
