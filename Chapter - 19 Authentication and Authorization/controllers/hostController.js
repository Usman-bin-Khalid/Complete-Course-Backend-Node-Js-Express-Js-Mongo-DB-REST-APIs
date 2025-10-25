const { name } = require("ejs");
const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  console.log(req.url, req.method);

  res.render("host/edit-home", { editing: false ,isLoggedIn : req.isLoggedIn},



  );
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    console.log(req.url, req.method);

    res.render(
      "host/edit-home",
     

      { editing: editing, home: home, isLoggedIn : req.isLoggedIn }
    );
  });
};
exports.postAddHome = (req, res, next) => {
  console.log("Home Registration Successfull", req.body);
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
  });

  home.save().then(() => {
    console.log("Home Saved Successfully"); // If database created and add home in database
    // than this log will show
  });
  res.redirect("/host/host-home-list");
};

exports.getHostHomes = (req, res, next) => {
  const registeredHome = Home.find().then((registeredHome) => {
    res.render("host/host-home-list",

      { registeredHome: registeredHome, isLoggedIn : req.isLoggedIn});
  });
};

exports.postEditHome = (req, res, next) => {
  console.log("Home Registration Successfull", req.body);
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.photoUrl = photoUrl;
      home.description = description;

      home
        .save()
        .then((result) => {
          console.log("Home Updated :", result);
        })
        .catch((err) => {
          console.log("Error while updating : ", err);
        });
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error while finding home : ", err);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete home", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting", error);
    });
};
