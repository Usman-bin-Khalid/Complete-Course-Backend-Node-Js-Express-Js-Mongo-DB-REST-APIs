const { check, validationResult } = require("express-validator");
const User = require('../models/user');
const bcrypt = require('bcryptjs')

exports.getLogin = (req, res, next) => 
  { console.log(req.url, req.method);
 res.render("auth/login", {
     isLoggedIn : false,
         errors: [], 
             oldInput: { email: '' } 
   }); 
};


exports.getSignup = (req, res, next) => 
  { console.log(req.url, req.method);
 res.render("auth/signup", {
     isLoggedIn : false,
     errors : [],
     oldInput : {firstname : '', lastname : '', userType : '' , password : ''}
   }); 

};


exports.postSignup = [
  check('firstname').trim().isLength({min : 2}).withMessage(`First name must be at least
    2 characters long`).matches(/^[A-Za-z\s]+$/).withMessage('First name should contain only alphabets'),
  check('lastname').matches(/^[A-Za-z\s]*$/).withMessage('Last name should contain only alphabets'),
  check('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
  check('password').isLength({min : 8}).withMessage('Password should be atleast 8 characters long').matches(/[A-Z]/).withMessage('Password should contain at least one upper case letter').matches(/[a-z]/).withMessage('Password should contain atleast one lower case letter').matches(/[0-9]/).withMessage('Password should contain atleast one number')
  .matches(/[!@$]/).withMessage('Password must contain atleast one special character').trim(),
  check('confirmPassword').trim().custom((value, {req}) => {
    if(value !== req.body.password) {
      throw new Error('Password do not match');
    }
    return true;
  }),
  check('userType').notEmpty().withMessage('Please select a user type').isIn(['guest' , 'host']).withMessage('Invalid user type'),
  check('terms').notEmpty().withMessage('Please accept the terms and conditions').custom((value, {req}) => {
    if (value !== 'on') {
      throw new Error('Please accept the terms and conditions');
    }
    return true;
  }),

    (req, res , next) => {
        const {firstname, lastname, email, password ,  userType,
    
  } = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      isLoggedIn: false,
      errors : errors.array().map(err => err.msg),
      oldInput : {firstname, lastname, email, userType} 
    });
  }
    bcrypt.hash(password, 12).then(hashedPassword => {
      const user = new User({firstname, lastname, email, password : hashedPassword, userType});
      return user.save();

    }).then(() => {
      res.redirect('/login');
    }).catch(err => {
      return res.status(422).render('auth/signup' , {
        errors : [err.message],
         isLoggedIn: false,
        oldInput : {firstname, lastname, email, userType}
      });
    });
   

} ]
exports.postLogin = async (req, res , next) => {
  const {email, password}  = req.body;
  const user = await User.findOne({email});
  if(!user) {
    return res.status(422).render('auth/login', {
      isLoggedIn : false,
      errors : ['User does not exist'],
      oldInput : {email}
    });
  }
  console.log(req.body);
  req.session.isLoggedIn = true;
 
  res.redirect('/');
}






exports.postLogout = (req, res, next) => {
  // res.cookie('isLoogedIn' , false);
  req.session.destroy(() => {
  res.redirect('/login');
  })

}






