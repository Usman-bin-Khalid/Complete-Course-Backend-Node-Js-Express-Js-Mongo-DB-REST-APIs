// Core Module
const path = require('path'); // HTML ki file ko import krny ky liy

// External Module
const express = require('express');
const session = require('express-session');
const multer = require('multer');
// Saving Session in MongoDB
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_Path = 'mongodb+srv://root:root@completecoding.mptdmv7.mongodb.net/airbnb?retryWrites=true&w=majority&appName=CompleteCoding'



// Local Module
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');




const app = express();
 // HTML ko dynamic krny ky liy ejs ko initialize kia hy
app.set('view engine' , 'ejs');
app.set('views' , 'views');

const store = new MongoDBStore({uri : DB_Path,
collection : 'sessions'

});
// Console krny ky liy


app.use((req, res , next) => {
 console.log(req.url, req.method);
 next();
});

const randomString = (length) => {
  const characters = 'bcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.random() + characters.length);

  }
  return result;
}

const storage =  multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename : (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname)
  }

});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


const multerOptions = {
  storage , fileFilter

}

// Body parsing ky liy 
app.use(express.urlencoded());
// app.use(multer(multerOptions).single('photo'));

// Session set krny ky liy
app.use(session({
  secret : 'Complete Backend With Node JS',
  resave : false,
  saveUninitialized : true,
  store : store 
}));



// Cookie Set krny ky liy
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  next();
});

// By default routing ('/') wala jo code tha wo ab
// userRouter sy ay ga hum sy simple isko call kr lia hy 
app.use(storeRouter);

// Host Router wala sara code hostRouter wali file 
// mai chla gya hy

app.use('/host' , (req, res, next) => { 
 if(req.isLoggedIn) {
  next();
 } else {
 res.redirect('/login')
 }
});

// 💡 FIX: Mount the hostRouter on the /host path
app.use("/host" , hostRouter); 

app.use(authRouter);

// Yhan pr direct file tk pounch skty hyn
const rootDir = require('./utils/pathUtils');
const { error } = require('console');
app.use(express.static(path.join(rootDir, 'public')));
app.use('/uploads' , express.static(path.join(rootDir, 'uploads')));
app.use('/host/uploads' , express.static(path.join(rootDir, 'uploads' )));

// Errors waly controller ko import kia hy
const errorsController = require('./controllers/errors');

const { default: mongoose, Collection } = require('mongoose');
const { url } = require('inspector');
app.use(errorsController.pageNotFound);


const PORT = 3000;

mongoose.connect(DB_Path).then(() => {
  console.log('Connecting to MongoDB')
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
}).catch(err => {
  console.log('Error while connecting to Mongo', err);
});
