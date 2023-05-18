import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContext, DEFAULT_STATE } from "../../../../context";
import { FavoriteIt } from "../index";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useAppContext } from "../../../../hooks";

describe("FavoriteIt", () => {
  const Root = ({ children }) => (
    <QueryClientProvider client={new QueryClient()}>
      <AppContext.Provider value={{ store: DEFAULT_STATE, dispatch: () => {} }}>
        {children}
      </AppContext.Provider>
    </QueryClientProvider>
  );
  it("should add to favorite", async () => {
    const Consumer = () => {
      const {
        store: { favorites },
      } = useAppContext();
      return (
        <div>
          <FavoriteIt geocode={{ place_id: 0 }} weather={{}} />
          <div data-testid="number-of-favorites">{favorites.length}</div>
        </div>
      );
    };
    const { getByTestId } = render(
      <Root>
        <Consumer />
      </Root>
    );
    expect(getByTestId("number-of-favorites")).toHaveTextContent("2");
    fireEvent.click(getByTestId("favorite-button"));
    await waitFor(() => {
      expect(screen.getByTestId("number-of-favorites")).toHaveTextContent("2");
    });
  });
  it("should not add to favorite if already exists", async () => {
    const Consumer = () => {
      const {
        store: { favorites },
      } = useAppContext();
      return (
        <div>
          <FavoriteIt
            geocode={DEFAULT_STATE.favorites[0].geocode}
            weather={{}}
          />
          <div data-testid="number-of-favorites">{favorites.length}</div>
        </div>
      );
    };
    const { getByTestId } = render(
      <Root>
        <Consumer />
      </Root>
    );
    expect(getByTestId("number-of-favorites")).toHaveTextContent("2");
    fireEvent.click(getByTestId("favorite-button"));
    await waitFor(() => {
      expect(screen.getByTestId("number-of-favorites")).toHaveTextContent("2");
    });
  });
});
