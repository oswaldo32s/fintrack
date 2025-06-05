import oracledb from "oracledb";
import { Oracle } from "../../db_connections/oracle.js";

export class CategoryModel {
  static async getAll() {
    let connection;
    try {
      connection = await Oracle.getConnection();
      const result = await connection.execute(
        `SELECT * FROM finance.category ORDER BY ID`,
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      return {
        message: "categories retrived",
        result: result.rows,
      };
    } catch (error) {
      console.error("ERROR: ", error);
      return { ERROR: "Failed to retrive categories" };
    } finally {
      Oracle.closeConnection(connection);
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
        { id },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      return {
        message: "category retrived",
        result: result.rows[0],
      };
    } catch (error) {
      console.log("ERROR: ", error);
      return false;
    } finally {
      Oracle.closeConnection(connection);
    }
  }

  static async create({ input }) {
    let connection;
    try {
      connection = await Oracle.getConnection();
      const categoryName = await connection.execute(
        `SELECT * FROM finance.category WHERE LOWER(NAME) = :name`,
        {
          name: input.name.toLowerCase(),
        }
      );

      if (categoryName.rows.length != 0)
        return { error: "A category with that name already exists" };

      const insertResult = await connection.execute(
        `
        INSERT INTO finance.category (
          NAME,
          DESCRIPTION
        ) VALUES (
          :name,
          :description 
        ) RETURNING
          ID,
          CREATEDATETIME 
        INTO
          :id,
          :createDatetime 
        `,
        {
          id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
          name: input.name,
          description: input.description,
          createDatetime: { type: oracledb.DATE, dir: oracledb.BIND_OUT },
        },
        {
          autoCommit: true,
        }
      );

      const id = insertResult.outBinds.id[0];

      return {
        message: "category created",
        result: (await CategoryModel.getById({ id })).result,
      };
    } catch (error) {
      console.log(error);
    } finally {
      Oracle.closeConnection(connection);
    }
  }

  static async update({ id, input }) {
    let connection;
    try {
      connection = await Oracle.getConnection();
      const fields = [];
      const binds = {
        id,
        updateDatetime: { type: oracledb.DATE, dir: oracledb.BIND_OUT },
      };

      const categoryName = await connection.execute(
        `SELECT * FROM finance.category WHERE LOWER(NAME) = :name`,
        {
          name: input.name.toLowerCase(),
        }
      );

      if (categoryName.rows.length != 0)
        return { error: "A category with that name already exists" };

      if (input.name) {
        fields.push("NAME = :name");
        binds.name = input.name;
      }

      if (input.description) {
        fields.push("DESCRIPTION = :description");
        binds.description = input.description;
      }

      if (fields.length === 0) return { error: "No values to update" };

      const sql = `
        UPDATE finance.category
        SET ${fields.join(", ")}
        , UPDATEDATETIME = CURRENT_TIMESTAMP  
        WHERE ID = :id
        RETURNING
          UPDATEDATETIME
        INTO
          :updateDatetime
      `;

      const result = await connection.execute(sql, binds, { autoCommit: true });
      const newValue = await connection.execute(
        "SELECT * FROM finance.category WHERE ID = :id",
        { id },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      return {
        message: "category updated",
        result: newValue.rows,
      };
    } catch (error) {
      console.log(error);
    } finally {
      Oracle.closeConnection(connection);
    }
  }

  static async delete({ id }) {
    let connection;
    try {
      connection = await Oracle.getConnection();
      const deletedItem = await connection.execute(
        `SELECT * FROM finance.category WHERE ID = :id`,
        { id },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      if (deletedItem.rows.length == 0) return false;

      const deleteItem = await connection.execute(
        `DELETE FROM finance.category WHERE ID = :id`,
        { id },
        { autoCommit: true }
      );

      return {
        message: "category deleted",
        result: deletedItem.rows[0],
      };
    } catch (error) {
    } finally {
      Oracle.closeConnection(connection);
    }
  }
}
