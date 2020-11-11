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

module.exports = { label };
