// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
export const mock = new MockAdapter(axios);

mock.onGet("forecast").reply(200, {
});

mock.onGet("geocode").reply(200, {
    users: [{ id: 1, name: "John Smith" }],
});
