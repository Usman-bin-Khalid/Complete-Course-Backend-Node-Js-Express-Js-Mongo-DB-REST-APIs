const { getDB } = require("../utils/databaseUtil");

module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
    
  }

  save() {
    const db = getDB();
    return db.collection('favourites').insertOne(this);
  }

  
  static getFavourites(callBack) {
  
  }

  static deleteById(delHomeId, callback) {
   
  }

  
 
};
