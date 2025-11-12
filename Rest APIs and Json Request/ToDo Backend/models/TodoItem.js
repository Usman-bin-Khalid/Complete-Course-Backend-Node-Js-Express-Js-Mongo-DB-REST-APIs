const mongoose = require('mongoose');
const todoItemSchema = mongoose.Schema({
  task : {
    type : String,
    required : true,
  },
  date : {
    type : Date
  },
  completed : {
    type : Boolean,
    default : false,
  },
},
 {timestamps :  true },

);


module.exports = mongoose.model('TodoItem' , todoItemSchema);