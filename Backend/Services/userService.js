const user = require('../Models/userModel');

const getAllUsers = async () => {
  const [users] = await user.getAll();
  return users;
};

module.exports = { getAllUsers };
