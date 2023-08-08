console.log ("hi, backend online")

const { Pool } = require('pg');

// Load environment variables
require('dotenv').config();


const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

console.log (Pool)
console.log("test")
async function listTables() {
  try {
    const client = await db.connect();
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);
    client.release();

    // Return the list of table names
    return result.rows.map(row => row.table_name);
  } catch (error) {
    console.error('Error listing tables:', error);
    throw error;
  }
}

// Example usage
listTables()
  .then(tableNames => console.log('Tables:', tableNames))
  .catch(error => console.error('Error:', error));


module.exports = db;

