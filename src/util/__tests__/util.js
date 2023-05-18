import { isCoordinates } from "../coordinates";
import { formatTemperature } from "../formatters";

describe("util", () => {
  describe("coordinates", function () {
    it("should invalidate bad coordinates", () => {
      expect(isCoordinates()).toEqual(false);
      expect(isCoordinates({})).toEqual(false);
      expect(isCoordinates({ lat: 14 })).toEqual(false);
      expect(isCoordinates({ lon: 14 })).toEqual(false);
      expect(isCoordinates([])).toEqual(false);
      expect(isCoordinates("")).toEqual(false);
      expect(isCoordinates({ lat: "foo", bar: "bar" })).toEqual(false);
      expect(isCoordinates({ lat: "181", bar: "181" })).toEqual(false);
      expect(isCoordinates({ lat: 181, bar: 181 })).toEqual(false);
    });
  });
  describe("formatTemperature", () => {
    it("should format the temperature", () => {
      expect(formatTemperature("14.6")).toEqual("14°");
      expect(formatTemperature(14.6)).toEqual("14°");
    });
    it("should return an empty string for irregular values", () => {
      expect(formatTemperature()).toEqual("");
      expect(formatTemperature(null)).toEqual("");
      expect(formatTemperature(false)).toEqual("");
      expect(formatTemperature([])).toEqual("");
    });
  });
});
