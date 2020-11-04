require('dotenv').config();
const router = require('express').Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const upload = multer();

router.post('', upload.single('image'), async (req, res) => {
  const S3 = new AWS.S3({
    endpoint: new AWS.Endpoint(process.env.IMAGE_ENDPOINT),
    region: 'kr-standard',
    credentials: {
      accessKeyId: process.env.IMAGE_ACCESSKEY,
      secretAccessKey: process.env.IMAGE_SECRETACCESSKEY,
    },
  });

  const imageName = uuidv4();
  await S3.putObject({
    Bucket: process.env.IMAGE_BUCKET,
    Key: `${imageName}.PNG`,
    ACL: 'public-read',
    // ACL을 지우면 전체공개가 되지 않습니다.
    Body: req.file.buffer,
    ContentType: 'image/png',
  }).promise();

  res.json({
    imageLink: `${process.env.IMAGE_ENDPOINT}/${process.env.IMAGE_BUCKET}/${imageName}.PNG`,
  });
});

module.exports = router;
