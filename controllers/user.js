const User = require("../models/user");

exports.postSignUp = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const data = await User.create({
      name: name,
      email: email,
      password: password,
    });
    return res.status(201).json({
      data: data,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    let result;
    const email = req.body.email;
    const password = req.body.password;
    const data = await User.findOne({ where: { email: email } }).then(
      (resu) => {
        if (resu.password == password) {
          return res.status(200).json({ data: "User Successfully logged in" });
        } else if (resu.password != password) {
          return res.status(401).json({ data: "Incorrect Password" });
        }
      }
    );
  } catch (err) {
    res.status(404).json({ data: "User not found" });
  }
};
