const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getHome = (req, res, next) => {
   Home.find().then(registeredHome => {
    res.render("store/home-list", 
      
      { registeredHome: registeredHome, isLoggedIn : req.isLoggedIn, 

        user : req.session.user,
      })
});
};

exports.getIndex = (req, res, next) => {
  console.log('Session Value ' , req.session)
  Home.find().then(registeredHome => {
  res.render("store/index", 
    
    {
      registeredHome: registeredHome,
      isLoggedIn : req.isLoggedIn,
      user : req.session.user,
    })
  });
 
};
exports.getBookings = (req, res, next) => {
  res.render("store/booking", {
 isLoggedIn : req.isLoggedIn,
 user : req.session.user,
  }
  );
};


exports.getFavouritesList = (req, res, next) => {
  Favourite.find()
    .populate('houseId')
    .then((favourites) => {
      // Filter out favourites with missing home references
      const favouriteHomes = favourites
        .map(fav => fav.houseId)
        .filter(home => home !== null);

      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        isLoggedIn : req.isLoggedIn,
        user : req.session.user,
      });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id; 
  Favourite.findOne({houseId : homeId}).then((fav) => {
    if(fav) {
 console.log('Already marked as favourite')
 
    }else {
      fav = new Favourite({houseId : homeId});
      fav.save().then((result) => {
        console.log('Fav added : ' , result);

      });
    }
    res.redirect('/favourites');
     
   
  }).catch(err => {
    console.log('Error while marked as favourites : ' , err);
  });
  
};




exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({houseId : homeId}).then(result => {
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
      res.render("store/home-detail", 
        
        {
          isLoggedIn : req.isLoggedIn,
          user : req.session.user,
        home: home,
      });
    }
  });
};
