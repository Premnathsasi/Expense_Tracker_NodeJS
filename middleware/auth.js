const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = jwt.verify(token, "788sd8787derygh7887g8h2325544asdaf");
    User.findByPk(user.id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

module.exports = { authenticate };
