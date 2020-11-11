const label = require('../Models/labelModel');

const getAllLabels = async () => {
  const [labels] = await label.getAll();
  return labels;
};

const createLabel = async ({ name, color, description }) => {
  const [{ insertId }] = await label.create({ name, color, description });
  return insertId;
};

const deleteLabelById = async (id) => {
  const [{ affectedRows }] = await label.deleteById(id);
  return affectedRows;
};

const updateLabelById = async ({ name, color, description }, id) => {
  const [{ affectedRows }] = await label.updateById({ name, color, description }, id);
  return affectedRows;
};

module.exports = { getAllLabels, createLabel, deleteLabelById, updateLabelById };
