import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes/router.jsx";
import "./index.css";
import { CategoriesProvider } from "./context/categories.jsx";

createRoot(document.getElementById("root")).render(
  <CategoriesProvider>
    <RouterProvider router={router} />
  </CategoriesProvider>
);
