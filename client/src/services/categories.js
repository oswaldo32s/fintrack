import { BACKEND_URL } from "../utils/secrets";

export async function getCategories() {
  const response = await fetch(BACKEND_URL + "/categories");

  const { result } = await response.json();

  return result?.map((category) => ({
    id: category.ID,
    name: category.NAME,
    description: category.DESCRIPTION,
    createDateTime: new Date(category.CREATEDATETIME).toLocaleString("en-US", {
      timeZone: "America/Mexico_City",
    }),
    updateDateTime: category.UPDATEDATETIME
      ? new Date(category.UPDATEDATETIME).toLocaleString()
      : "",
  }));
}

export async function createCategory({ input }) {
  console.log(input);
  const response = await fetch(BACKEND_URL + "/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const { category } = await response.json();
  const newCategory = {
    id: category.ID,
    name: category.NAME,
    description: category.DESCRIPTION,
    createDateTime: new Date(category.CREATEDATETIME).toLocaleString("en-US", {
      timeZone: "America/Mexico_City",
    }),
    updateDateTime: category.UPDATEDATETIME
      ? new Date(category.UPDATEDATETIME).toLocaleString()
      : "",
  };

  return newCategory;
}
