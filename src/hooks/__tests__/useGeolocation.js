import { useGeolocation } from "../useGeolocation";
import { render, screen } from "@testing-library/react";

describe("useGeolocation", () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementation((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 1111,
            longitude: 2222,
          },
        })
      )
    ),
  };
  global.navigator.geolocation = mockGeolocation;
  it("should return with a location", () => {
    const Consumer = () => {
      const geolocation = useGeolocation();
      return (
        <>
          <div>Latitude: ${geolocation.coords.latitude}</div>
          <div>Longitude: ${geolocation.coords.longitude}</div>
        </>
      );
      render(<Consumer />);
      expect(screen.getByText("Latitude:")).toHaveTextContent("1111");
      expect(screen.getByText("Longitude:")).toHaveTextContent("2222");
    };
  });
});
