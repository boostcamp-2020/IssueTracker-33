const { db } = require('./dbPool');

const getUserIdByIssueId = (issueId) => {
  const query = 'SELECT userId FROM assignees WHERE issueId = ? ORDER BY userId ASC';
  return db.execute(query, [issueId]);
};

module.exports = { getUserIdByIssueId };
