const { name } = require("ejs");
const Home = require("../models/home");
const fs = require('fs');

exports.getAddHome = (req, res, next) => {
  console.log(req.url, req.method);


  res.render("host/edit-home", { editing: false ,isLoggedIn : req.isLoggedIn,


    user : req.session.user,
  },



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
     

      { editing: editing, home: home, isLoggedIn : req.isLoggedIn,

        user : req.session.user,
       }
    );
  });
};
exports.postAddHome = (req, res, next) => {
  console.log("Home Registration Successfull", req.body);
  const { houseName, price, location, rating,  description } =
    req.body;
    console.log(req.file);
    if(!req.file) {
      console.log('No Image Provided');
      return res.status(422).send('No image provided');
    }
    const photo = req.file.path;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photo,
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

      { registeredHome: registeredHome, isLoggedIn : req.isLoggedIn,
 user : req.session.user,

      });
  });
};

exports.postEditHome = (req, res, next) => {
  console.log("Home Registration Successfull", req.body);
  const { id, houseName, price, location, rating,  description } =
    req.body;

  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
   
      home.description = description;
      if(req.file) {
        fs.unlink(home.photo, (err) => {
          if(err) {
            console.log('Error while deleting file' , err);
          }
        });
        home.photo = req.file.path;
      }

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


