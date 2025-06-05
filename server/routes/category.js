import { CategoryController } from "../controllers/category.js";
import { Router } from "express";

export const createCategoryRouter = ({ categoryModel }) => {
  const categoryRouter = Router();
  const categoryController = new CategoryController({ categoryModel });

  categoryRouter.get("/", categoryController.getAll);
  categoryRouter.post("/", categoryController.create);

  categoryRouter.get("/:id", categoryController.getById);
  categoryRouter.patch("/:id", categoryController.update);
  categoryRouter.delete("/:id", categoryController.delete);

  return categoryRouter;
};
