const Home = require("../models/home");

// exports.getAddHome = (req, res, next) => {
//   console.log(req.url, req.method);

//   res.render("host/addHome");
// };

// exports.postAddHome = (req, res, next) => {
//   console.log("Home Registration Successfull", req.body);
//   const { houseName, price, location, rating, photoUrl } = req.body;
//   const home = new Home(
//     req.body.houseName,
//     req.body.price,
//     req.body.location,
//     req.body.rating,
//     req.body.photoUrl
//   );
//   home.save();

//   res.render("host/home-added");
// };

exports.getHome = (req, res, next) => {
  const registeredHome = Home.fetchAll((registeredHome) =>
    res.render("store/home-list", { registeredHome: registeredHome })
  );
};

exports.getIndex = (req , res , next) => {
  Home.fetchAll((registeredHome) => 
  res.render("store/index", {
    registeredHome : registeredHome
  })
  )
}
exports.getBookings = (req, res, next) => {

    res.render("store/booking",)
  
};

exports.getFavouritesList = (req, res, next) => {
  Home.fetchAll((registeredHome) => 

  res.render("store/favourite-list" , {
    registeredHome : registeredHome
  }))
}