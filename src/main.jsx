import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import "./index.css";
import guestRoutes from "./routes/guestRoutes.jsx";
import mainRoutes from "./routes/mainRoutes.jsx";

// Create client
const queryClient = new QueryClient();

// Create reouter
const router = createBrowserRouter([...guestRoutes, ...mainRoutes]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
