import oracledb from "oracledb";

export class Oracle {
  static #pool = null;

  static async init() {
    oracledb.initOracleClient({
      libDir: "/opt/oracle/instantclient_23_8",
    });

    if (!this.#pool) {
      this.#pool = await oracledb.createPool({
        user: process.env.ORACLE_USER_NAME,
        password: process.env.ORACLE_USER_PASSWORD,
        connectString: process.env.ORACLE_CONNECTION,
        poolMin: 2,
        poolMax: 10,
        poolIncrement: 1,
        poolTimeout: 60,
      });
      console.log("Oracle pool ready");
    }
  }

  static getPool() {
    if (!this.#pool) {
      throw new Error("Pool not initialized");
    }
    return this.#pool;
  }

  static async getConnection() {
    const pool = Oracle.getPool();
    return await pool.getConnection();
  }

  static async closeConnection(connection) {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
}
