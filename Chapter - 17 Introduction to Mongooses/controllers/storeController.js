const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getHome = (req, res, next) => {
   Home.find().then(registeredHome => {
    res.render("store/home-list", { registeredHome: registeredHome })
});
};

exports.getIndex = (req, res, next) => {
  Home.find().then(registeredHome => {
  res.render("store/index", {
      registeredHome: registeredHome,
    })
  });
 
};
exports.getBookings = (req, res, next) => {
  res.render("store/booking");
};

exports.getFavouritesList = (req, res, next) => {
  Favourite.getFavourites().then(favourites => {
    favourites = favourites.map(fav => fav.houseId);
     Home.find().then(registeredHome => {
      console.log(favourites, registeredHome);
      const favouriteHomes = registeredHome.filter((home) =>
        favourites.includes(home._id.toString())
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
      });
    });
  });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id; 
  const fav = new Favourite(homeId);
  fav.save().then(result => {
    console.log('Fav added : ' , result);
  }).catch(err => {
    console.log('Error while marking favourite : ' , err).finally(() => {
      res.redirect("/favourites");
    });
  })
};




exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId).then(result => {
    console.log("Fav removed : " , result);
  }).catch(err => {
    console.log('Error while removing favouries: ' , err);
  }).finally(() => {
   res.redirect('/favourites')
  });
  
  
};



exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At home details page", homeId);
  Home.findById(homeId).then(home => {
   
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      console.log("Home details found", home);
      res.render("store/home-detail", {
        home: home,
      });
    }
  });
};
