const router = require('express').Router();
const { db } = require('../Models/dbPool');
const { getIssues, getSpecifiedIssue, getCommentsOfSpecifiedIssue } = require('../Controllers/issueController');

router.get('/', getIssues);

// TODO: refactor
router.post('/', async (req, res) => {
  const { id: userId } = req.user;
  const { title, milestoneId, labels, assignees, comment } = req.body;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // issue 추가 - 추가된 id 받기
    const issueValues = [userId, title, milestoneId, 1];
    const insertResult = await conn.query(
      'INSERT INTO issues(userId, title, milestoneId, isOpen) VALUES(?, ?, ?, ?)',
      issueValues,
    );
    const { insertId } = insertResult[0];
    // comment 추가
    const commentValues = [userId, insertId, comment];
    await conn.query('INSERT INTO comments(userId, issueId, description) VALUES(?, ?, ?)', commentValues);
    // 있을 때만 작업해줄 데이터!
    // labels (관계테이블), 반복문
    if (labels !== undefined) {
      await labels.reduce(async (lastPromise, label) => {
        await lastPromise;
        const labelQuery = `INSERT INTO labelIssue(labelId, issueId) VALUES(${label}, ${insertId})`;
        await conn.query(labelQuery);
      }, Promise.resolve());
    }
    // Assignees (관계테이블), 반복문
    if (assignees !== undefined) {
      await assignees.reduce(async (lastPromise, assignee) => {
        await lastPromise;
        const assigneeQuery = `INSERT INTO assignees(userId, issueId) VALUES(${assignee}, ${insertId})`;
        await conn.query(assigneeQuery);
      }, Promise.resolve());
    }
    await conn.commit();
    // TODO: 성공, 실패 json 반환 관련 처리 필요
    res.json({ message: 'success!' });
  } catch {
    console.log('error');
    await conn.rollback();
  } finally {
    await conn.release();
  }
});

router.get('/:issueId', getSpecifiedIssue);
router.get('/:issueId/comments', getCommentsOfSpecifiedIssue);

router.patch('/:issueId/status', async (req, res) => {
  try {
    const { issueId } = req.params;
    const { isOpen } = req.body;
    const [{ affectedRows }] = await db.execute('UPDATE issues SET isOpen = ? WHERE id = ?', [isOpen, issueId]);
    if (affectedRows !== 1) res.status(404).end();
    else res.status(204).end();
  } catch (err) {
    res.status(400).end();
  }
});

router.patch('/:issueId/title', async (req, res) => {
  const { title } = req.body;
  const { issueId } = req.params;
  try {
    const [result] = await db.execute('UPDATE issues SET title = ? WHERE id = ?', [title, issueId]);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).end();
  }
});

// TODO: refactor
router.patch('/status', async (req, res) => {
  let conn = null;
  const { issues, isOpen } = req.body;
  try {
    conn = await db.getConnection();

    await conn.beginTransaction();
    const querys = issues.map((issueId) => {
      return conn.execute('UPDATE issues SET isOpen = ? WHERE id = ?', [isOpen, issueId]);
    });

    const isFailure = (await Promise.all(querys)).some(([{ affectedRows }]) => affectedRows !== 1);
    if (isFailure) {
      await conn.rollback();
      return res.status(404).end();
    }
    await conn.commit();
    res.status(204).end();
  } catch (err) {
    if (conn) await conn.rollback();
    res.status(400).end();
  } finally {
    if (conn) await conn.release();
  }
});

router.patch('/:issueId/milestone', async (req, res) => {
  const { milestone } = req.body;
  const { issueId } = req.params;
  try {
    const [result] = await db.execute('UPDATE issues SET milestone = ? WHERE id = ?', [milestone, issueId]);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).end();
  }
});

// TODO: refactor
router.patch('/:issueId/labels', async (req, res) => {
  const { labels } = req.body;
  const { issueId } = req.params;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    await conn.execute('DELETE FROM labelIssue WHERE issueId = ?', [issueId]);
    await labels.reduce(async (lastPromise, label) => {
      await lastPromise;
      const labelQuery = `INSERT INTO labelIssue(labelId, issueId) VALUES(${label}, ${issueId})`;
      await conn.query(labelQuery);
    }, Promise.resolve());
    await conn.commit();
    res.status(200).json({ result: true });
  } catch (err) {
    await conn.rollback();
    res.status(400).end();
  } finally {
    conn.release();
  }
});

// TODO: refactor
router.patch('/:issueId/assignees', async (req, res) => {
  const { assignees } = req.body;
  const { issueId } = req.params;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    await conn.execute('DELETE FROM assignees WHERE issueId = ?', [issueId]);
    await assignees.reduce(async (lastPromise, assignee) => {
      await lastPromise;
      const assigneeQuery = `INSERT INTO assignees(assigneeId, issueId) VALUES(${assignee}, ${issueId})`;
      await conn.query(assigneeQuery);
    }, Promise.resolve());
    await conn.commit();
    res.status(200).json({ result: true });
  } catch (err) {
    await conn.rollback();
    res.status(400).end();
  } finally {
    conn.release();
  }
});

module.exports = router;
