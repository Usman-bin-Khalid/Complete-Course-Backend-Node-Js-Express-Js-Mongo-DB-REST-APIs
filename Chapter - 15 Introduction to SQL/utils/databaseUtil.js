const mysql = require('mysql2');
const pool = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'airbnb' // Schema name made in mysql workbench
});



module.exports = pool.promise();
