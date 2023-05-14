import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Root } from "src/feature/Root";
import { Location } from "src/feature/Location";
import { Dashboard } from "src/feature/Dashboard";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <Dashboard />,
        index: true,
      },
      {
        path: "/location",
        element: <Location />,
        errorElement: <div>Det er fail</div>,
      },
    ],
    errorElement: <div>Det er fail</div>,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
