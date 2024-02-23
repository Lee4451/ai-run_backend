require('dotenv').config();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : process.env.DBURL,
    user     : process.env.DBUSER,
    password : process.env.DBPW,
    database : 'muell'
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected")
});


module.exports = connection;