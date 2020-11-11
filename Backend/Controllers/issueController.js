const { getAllIssues, getIssueById } = require('../Services/issueService');

const getIssues = async (req, res, next) => {
  try {
    const filterData = req.query;
    const issues = await getAllIssues(filterData);
    return res.json(issues);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const getSpecifiedIssue = async (req, res, next) => {
  const { issueId } = req.params;
  try {
    const result = await getIssueById(issueId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = { getIssues, getSpecifiedIssue };
