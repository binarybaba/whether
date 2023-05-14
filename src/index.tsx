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
import { isCoordinates } from "./util";
import { getReverseGeocode } from "./provider";

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
        path: "/location/:lat/:lon",
        element: <Location />,
        loader: async ({ params }) => {
          if (!params.lat || !params.lon) {
            throw Error();
          }
          if (
            !isCoordinates({
              lat: parseFloat(params.lat),
              lon: parseFloat(params.lon),
            })
          ) {
            throw Error();
          }
          return getReverseGeocode({
            lat: parseFloat(params.lat),
            lon: parseFloat(params.lon),
          });
        },
        errorElement: (
          <div>
            You lost bro? What kind of location is that? Try search again
          </div>
        ),
      },
    ],
    errorElement: (
      <div>
        Something has gone horribly wrong and we are not doing anything to fix
        it
      </div>
    ),
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
