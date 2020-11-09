const router = require('express').Router();
const { db } = require('../Models/dbPool');

router.get('/count', async (req, res) => {
  const query = `
  SELECT mi.id, mi.isOpen as mileIsOpen, mi.dueDate, mi.description, mi.title, iss.isOpen as issueIsOpen, COUNT(iss.id) as cnt
  FROM milestones mi LEFT JOIN issues iss ON mi.id = iss.milestoneId
  GROUP BY mi.id, iss.isOpen`;
  const [rows] = await db.execute(query);
  const result = {};

  rows.forEach((row) => {
    if (result[row.id]) {
      result[row.id].total += row.cnt;
      if (row.issueIsOpen) {
        result[row.id].opendIssue = row.cnt;
      } else {
        result[row.id].closedIssue = row.cnt;
      }
    } else {
      result[row.id] = {
        id: row.id,
        mileIsOpen: row.mileIsOpen,
        dueData: row.dueDate,
        description: row.description,
        title: row.title,
        total: row.cnt || 0,
      };
      if (row.issueIsOpen) {
        result[row.id].opendIssue = row.cnt;
        result[row.id].closedIssue = 0;
      } else {
        result[row.id].opendIssue = 0;
        result[row.id].closedIssue = row.cnt;
      }
    }
  });
  res.json(result);
});

router.get('/', async (req, res) => {
  const query = `SELECT * FROM milestones`;
  const results = await db.execute(query);
  res.json(results[0]);
});

router.post('/', async (req, res) => {
  const query = `INSERT INTO milestones(title, dueDate, description, isOpen) VALUES(?,?,?,?)`;
  const { title, dueDate, description } = req.body;
  await db.execute(query, [title, dueDate, description, 1]);
  res.json({});
});

module.exports = router;
