const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");

module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
    
  }

  save() {
    const db = getDB();
    return db.collection('favourites').findOne({houseId : this.houseId

    }).then(existingFav => {
      if(!existingFav) {
        return db.collection('favourites').insertOne(this);
      }
      return Promise.resolve();
    })
  
  }

  
  static getFavourites() {
    const db = getDB();
    return db.collection('homes').find().toArray();
  
  }

  static deleteById(delHomeId) {
    const db = getDB();
    return db.collection('favourites').deleteOne({houseId: delHomeId});
   
  }

  
 
};
