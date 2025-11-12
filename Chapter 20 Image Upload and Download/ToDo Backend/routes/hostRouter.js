
const express = require("express");
const path = require("path");
const multer = require("multer");
const hostController = require("../controllers/hostController");

const hostRouter = express.Router();

// ================== MULTER CONFIG ==================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where images will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1731072967890.jpg
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, and JPEG allowed!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// ================== ROUTES ==================
hostRouter.get("/add-home", hostController.getAddHome);

// ✅ Use upload.single("photo") to handle file upload
hostRouter.post("/add-home", upload.single("photo"), hostController.postAddHome);

hostRouter.get("/host-home-list", hostController.getHostHomes);
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);

// ✅ Also allow photo update in edit route
hostRouter.post("/edit-home", upload.single("photo"), hostController.postEditHome);

hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);

module.exports = hostRouter;

 