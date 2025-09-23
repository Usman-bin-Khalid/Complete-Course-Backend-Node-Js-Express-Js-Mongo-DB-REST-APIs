

// External Module
const express = require("express");

// Express Router
const storeRouter = express.Router();

// Controllers ky liy export
const storeController = require("../controllers/storeController");
storeRouter.get("/", storeController.getIndex);
storeRouter.get("/booking",storeController.getBookings);
storeRouter.get("/homes" , storeController.getHome);
storeRouter.get("/favourites" , storeController.getFavouritesList);
storeRouter.get("/homes/:homeId" , storeController.getHomeDetails);
storeRouter.post("/favourites" , storeController.postAddToFavourite);
storeRouter.post("/favourites/delete/:homeId" , storeController.postRemoveFromFavourite);

module.exports = storeRouter;
