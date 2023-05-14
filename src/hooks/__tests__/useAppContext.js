import { useAppContext } from "src/hooks";
import { AppContext, AppProvider } from "src/context";
import { render, screen } from "@testing-library/react";
import { DEFAULT_STATE } from "src/context";

describe("useFavorites", function () {
  it("should throw when used without Provider", () => {
    const runner = () => {
      const WithoutProvider = () => {
        useAppContext(AppContext);
      };
      render(<WithoutProvider />);
    };
    expect(runner).toThrow();
  });
  it("provides context when wrapped in Provider", () => {
    const renderer = () => {
      const DummyConsumer = () => {
        const {
          store: { favorites },
        } = useAppContext(AppContext);
        return <div>Latitude: ${favorites[0].geocode.lat}</div>;
      };
      render(
        <AppProvider>
          <DummyConsumer />
        </AppProvider>
      );
    };
    renderer();
    expect(screen.getByText(/Latitude/)).toHaveTextContent(
      `${DEFAULT_STATE.favorites[0].geocode.lat}`
    );
  });
});
