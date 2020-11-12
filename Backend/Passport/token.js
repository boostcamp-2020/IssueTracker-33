const jwt = require('jsonwebtoken');
const { db } = require('../Models/dbPool');

exports.tokenCheck = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET_KEY);
    const selectSql = `SELECT id,username,imageLink FROM users WHERE id='${decodedToken.userId}'`;
    const [[result]] = await db.execute(selectSql);

    if (!result) {
      throw new Error('cannot find user at Database');
    }
    req.user = result;
    next();
  } catch (err) {
    console.log(err);
    res.redirect(process.env.NODE_ENV ? process.env.PROD_WEB_URL : process.env.DEV_WEB_URL);
  }
};

exports.tokenAllocate = (req, res) => {
  const encodedToken = jwt.sign(req.user, process.env.TOKEN_SECRET_KEY);
  res.cookie('jwt', encodedToken);
  res.redirect(process.env.NODE_ENV ? `${process.env.PROD_WEB_URL}/issues` : `${process.env.DEV_WEB_URL}/issues`);
};
