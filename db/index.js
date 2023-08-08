const { Pool } = require('pg');

// Load environment variables
require('dotenv').config();


const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

const db = new Pool(dbParams);



module.exports = db;

