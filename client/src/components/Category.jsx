import { createCategory } from "../services/categories";
import { CategoryList } from "./CategoryList";
import { useCategories } from "../hooks/useCategories";
import { useId } from "react";

export function CreateCategoryForm() {
  const { appendCategory } = useCategories();
  const categoryNameId = useId();
  const categoryDescriptionId = useId();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());

    const response = await createCategory({ input: formObject });
    appendCategory({ newCategory: response });

    e.target.reset();
  }

  return (
    <>
      <CategoryList />
      <form onSubmit={handleSubmit}>
        <h3>New Category</h3>
        <div>
          <label htmlFor={categoryNameId}>Category Name</label>
          <input type="text" name="name" id={categoryNameId} />
        </div>
        <div>
          <label htmlFor={categoryDescriptionId}>Category Description</label>
          <input type="text" name="description" id={categoryDescriptionId} />
        </div>
        <button>Create Category</button>
      </form>
    </>
  );
}
