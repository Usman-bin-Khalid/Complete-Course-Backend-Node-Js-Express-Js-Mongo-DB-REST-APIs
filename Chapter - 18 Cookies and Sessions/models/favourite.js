const mongoose = require('mongoose');
const favouriteSchema  = mongoose.Schema({
  houseId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Home', //Model ka nam jis ki object id hum use kr rhy hyn
    required : true,
    unique : true,
  }
});

module.exports = mongoose.model('Favourite' , favouriteSchema);