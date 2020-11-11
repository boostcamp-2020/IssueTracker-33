const { db } = require('./dbPool');

const getAll = () => {
  const query = `SELECT id, username, imageLink FROM users`;
  return db.execute(query);
};

module.exports = { getAll };
