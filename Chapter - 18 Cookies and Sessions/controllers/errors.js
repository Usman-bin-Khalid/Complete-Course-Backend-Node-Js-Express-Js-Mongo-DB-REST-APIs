exports.pageNotFount =  (req, res , next) => {
 res.status(404).render('404',
{isLoggedIn : req.isLoggedIn}

 );

}