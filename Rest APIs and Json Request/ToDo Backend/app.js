// Core Modules
const path = require('path');

// External Modules
const express = require('express');
const session = require('express-session');
const multer = require('multer');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

// Local Modules
const todoItemRouter = require('./routes/todoItemRouter');
const errorsController = require('./controllers/errors');
const rootDir = require('./utils/pathUtils');

// MongoDB Connection String
const DB_Path = 'mongodb+srv://root:root@completecoding.mptdmv7.mongodb.net/todoItems?retryWrites=true&w=majority&appName=CompleteCoding';

// Express App Initialization
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// Session Store
const store = new MongoDBStore({
  uri: DB_Path,
  collection: 'sessions'
});

// Middleware Logger
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

// Fixed randomString Function
const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const multerOptions = { storage, fileFilter };

// Body Parsing + CORS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(multer(multerOptions).single('photo'));

// Session
app.use(session({
  secret: 'Complete Backend With Node JS',
  resave: false,
  saveUninitialized: true,
  store: store
}));

// Add custom flag
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

// Static File Serving
app.use('/uploads', express.static(path.join(rootDir, 'uploads')));
app.use('/host/uploads', express.static(path.join(rootDir, 'uploads')));
app.use('/homes/uploads', express.static(path.join(rootDir, 'uploads')));

// ✅ Root Route — Show Todo API by default
app.get('/', (req, res) => {
  res.redirect('/api/todo');
});

// Todo API Router
app.use('/api/todo', todoItemRouter);

// Error Controller
app.use(errorsController.pageNotFound);

// Connect to MongoDB and Start Server
const PORT = 3000;
mongoose.connect(DB_Path)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log('Error while connecting to MongoDB', err);
  });
