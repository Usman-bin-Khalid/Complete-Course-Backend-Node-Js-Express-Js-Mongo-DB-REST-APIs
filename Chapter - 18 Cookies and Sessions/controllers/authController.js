exports.getLogin = (req, res, next) => 
  { console.log(req.url, req.method);
 res.render("auth/login", {
     isLoggedIn : false
   }); 
};

exports.postLogin = (req, res , next) => {
  console.log(req.body);
  req.isLoggedIn = true;
  res.redirect('/');
}

