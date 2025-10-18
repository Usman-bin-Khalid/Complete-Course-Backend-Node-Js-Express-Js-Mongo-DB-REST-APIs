const { name } = require("ejs");
const Home = require("../models/home");

exports.getLogin = (req, res, next) => {
  console.log(req.url, req.method);

  res.render("auth/login");
};

