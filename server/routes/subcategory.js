import { Router } from "express";
import { SubcategoryController } from "../controllers/subcategory.js";

export const createSubcategoryRouter = ({ subcategoryModel }) => {
  const subcategoryRouter = Router();
  const subcategoryController = new SubcategoryController({
    subcategoryModel,
  });

  subcategoryRouter.get("/", subcategoryController.getAll);

  subcategoryRouter.get("/:id", subcategoryController.getById);

  return subcategoryRouter;
};
