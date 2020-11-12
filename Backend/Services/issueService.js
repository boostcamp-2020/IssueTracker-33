const { db } = require('../Models/dbPool');
const issueModel = require('../Models/issueModel');
const assigneeModel = require('../Models/assigneeModel');
const labelIssueModel = require('../Models/labelIssueModel');
const commentModel = require('../Models/commentModel');

// getAllIssues() use raw queries.
const getAllIssues = async ({ open, author, milestone, label, assignee, mentions }) => {
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
  let baseQuery = `SELECT DISTINCT ISS.id, ISS.userId, ISS.title, ISS.milestoneId, ISS.isOpen, ISS.createdAt, ISS.openCloseAt
                   FROM (SELECT * FROM issues ${whereClause}) AS ISS`;

  if (label || assignee || mentions) {
    let joinClause = ' ';
    let joinWhereClause = ' WHERE ';
    if (label) {
      joinClause += ' inner join labelIssue on ISS.id = labelIssue.issueId ';
      joinWhereClause += ' labelIssue.labelId = ? ';
      filterValues.push(label);
    }
    if (assignee) {
      joinClause += ' inner join assignees on ISS.id = assignees.issueId ';
      joinWhereClause += label ? ' AND ' : '';
      joinWhereClause += ' assignees.userId = ? ';
      filterValues.push(assignee);
    }
    if (mentions) {
      joinClause += ' inner join comments on ISS.id = comments.issueId ';
      joinWhereClause += label || assignee ? ' AND ' : '';
      joinWhereClause += ' comments.userId = ? ';
      filterValues.push(mentions);
    }
    baseQuery += joinClause + joinWhereClause;
  }
  const [issues] = await db.execute(baseQuery, filterValues);

  const results = issues.map(async (issue) => {
    const [labelsResult] = await labelIssueModel.getLabelIdByIssueId(issue.id);
    const [assigneesResult] = await assigneeModel.getUserIdByIssueId(issue.id);
    const labels = labelsResult.map(({ labelId }) => labelId);
    const assignees = assigneesResult.map(({ userId }) => userId);
    return { ...issue, labels, assignees };
  });

  return Promise.all(results);
};

const getIssueById = async (id) => {
  const [[issue]] = await issueModel.getById(id);
  const [labelsResult] = await labelIssueModel.getLabelIdByIssueId(issue.id);
  const [assigneesResult] = await assigneeModel.getUserIdByIssueId(issue.id);
  const labels = labelsResult.map(({ labelId }) => labelId);
  const assignees = assigneesResult.map(({ userId }) => userId);

  return { issue, labels, assignees };
};

module.exports = { getAllIssues, getIssueById };
