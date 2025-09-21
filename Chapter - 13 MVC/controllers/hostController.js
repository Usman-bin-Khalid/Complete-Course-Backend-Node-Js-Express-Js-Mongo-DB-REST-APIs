const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  console.log(req.url, req.method);

  res.render("host/addHome");
};

exports.postAddHome = (req, res, next) => {
  console.log("Home Registration Successfull", req.body);
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photoUrl
  );
  home.save();

  res.render("host/home-added");
};

exports.getHostHomes = (req, res, next) => {
  const registeredHome = Home.fetchAll((registeredHome) =>
    res.render("host/host-home-list", { registeredHome: registeredHome })
  );
};
