const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
