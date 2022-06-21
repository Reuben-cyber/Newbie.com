const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');

const app = express();

router.get('/education', function(req, res) {
  console.log("sds");
  console.log(req.session.loggedin);
    var sql='SELECT * FROM education';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('education', { title: 'edulist', eduData: data, loggedin:req.session.loggedin,type:req.session.type});
  });
});


module.exports = router;
