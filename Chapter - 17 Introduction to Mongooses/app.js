// Core Module
const path = require('path'); // HTML ki file ko import krny ky liy

// External Module
const express = require('express');


// Local Module
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');




const app = express();
 // HTML ko dynamic krny ky liy ejs ko initialize kia hy
app.set('view engine' , 'ejs');
app.set('views' , 'views');
// Console krny ky liy
app.use((req, res , next) => {
 console.log(req.url, req.method);
 next();
});

// Body parsing ky liy 
app.use(express.urlencoded());

// By default routing ('/') wala jo code tha wo ab
// userRouter sy ay ga hum sy simple isko call kr lia hy 
app.use(storeRouter);

// Host Router wala sara code hostRouter wali file 
// mai chla gya hy
app.use("/host" , hostRouter);

// Yhan pr direct file tk pounch skty hyn
const rootDir = require('./utils/pathUtils');
const { error } = require('console');
app.use(express.static(path.join(rootDir, 'public')));

// Errors waly controller ko import kia hy
const errorsController = require('./controllers/errors');
const {mongoConnect} = require('./utils/databaseUtil');
const { default: mongoose } = require('mongoose');
app.use(errorsController.pageNotFount);


const PORT = 3000;


const DB_Path = 'mongodb+srv://root:root@completecoding.mptdmv7.mongodb.net/airbnb?retryWrites=true&w=majority&appName=CompleteCoding'
mongoose.connect(DB_Path).then(() => {
  console.log('Connecting to MongoDB')
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
}).catch(err => {
  console.log('Error while connecting to Mongo', err);
});