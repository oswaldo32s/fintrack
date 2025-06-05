// Optional: explicitly specify the Instant Client directory (Thick mode)
import oracledb from "oracledb";

oracledb.initOracleClient({ libDir: "/opt/oracle/instantclient_23_8" });

const config = {
  user: process.env.ORACLE_USER_NAME,
  password: process.env.ORACLE_USER_PASSWORD,
  connectString: process.env.ORACLE_CONNECTION,
  poolMin: 2,
  poolMax: 10,
  poolIncrement: 1,
};

const pool = await oracledb.createPool(config);

async function run() {
  console.log("Starting connection test...");
  let connection;
  try {
    connection = await pool.getConnection();
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
    console.log(categories);
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

run();
