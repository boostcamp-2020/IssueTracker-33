const router = require('express').Router();
const { db } = require('../Models/dbPool');

router.get('', async (req, res, next) => {
  const query = `SELECT * FROM labels`;

  const results = await db.execute(query);
  res.json(results[0]);
});

router.post('', async (req, res) => {
  const { name, description, color } = req.body;
  const labelValues = [name, description, color];
  const query = `INSERT INTO labels(name, description, color) VALUES(?, ?, ?)`;
  try {
    await db.execute(query, labelValues);
    res.status(200).end();
  } catch (err) {
    res.status(400).end();
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM labels WHERE id=?`;
  try {
    await db.execute(query, [id]);
    res.status(200).end();
  } catch (err) {
    res.status(400).end();
  }
});

router.patch('', async (req, res) => {
  const { id, name, description, color } = req.body;
  const labelValues = [name, description, color, id];
  const query = `UPDATE labels SET name=?, description=?, color=? WHERE id=?`;
  try {
    await db.execute(query, labelValues);
    res.status(200).end();
  } catch (err) {
    res.status(400).end();
  }
});

module.exports = router;
