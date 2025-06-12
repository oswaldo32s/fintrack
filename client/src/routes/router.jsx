import { createBrowserRouter } from "react-router";
import App from "../App";
import { CreateCategoryForm } from "../components/Category";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: CreateCategoryForm,
      },
    ],
  },
]);
