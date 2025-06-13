import { useEffect, useContext } from "react";
import { getCategories } from "../services/categories";
import { CategoryContext } from "../context/categories";

export function useCategories() {
  const { categories, setCategories } = useContext(CategoryContext);

  function appendCategory({ newCategory }) {
    if (categories) {
      setCategories((prev) => [...prev, newCategory]);
    } else {
      setCategories([newCategory]);
    }
  }

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  return { categories, appendCategory };
}
