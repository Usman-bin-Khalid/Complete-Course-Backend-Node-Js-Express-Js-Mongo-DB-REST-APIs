

// External Module
const express = require("express");

// Express Router
const storeRouter = express.Router();

// Controllers ky liy export
const homeController = require("../controllers/storeController");
storeRouter.get("/", homeController.getIndex);
storeRouter.get("/booking", homeController.getBookings);
storeRouter.get("/homes" , homeController.getHome);
storeRouter.get("/favourites" , homeController.getFavouritesList);

module.exports = storeRouter;
