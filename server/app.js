import express from "express";
import cors from "cors";
import { createCategoryRouter } from "./routes/category.js";
import { createSubcategoryRouter } from "./routes/subcategory.js";

export const createApp = ({ categoryModel, subcategoryModel }) => {
  const PORT = process.env.PORT ?? 3200;
  const app = express();

  app.disable("x-powered-by");

  app.use(express.json());
  app.use(cors());

  app.use("/categories", createCategoryRouter({ categoryModel }));
  app.use("/subcategories", createSubcategoryRouter({ subcategoryModel }));

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
