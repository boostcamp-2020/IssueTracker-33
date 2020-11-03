const router = require('express').Router();
const { db } = require('../Models/dbPool');

router.get('/', async (req, res, next) => {
  const sql = `SELECT * FROM labels`;

  const results = await db.execute(sql);
  res.json(results[0]);
});

module.exports = router;
