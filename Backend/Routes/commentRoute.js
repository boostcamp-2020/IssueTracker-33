const router = require('express').Router();
const { db } = require('../Models/dbPool');

router.post('/', async (req, res) => {
  const { id } = req.user;
  const { issueId, description } = req.body;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const commentValues = [id, issueId, description];
    const [result] = await conn.execute(
      'INSERT INTO comments(userId, issueId, description) VALUES(?, ?, ?)',
      commentValues,
    );
    const { insertId } = result;
    const [comment] = await conn.execute('SELECT * FROM comments WHERE id = ?', [insertId]);
    await conn.commit();
    res.status(200).json({ comment });
  } catch (err) {
    await conn.rollback();
    res.status(400).end();
  } finally {
    conn.release();
  }
});

router.patch('/:commentId', async (req, res) => {
  const { description } = req.body;
  const { commentId } = req.params;
  try {
    const [result] = await db.execute('UPDATE comments SET description = ? WHERE id = ?', [description, commentId]);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).end();
  }
});

module.exports = router;
