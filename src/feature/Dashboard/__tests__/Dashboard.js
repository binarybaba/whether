import { AppContext } from "src/context";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Dashboard } from "../index";
import { DEFAULT_STATE } from "src/context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

describe("Dashboard", () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
  };
  const Root = ({ children }) => (
    <QueryClientProvider client={new QueryClient()}>
      <AppContext.Provider value={{ store: DEFAULT_STATE, dispatch: () => {} }}>
        {children}
      </AppContext.Provider>
    </QueryClientProvider>
  );
  const RootWithMyLocation = ({ children }) => (
    <QueryClientProvider client={new QueryClient()}>
      <AppContext.Provider
        value={{
          store: {
            favorites: [
              {
                isCurrent: true,
                geocode: {},
                weather: {},
              },
            ],
            settings: {},
          },
        }}
      >
        {children}
      </AppContext.Provider>
    </QueryClientProvider>
  );
  global.navigator.geolocation = mockGeolocation;
  it("should show the initial saved locations", async () => {
    render(
      <Root>
        <Dashboard />
      </Root>,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(screen.getAllByTestId("favorite")).toHaveLength(
      DEFAULT_STATE.favorites.length
    );
  });
  it("should trigger geolocation if my location is not set", () => {
    global.navigator.geolocation = mockGeolocation;
    render(
      <Root>
        <Dashboard />
      </Root>,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
  });
  it("should not trigger geolocation if my location is set", () => {
    global.navigator.geolocation = mockGeolocation;
    render(
      <RootWithMyLocation>
        <Dashboard />
      </RootWithMyLocation>,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(screen.getByText("My location")).toBeInTheDOM();
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(0);
  });
});
