
const Home = require("../models/home");
const User = require("../models/user");

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


exports.getFavouritesList = async (req, res, next) => {
 const userId =  req.session.user._id;
 const user = await User.findById(userId).populate('favourites');
//  const favouriteHomes = favourites.map((fav) => fav.houseId);
 res.render('store/favourite-list', {
  favouriteHomes: user.favourites,
  isLoggedIn : req.isLoggedIn,
  user : req.session.user,
 });
 console.log('User: ' , user);
 
};

exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id; 
  const userId =  req.session.user._id;
  const user = await User.findById(userId);
  if(!user.favourites.includes(homeId)) {
  user.favourites.push(homeId);
  await user.save();
  }
    res.redirect('/favourites');
};




exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
    const userId =  req.session.user._id;
  const user = await User.findById(userId);
  if(user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter(fav => fav != homeId);
    await user.save();
  }
  res.redirect('/favourites')
  
  
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
