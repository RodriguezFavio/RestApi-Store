const { DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD, DB_USER, PORT } = process.env;

const config = {
  port: PORT || 3000,
  dbPort: DB_PORT,
  dbHost: DB_HOST,
  dbName: DB_NAME,
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
};

module.exports = { config };
