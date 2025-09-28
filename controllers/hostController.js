const { name } = require("ejs");
const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  console.log(req.url, req.method);

  res.render("host/edit-home", { editing: false });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    console.log(req.url, req.method);

    res.render(
      "host/edit-home",

      { editing: editing, home: home }
    );
  });
};
exports.postAddHome = (req, res, next) => {
  console.log("Home Registration Successfull", req.body);
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home(
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photoUrl,
    req.body.description
  );
  home.save();
  res.redirect("/host/host-home-list");
};

exports.getHostHomes = (req, res, next) => {
  const registeredHome = Home.fetchAll().then(([registeredHome]) => {
    res.render("host/host-home-list", { registeredHome: registeredHome });
  });
};

exports.postEditHome = (req, res, next) => {
  console.log("Home Registration Successfull", req.body);
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home(
    id,
    houseName,
    price,
    location,
    rating,
    description,
    photoUrl
  );
  home.save();
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete home", homeId);
  Home.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error while deleting", error);
    }
    res.redirect("/host/host-home-list");
  });
};
