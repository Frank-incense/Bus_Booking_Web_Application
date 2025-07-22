import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import route from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
  </React.StrictMode>
);
