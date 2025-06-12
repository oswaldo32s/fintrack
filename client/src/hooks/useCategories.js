import { useState, useEffect } from "react";
import { getCategories } from "../services/categories";

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  return { categories };
}
