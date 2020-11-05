const jwt = require('jsonwebtoken');

exports.tokenCheck = (req, res, next) => {
  try {
    const cookie = req.cookies.jwt;
    jwt.verify(cookie, process.env.TOKEN_SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).json();
  }
};

exports.tokenAllocate = (req, res) => {
  const encodedToken = jwt.sign(req.user, process.env.TOKEN_SECRET_KEY);
  res.cookie('jwt', encodedToken);
  res.redirect('http://localhost:8000/issues');
};
