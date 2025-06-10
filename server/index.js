import { createApp } from "./app.js";
import { Oracle } from "./db_connections/oracle.js";
import { CategoryModel } from "./models/AutonomousDB/category.js";

const main = async () => {
  await Oracle.init();
  createApp({ categoryModel: CategoryModel});
};

main().catch((err) => {
  console.error("Fatal error during app startup:", err);
});
