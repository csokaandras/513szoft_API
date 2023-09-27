require('dotenv').config();
const express = require('express');
var mysql = require('mysql');

const app = express();
const port = process.env.PORT;

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME
  });

// ENDPOINTS
app.get('/', function (req, res) {
  res.send('Simpe NodeJS Backend API');
});

app.get('/users', (req, res) => {
    pool.query(`SELECT * FROM users`, (err, results) => {
      //  if (err) throw err;
      if (err){
        console.log(req.socket.remoteAddress + ' >> ' + err.sqlMessage);
        res.status(500).send(err.sqlMessage);
      }else{
        console.log(req.socket.remoteAddress + ' >> ' +results.length + ` record(s) sent from users table.`);
        res.status(200).send(results);
      }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
