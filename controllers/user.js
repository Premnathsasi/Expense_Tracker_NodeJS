const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.postSignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      console.log(err);
      await User.create({ name, email, password: hash })
        .then((result) => {
          return res.status(201).json({
            message: "Account successfully created",
            data: result,
          });
        })
        .catch((err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
        });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ where: { email: email } }).then(
      (resu) => {
        if (!resu) {
          return res.status(404).json({ data: "User not found" });
        }
        bcrypt.compare(password, resu.password, (err, result) => {
          if (result) {
            return res
              .status(200)
              .json({ data: "User Successfully logged in" });
          } else {
            return res.status(401).json({ data: "Incorrect Password" });
          }
        });
      }
    );
  } catch (err) {
    res.status(404).json({ data: "Something went wrong" });
  }
};
