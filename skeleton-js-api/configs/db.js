const db = {
  client: "mssql",
  connection: {
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT),
  },
  pool: {
    min: 0,
    max: 100,
    idleTimeoutMillis: 30000,
  },
  options: {
    enableArithAbort: true,
  },
};

module.exports = db;
