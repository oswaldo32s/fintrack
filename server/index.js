import { createApp } from "./app.js";
import { Oracle } from "./db_connections/oracle.js";
import { CategoryModel } from "./models/AutonomousDB/category.js";
import { SubcategoryModel } from "./models/AutonomousDB/subcategory.js";

const main = async () => {
  await Oracle.init();
  createApp({
    categoryModel: CategoryModel,
    subcategoryModel: SubcategoryModel,
  });
};

main().catch((err) => {
  console.error("Fatal error during app startup:", err);
});
