const router = require('express').Router();
const { getUsers } = require('../Controllers/userController');

router.get('/', getUsers);

module.exports = router;
