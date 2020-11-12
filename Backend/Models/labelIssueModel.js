const { db } = require('./dbPool');

const getLabelIdByIssueId = (issueId) => {
  const query = 'SELECT labelId FROM labelIssue WHERE issueId = ? ORDER BY labelId ASC';
  return db.execute(query, [issueId]);
};

module.exports = { getLabelIdByIssueId };
