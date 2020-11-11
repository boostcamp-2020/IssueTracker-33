require('dotenv').config();
const router = require('express').Router();
const multer = require('multer');

const upload = multer();
const { postImage } = require('../Controllers/imageController');

router.post('', upload.single('image'), postImage);

module.exports = router;
