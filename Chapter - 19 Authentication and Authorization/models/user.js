const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname : {
    type : String,
    required : [true, 'First name is required']
  },
  lastname : String,
  email : {
    type : String, 
    required : [true, 'Email is required'],
    unique : true,
  },
  password : {
    type : String,
    required : [true, 'Password is required']
  },
  userType : {
    type : String,
    enum : ['guest' , 'host'],
    default : 'guest'
  }, 
  // default : [{
  //   type : mongoose.Schema.Types.ObjectId,
  //   ref : 'Home'
  // }]
  favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Home' // or whatever model 'favourites' refers to
        }
    ]
  
});  





module.exports = mongoose.model('User' , userSchema);