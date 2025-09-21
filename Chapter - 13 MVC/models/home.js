// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const { error } = require("console");

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
      registeredHome.push(this);
      // Aisa krny ky bd UI mai koi home show nhi hoga because
      // aisa krny pr data waly folder ky andr 'home.json'
      // ki file add hui hy ya us mai data add hua hy or
      // nodemon ko lga hy k server reload hua hy or us ny
      // new server strt kr dia hy or hamra data del ho gya hy
      // phly wala
      // Solution
      // Is ka solution ye hy k aim file create ki hai nodemon.json
      // name ki
      const homeDataPath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(homeDataPath, JSON.stringify(registeredHome), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    fs.readFile(homeDataPath, (error, data) => {
      console.log("File read", error, data);
      callback(!error ? JSON.parse(data) : []);
    });
  }
};
