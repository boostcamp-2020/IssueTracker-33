const { getAllUsers } = require('../Services/userService');

const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = { getUsers };
