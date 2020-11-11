// TODO: check parameter type and/or pattern

const checkUndefined = (...args) => {
  return args.some((arg) => arg === undefined);
};

const label = (req, res, next) => {
  const { name, color, description } = req.body;
  if (checkUndefined(name, color, description)) {
    return res.status(400).json({ message: 'Bad Parameters' });
  }
  return next();
};

const commentUpdate = (req, res, next) => {
  const { description } = req.body;
  if (checkUndefined(description)) {
    return res.status(400).json({ message: 'Bad Parameters' });
  }
  return next();
};

const commentCreate = (req, res, next) => {
  const { id } = req.user;
  const { issueId, description } = req.body;
  if (checkUndefined(id, issueId, description)) {
    return res.status(400).json({ message: 'Bad Parameters' });
  }
  return next();
};

module.exports = { label, commentCreate, commentUpdate };
