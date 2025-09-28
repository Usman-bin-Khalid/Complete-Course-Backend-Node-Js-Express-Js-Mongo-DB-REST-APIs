// // Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const { error } = require("console");

const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

module.exports = class Favourite {

  static addToFavourite(homeId, callBack) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        callBack("Home is already marked favourite");
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callBack);
      }
    });
  }
  static getFavourites(callBack) {
    fs.readFile(favouriteDataPath, (error, data) => {
      console.log("File read", error, data);
      callBack(!error ? JSON.parse(data) : []);
    });
  }

  static deleteById(delHomeId, callback) {
    Favourite.getFavourites((homeIds) => {
      homeIds = homeIds.filter((homeId) => delHomeId !== homeId);
      fs.writeFile(favouriteDataPath, JSON.stringify(homeIds), callback);
    });
  }

  
 
};
