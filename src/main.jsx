// main.jsx

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import CreateThread from './CreateThread';
import Thread from './Thread';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/threads/new",
    element: <CreateThread />,
  },
  {
    path: "/threads/:id",
    element: <Thread />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
