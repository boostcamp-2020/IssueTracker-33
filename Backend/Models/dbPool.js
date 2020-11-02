require('dotenv').config();

const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

module.exports = { db };
