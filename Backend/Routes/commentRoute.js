const router = require('express').Router();
const { db } = require('../Models/dbPool');

router.post('/', async (req, res) => {
  const { userId, issueId, description } = req.body;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const commentValues = [userId, issueId, description];
    const [result] = await db.execute(
      'INSERT INTO comments(userId, issueId, description) VALUES(?, ?, ?)',
      commentValues,
    );
    const { insertId } = result;
    const [comment] = await db.execute('SELECT * FROM comments WHERE id = ? ORDER BY createdAt ASC', [insertId]);
    await conn.commit();
    res.status(200).json({ comment });
  } catch (err) {
    await conn.rollback();
    res.status(400).end();
  }
});

module.exports = router;
