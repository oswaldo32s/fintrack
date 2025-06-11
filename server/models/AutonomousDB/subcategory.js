import oracledb from "oracledb";
import { Oracle } from "../../db_connections/oracle.js";

export class SubcategoryModel {
  static async getAll() {
    let connection;
    try {
      connection = await Oracle.getConnection();
      const result = await connection.execute(
        `SELECT * FROM finance.sub_category ORDER BY ID`,
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      return {
        message: "sub-categories retrived",
        result: result.rows,
      };
    } catch (error) {
      console.error("ERROR: ", error);
      return { ERROR: "Failed to retrive subcategories" };
    } finally {
      Oracle.closeConnection(connection);
    }
  }

  static async getById({ id }) {
    let connection;
    try {
      connection = await Oracle.getConnection();
      const result = await connection.execute(
        `SELECT
        *
        FROM finance.sub_category
        WHERE ID = :id`,
        { id },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      if (result.rows.length == 0) return false;
      return {
        message: "sub-category retrived",
        result: result.rows,
      };
    } catch (error) {
      console.error("ERROR: ", error);
      return { ERROR: "Failed to retrive subcategory" };
    } finally {
      Oracle.closeConnection(connection);
    }
  }
}
