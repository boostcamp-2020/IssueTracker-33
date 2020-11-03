const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

router.get('/', async (req, res, next) => {
  const sql = `SELECT * FROM users`;

  const results = await pool.execute(sql);
  res.json(results[0]);
});

module.exports = router;
