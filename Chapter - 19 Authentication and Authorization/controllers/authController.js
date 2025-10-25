exports.getLogin = (req, res, next) => 
  { console.log(req.url, req.method);
 res.render("auth/login", {
     isLoggedIn : false
   }); 
};


exports.getSignup = (req, res, next) => 
  { console.log(req.url, req.method);
 res.render("auth/signup", {
     isLoggedIn : false
   }); 
};
exports.postLogin = (req, res , next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  // res.cookie('isLoggedIn' , true);
  // req.isLoggedIn = true;
  res.redirect('/');
}






exports.postLogout = (req, res, next) => {
  // res.cookie('isLoogedIn' , false);
  req.session.destroy(() => {
  res.redirect('/login');
  })

}






