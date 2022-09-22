const { models } = require("../db");
const { User } = models;

const isLoggedIn = async (req, res, next) => {
  try {
    const token =
      req.body?.headers?.authorization || req?.headers?.authorization;
    req.user = await User.findByToken(token);
    console.log(token);
    console.log(req.user);
    next();
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  isLoggedIn,
};
