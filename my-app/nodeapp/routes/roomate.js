const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');

const app = express();

router.get('/roomate', function(req, res) {
  console.log("sds");
    var sql='SELECT * FROM users where roomate="y"';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('roomate', { title: 'roomatelist', roomateData: data, loggedin:req.session.loggedin,type:req.session.type});
  });
});


module.exports = router;
