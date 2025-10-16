const mongoose = require('mongoose');
const favourite = require('./favourite');


const homeSchema = mongoose.Schema({
  houseName : {
    type : String,
    required : true,
  },
  price : {
    type : Number,
    required : true,
  },
  location : {
    type : String,
    required : true,
  },
  rating : {
    type : Number,
    required : true
  },
  photoUrl : String ,

  description : String,
});  

// When host delete his home this home will remove or delete from every place 
// like favourites or any where it is use

homeSchema.pre('findOneAndDelete' , async function(next) {
  console.log('Came to pre hook while deleting a home')
  const homeId = this.getQuery() ['_id'];
  await favourite.deleteMany({homeId : homeId});
  next();
  
});

module.exports = mongoose.model('Home' , homeSchema);