const { db } = require('./dbPool');

const getById = (id, connection = db) => {
  const query = 'SELECT * FROM comments WHERE id = ?';
  return connection.execute(query, [id]);
};

const create = async ({ userId, issueId, description }, connection = db) => {
  const insertQuery = 'INSERT INTO comments(userId, issueId, description) VALUES(?, ?, ?)';
  const commentData = [userId, issueId, description];
  return connection.execute(insertQuery, commentData);
};

const updateById = ({ description }, id) => {
  const query = 'UPDATE comments SET description = ? WHERE id = ?';
  return db.execute(query, [description, id]);
};

module.exports = { getById, create, updateById };
