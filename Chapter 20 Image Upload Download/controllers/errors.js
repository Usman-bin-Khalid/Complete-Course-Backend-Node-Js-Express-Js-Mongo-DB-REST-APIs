exports.pageNotFound =  (req, res , next) => {
 res.status(404).render('404',
{isLoggedIn : req.isLoggedIn,
 user : req.session.user,

},

 );

}