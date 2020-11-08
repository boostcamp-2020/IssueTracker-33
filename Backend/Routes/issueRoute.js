const router = require('express').Router();
const { db } = require('../Models/dbPool');

router.get('/', async (req, res) => {
  try {
    const { open, author, milestone, label, assignee } = req.query;

    const innerFilterCondition = [];
    const filterValues = [];
    if (open !== undefined) {
      innerFilterCondition.push('isOpen = ?');
      filterValues.push(open);
    } else {
      // default: show open issues
      innerFilterCondition.push('isOpen = ?');
      filterValues.push('1');
    }
    if (author) {
      innerFilterCondition.push('userId = ?');
      filterValues.push(author);
    }
    if (milestone) {
      innerFilterCondition.push('milestoneId = ?');
      filterValues.push(milestone);
    }

    const whereClause = innerFilterCondition.length ? `WHERE ${innerFilterCondition.join(' AND ')}` : '';
    let baseQuery = `SELECT id, A.userId, title, milestoneId, isOpen, createdAt, openCloseAt
    FROM (SELECT * FROM issues ${whereClause}) AS A`;

    if (label || assignee) {
      let joinClause = ' ';
      let joinWhereClause = ' WHERE ';
      if (label) {
        joinClause += ' inner join labelIssue on A.id = labelIssue.issueId ';
        joinWhereClause += ' labelIssue.labelId = ? ';
        filterValues.push(label);
      }
      if (assignee) {
        joinClause += ' inner join assignees on A.id = assignees.issueId ';
        joinWhereClause += label ? ' AND ' : '';
        joinWhereClause += ' assignees.userId = ? ';
        filterValues.push(assignee);
      }
      baseQuery += joinClause + joinWhereClause;
    }

    const [issues] = await db.execute(baseQuery, filterValues);
    const results = issues.map(async (issue) => {
      let [labels] = await db.execute('SELECT labelId FROM labelIssue WHERE issueId = ? ORDER BY labelId ASC', [
        issue.id,
      ]);
      labels = labels.map(({ labelId }) => labelId);
      let [assignees] = await db.execute('SELECT userId FROM assignees WHERE issueId = ? ORDER BY userId ASC', [
        issue.id,
      ]);
      assignees = assignees.map(({ userId }) => userId);
      return { ...issue, labels, assignees };
    });
    const resolved = await Promise.all(results);
    res.json(resolved);
  } catch (err) {
    res.status(400).end();
  }
});

router.post('/', async (req, res) => {
  const { title, userId, milestoneId, labels, assignees, comment } = req.body;

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
    const commentValues = [1, insertId, comment];
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

router.get('/:issueId', async (req, res) => {
  try {
    const [[issue]] = await db.execute('SELECT * FROM issues WHERE id = ?', [req.params.issueId]);
    const [labelsResult] = await db.execute('SELECT labelId FROM labelIssue WHERE issueId = ? ORDER BY labelId ASC', [
      issue.id,
    ]);
    const labels = labelsResult.map(({ labelId }) => labelId);
    const [assigneesResult] = await db.execute('SELECT userId FROM assignees WHERE issueId = ? ORDER BY userId ASC', [
      issue.id,
    ]);
    const assignees = assigneesResult.map(({ userId }) => userId);
    res.status(200).json({ issue, labels, assignees });
  } catch (err) {
    res.status(400).end();
  }
});

router.get('/:issueId/comments', async (req, res) => {
  try {
    const [comments] = await db.execute('SELECT * FROM comments WHERE issueId = ? ORDER BY createdAt ASC', [
      req.params.issueId,
    ]);
    res.status(200).json({ comments });
  } catch (err) {
    res.status(400).end();
  }
});

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

module.exports = router;
