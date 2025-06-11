export class SubcategoryController {
  constructor({ subcategoryModel }) {
    this.subcategoryModel = subcategoryModel;
  }

  getAll = async (req, res) => {
    const results = await this.subcategoryModel.getAll();
    res.json(results);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const subcategory = await this.subcategoryModel.getById({ id });
    if (subcategory) return res.json(subcategory);
    if (subcategory.error) return res.status(400).json(subcategory);
    res.status(404).json({ error: "No subcategory found" });
  };
}
