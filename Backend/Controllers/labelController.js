const { getAllLabels, createLabel, deleteLabelById, updateLabelById } = require('../Services/labelService');

const getLabels = async (req, res, next) => {
  try {
    const labels = await getAllLabels();
    return res.json(labels);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const postLabel = async (req, res, next) => {
  try {
    const labelData = req.body;
    const insertId = await createLabel(labelData);
    return res.json({ insertId });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const deleteLabel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRows = await deleteLabelById(id);
    if (deletedRows === 0) return res.status(404).end();
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const patchLabel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const labelData = req.body;
    const affectedRows = await updateLabelById(labelData, id);
    if (affectedRows === 0) return res.status(404).end();
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = { getLabels, postLabel, deleteLabel, patchLabel };
