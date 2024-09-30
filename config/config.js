require('dotenv').config();

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  PORT,
  NODE_ENV,
  DATABASE_URL,
  API_KEY,
  JWT_SECRET,
  NM_EMAIL,
  NM_PASSWORD,
} = process.env;

const config = {
  env: NODE_ENV || 'dev',
  isProd: NODE_ENV === 'production',
  port: PORT || 3000,
  dbPort: DB_PORT,
  dbHost: DB_HOST,
  dbName: DB_NAME,
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
  dbUrl: DATABASE_URL,
  apiKey: API_KEY,
  jwtSecret: JWT_SECRET,
  nmEmail: NM_EMAIL,
  nmPassword: NM_PASSWORD,
};

module.exports = { config };
