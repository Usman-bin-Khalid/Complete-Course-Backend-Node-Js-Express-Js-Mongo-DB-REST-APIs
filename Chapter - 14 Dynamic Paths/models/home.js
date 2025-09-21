// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const { error } = require("console");

 const homeDataPath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }
  // Function define krny ka short syntax hy
  save() {

    Home.fetchAll((registeredHome) => {
      if(this.id) { // Edit home case
      registeredHome = registeredHome.map(home => 
        home.id === this.id ? this : home
        // if (home.id === this.id) {
        //     return this;
        // }return home;
    )
      }else { // Add home case
    this.id = Math.random().toString();
          registeredHome.push(this);
      }

      // Aisa krny ky bd UI mai koi home show nhi hoga because
      // aisa krny pr data waly folder ky andr 'home.json'
      // ki file add hui hy ya us mai data add hua hy or
      // nodemon ko lga hy k server reload hua hy or us ny
      // new server strt kr dia hy or hamra data del ho gya hy
      // phly wala
      // Solution
      // Is ka solution ye hy k aim file create ki hai nodemon.json
      // name ki
     
      fs.writeFile(homeDataPath, JSON.stringify(registeredHome), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    
    fs.readFile(homeDataPath, (error, data) => {
      console.log("File read", error, data);
      callback(!error ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
     this.fetchAll(homes => {
   const homeFound = homes.find(home =>home.id === homeId);
   callback(homeFound);
     }) 
  }
};
