import { Oracle } from "../../db_connections/oracle.js";
import { randomUUID } from "node:crypto";

export class CategoryModel {
  static async getAll() {
    let connection;
    try {
      connection = await Oracle.getConnection();
      const result = await connection.execute(`SELECT * FROM finance.category`);
      const categories = result.rows.map(
        ([id, name, description, createDatetime, updateDatetime]) => {
          return {
            id,
            name,
            description,
            createDatetime,
            updateDatetime,
          };
        }
      );
      return categories;
    } catch (error) {
      console.log("ERROR: ", error);
      return { ERROR: "Failed to retrive categories" };
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  static async getById({ id }) {
    let connection;
    try {
      connection = await Oracle.getConnection();
      const result = await connection.execute(
        `
        SELECT * 
        FROM finance.category
        WHERE id = :id`,
        { id }
      );
      console.log(result);
    } catch (error) {
      console.log("ERROR: ", error);
      return { ERROR: "Failed to retrive categories" };
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  static async create({ input }) {
    const newCategory = {
      id: randomUUID(),
      ...input,
      createDatetime: new Date().toISOString(),
    };
    categories.push(newCategory);

    return newCategory;
  }

  static async update({ id, input }) {
    const categoryIndex = categories.findIndex((category) => category.id == id);

    if (categoryIndex === -1) return false;

    const updatedCategory = {
      ...categories[categoryIndex],
      ...input,
      updateDatetime: new Date().toISOString(),
    };

    categories[categoryIndex] = updatedCategory;
  }

  static async delete({ id }) {
    const categoryIndex = categories.findIndex((category) => category.id == id);

    if (categoryIndex === -1) return false;

    categories.splice(categoryIndex, 1);

    return true;
  }
}
