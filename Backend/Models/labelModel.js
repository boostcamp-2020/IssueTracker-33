const { db } = require('./dbPool');

const getAll = () => {
  const query = `SELECT id, color, name, description FROM labels`;
  return db.execute(query);
};

const create = ({ name, description, color }) => {
  const query = 'INSERT INTO labels(name, description, color) VALUES(?, ?, ?)';
  const labelData = [name, description, color];
  return db.execute(query, labelData);
};

const deleteById = (id) => {
  const query = 'DELETE FROM labels WHERE id = ?';
  return db.execute(query, [id]);
};

const updateById = ({ name, description, color }, id) => {
  const query = 'UPDATE labels SET name = ?, description = ?, color = ? WHERE id = ?';
  const labelData = [name, description, color, id];
  return db.execute(query, labelData);
};

module.exports = { getAll, create, deleteById, updateById };
