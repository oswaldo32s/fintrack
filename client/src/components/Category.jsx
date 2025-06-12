import { createCategory } from "../services/categories";
import { CategoryList } from "./CategoryList";

export function CreateCategoryForm() {
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());

    const response = await createCategory({ input: formObject });
  }

  return (
    <>
      <CategoryList />
      <form onSubmit={handleSubmit}>
        <h3>New Category</h3>
        <div>
          <label htmlFor="">Category Name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label htmlFor="">Category Description</label>
          <input type="text" name="description" />
        </div>
        <button>Create Category</button>
      </form>
    </>
  );
}
