const express = require("express");
const hostRouter = express.Router(); // Express ka aik apna Router function hy
//Controller ko import krny ky liy
const hostController = require("../controllers/hostController");
hostRouter.get("/add-home", hostController.getAddHome);

hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.get("/host-home-list" , hostController.getHostHomes)
hostRouter.get("/edit-home/:homeId",hostController.getEditHome)
hostRouter.post("/edit-home" , hostController.postEditHome)
hostRouter.post("/delete-home/:homeId" , hostController.postDeleteHome)

module.exports = hostRouter;
 