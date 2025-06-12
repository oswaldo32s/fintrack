import { useCategories } from "../hooks/useCategories";

export function CategoryList() {
  const { categories } = useCategories();
  const CATEGORY_HEADERS = [
    "ID",
    "Name",
    "Description",
    "Create Date & Time",
    "Update Date & Time",
  ];

  return (
    <table>
      <thead>
        <tr>
          {CATEGORY_HEADERS.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>{category.createDateTime}</td>
            <td>{category.updateDateTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
