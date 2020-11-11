const { db } = require('./dbPool');

const getById = (id) => {
  const query = 'SELECT id, userId, title, milestoneId, isOpen, createdAt, openCloseAt FROM issues WHERE id = ?';
  return db.execute(query, [id]);
};

module.exports = { getById };
