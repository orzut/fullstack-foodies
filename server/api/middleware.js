const { models } = require("../db");
const { User } = models;
const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  isLoggedIn,
};
