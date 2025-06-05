import {
  validateCategory,
  validatePartialCategory,
} from "../schemas/categories.js";

export class CategoryController {
  constructor({ categoryModel }) {
    this.categoryModel = categoryModel;
  }

  getAll = async (req, res) => {
    const categories = await this.categoryModel.getAll();
    res.json(categories);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const category = await this.categoryModel.getById({ id });

    if (category) return res.json(category);

    res.status(404).json({ message: "category not found" });
  };

  create = async (req, res) => {
    const result = validateCategory(req.body);

    if (result.error)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const newCategory = await this.categoryModel.create({ input: result.data });

    if (newCategory.error)
      return res.status(400).json({ error: newCategory.error });

    res.json(newCategory);
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = validatePartialCategory(req.body);

    if (result.error)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const updatedCategory = await this.categoryModel.update({
      id,
      input: result.data,
    });

    if (updatedCategory.error)
      return res.status(404).json({ message: updatedCategory.error });

    res.json(updatedCategory);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const deletedCategory = await this.categoryModel.delete({ id });

    if (!deletedCategory)
      return res.status(404).json({ message: "category id does not exist" });

    res.json(deletedCategory);
  };
}
