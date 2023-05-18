// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import axios from "axios";
jest.mock("axios");
export const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockImplementation((url) => {
  return Promise.resolve({
    data: {
      users: [{ id: 1, name: "John Smith" }],
    },
  });
});
