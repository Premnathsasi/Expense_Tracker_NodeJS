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
