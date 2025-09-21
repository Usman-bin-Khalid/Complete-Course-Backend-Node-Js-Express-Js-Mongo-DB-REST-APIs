const Favourite = require("../models/favourite");
const Home = require("../models/home");

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
  Favourite.getFavourites(favourites => {
Home.fetchAll((registeredHome) => {
 const favouriteHomes =  registeredHome.filter(home =>
  favourites.includes(home.id));
  res.render("store/favourite-list" , {
    favouriteHomes : favouriteHomes
  }) })

  })
  
}

exports.postAddToFavourite = (req , res , next) => {
  console.log("Came to add to Favourites " , req.body);
  Favourite.addToFavourite(req.body.id , err => {
    if(err) {
      console.log("Error while marking favourite " , err);
    }
      res.redirect("/favourites")
  });

}
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At home details page" , homeId);
  Home.findById(homeId , home => {
    if(!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
  console.log("Home details found" , home);
    res.render("store/home-detail", {
      home : home
    });
    }
  
  })
  
};