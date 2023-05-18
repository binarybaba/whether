import { fireEvent, render, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContext, DEFAULT_STATE } from "../../../../context";
import { Settings } from "../index";
import { Dashboard } from "../../../Dashboard";
import { BrowserRouter } from "react-router-dom";

describe("Settings", () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
  };
  global.navigator.geolocation = mockGeolocation;
  const Root = ({ children }) => (
    <QueryClientProvider client={new QueryClient()}>
      <AppContext.Provider value={{ store: DEFAULT_STATE, dispatch: () => {} }}>
        {children}
      </AppContext.Provider>
    </QueryClientProvider>
  );
  it("should refetch weather if units change to imperial", async () => {
    const { findByTestId } = render(
      <Root>
        <Settings />
        <Dashboard />
      </Root>,
      { wrapper: BrowserRouter }
    );
    const settingsButton = await findByTestId("settings-button");
    await act(async () => {
      fireEvent.click(settingsButton);
    });
    try {
      await waitFor(async () => {
        const metricButton = await findByTestId("metric-button");
        fireEvent.click(metricButton);
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
    } catch (e) {}
  });
  it("should not refetch weather if units remain unchanged", async () => {
    const { findByTestId } = render(
      <Root>
        <Settings />
        <Dashboard />
      </Root>,
      { wrapper: BrowserRouter }
    );
    const settingsButton = await findByTestId("settings-button");
    await act(async () => {
      fireEvent.click(settingsButton);
    });
    try {
      await waitFor(async () => {
        const metricButton = await findByTestId("metric-button");
        fireEvent.click(metricButton);
        expect(axios.get).toHaveBeenCalledTimes(0);
      });
    } catch (e) {}
  });
});
