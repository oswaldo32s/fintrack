import oracledb from "oracledb";

console.log("OracleDB version:", oracledb.versionString);

oracledb.initOracleClient({ libDir: "/usr/lib/oracle/23/client64/lib" });

const oracle_config = {
  user: "FINANCE",
  password: "OG2157!listic.",
  connectString: `fsweb_medium` // Must match an alias in tnsnames.ora
};

async function run() {
  console.log("🚀 Starting connection attempt...");
  let connection;
  try {
    connection = await oracledb.getConnection(oracle_config);
    console.log("✅ Connected to DB!");

    const result = await connection.execute('SELECT * FROM finance.category');
    console.log("✅ Query successful!");
    console.log(result);

    await connection.close();
    console.log("✅ Connection closed.");
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
  }
}

run();

