const db = require("../utils/databaseUtil");


module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl , description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id
  }
 
  save() {
   return db.execute(`INSERT INTO homes (houseName, price, location, rating, photoUrl, 
    description) VALUES (? , ?, ? , ? ,?, ? )`, [this.houseName,
      this.price, this.location, this.rating, this.photoUrl, this.description
    ]);

  
  }

  static fetchAll() {
   return db.execute(`SELECT * FROM homes`)
    
    
  }

  static findById(homeId) {
    return db.execute(`SELECT * FROM homes WHERE id =?`, [homeId])
   
  }

  static deleteById(homeId) {
   
  }


  
  

};
