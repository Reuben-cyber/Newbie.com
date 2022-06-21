const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');
var session=require('express-session');
const { runInNewContext } = require('vm');

const app = express();


router.get('/userprofile', function(req, res) {
  var usrid=req.session.usrid;
    var sql='SELECT * FROM users where u_id='+usrid;
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('userprofile', { title: 'userlist', userDesc: data,loggedin:req.session.loggedin,usrid:req.session.usrid});
  });
});
module.exports = router;
