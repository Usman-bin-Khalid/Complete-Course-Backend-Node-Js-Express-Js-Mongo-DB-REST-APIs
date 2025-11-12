// Core Module
const path = require('path'); // HTML ki file ko import krny ky liy

// External Module
const express = require('express');

// Local Module
const userRouter = require('./routes/userRouter');
const {hostRouter} = require('./routes/hostRouter');
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
app.use(userRouter);

// Host Router wala sara code hostRouter wali file 
// mai chla gya hy
app.use("/host" , hostRouter);
// Yhan pr direct file tk pounch skty hyn
const rootDir = require('./utils/pathUtils');
app.use(express.static(path.join(rootDir, 'public')));
// Node Js ky andr order bht important hy agr hum is code 
// ko uper lai gyn start mai then hr gha pr 404 show ho ga
app.use((req, res , next) => {
 res.status(404).render('404');

});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});