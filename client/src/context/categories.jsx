import { createContext, useState } from "react";

// Create the context
export const CategoryContext = createContext();

// Create the provider component
export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}
