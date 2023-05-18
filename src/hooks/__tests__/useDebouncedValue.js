import { fireEvent, render, act, waitFor } from "@testing-library/react";
import { useDebouncedValue } from "../useDebouncedValue";
import { useEffect, useState } from "react";

describe("useDeboundedValue", () => {
  const debouncedFn = jest.fn();
  it("should debounce", async () => {
    const Consumer = () => {
      const [fastChangingValue, setFastChangingValue] = useState();
      const debouncedValue = useDebouncedValue(fastChangingValue);
      useEffect(() => {
        debouncedFn();
      }, [debouncedValue]);
      return (
        <input
          data-testid="input"
          type="text"
          onChange={(e) => setFastChangingValue(e.currentTarget.value)}
        />
      );
    };
    const { getByTestId } = await render(<Consumer />);
    await act(async () => {
      fireEvent.change(getByTestId("input", { value: "delhi" }));
      await waitFor(() => {
        expect(debouncedFn).toHaveBeenCalledTimes(1);
      });
    });
  });
});
