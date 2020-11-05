const jwt = require('jsonwebtoken');

exports.tokenCheck = (req, res, next) => {
  const cookie = req.cookies['jwt'];
  try {
    jwt.verify(cookie, 'secretkey');
    next();
  } catch (err) {
    res.status(401).json();
  }
};

exports.tokenAllocate = (req, res) => {
  const encodedToken = jwt.sign(req.user, 'secretkey');
  res.cookie('jwt', encodedToken);
  res.redirect('http://localhost:8000/issues');
};
