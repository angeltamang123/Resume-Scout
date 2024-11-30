const Register = require("../models/users");

const registerNewUser = (req, res) => {
  try {
    Register.create(req.body);
    res.send("New account created!!");
  } catch (err) {
    res.send("something went wrong!!");
  }
};

module.exports = registerNewUser;
