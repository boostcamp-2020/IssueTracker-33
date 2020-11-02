const router = require('express').Router();
const { db } = require('../Models/dbPool');

router.get('/', (req, res) => {});

router.post('/', async (req, res) => {
  const { title, userId, milestoneId, labels, assignees, comment } = req.body;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // issue 추가 - 추가된 id 받기
    const issueValues = [userId, title, milestoneId, 1];
    // const issueValues = [1, 'title', 1, 1];
    const insertResult = await conn.query(
      'INSERT INTO issues(userId, title, milestoneId, isOpen) VALUES(?, ?, ?, ?)',
      issueValues,
    );
    const { insertId } = insertResult[0];
    console.log(insertId);
    // comment 추가
    const commentValues = [1, insertId, comment];
    const commentResult = await conn.query(
      'INSERT INTO comments(userId, issueId, description) VALUES(?, ?, ?)',
      commentValues,
    );
    // 있을 때만 작업해줄 데이터!
    // labels (관계테이블), 반복문
    if (labels !== undefined) {
      labels.forEach(async (label) => {
        const labelQuery = `INSERT INTO labelIssue(labelId, issueId) VALUES(${label}, ${insertId})`;
        await conn.query(labelQuery);
      });
    }
    // Assignees (관계테이블), 반복문
    if (assignees !== undefined) {
      assignees.forEach(async (assignee) => {
        const assigneeQuery = `INSERT INTO assignees(userId, issueId) VALUES(${assignee}, ${insertId})`;
        await conn.query(assigneeQuery);
      });
    }
    await conn.commit();
    res.json({ message: 'success!' });
  } catch {
    console.log('error');
    await conn.rollback();
  }
});

module.exports = router;
