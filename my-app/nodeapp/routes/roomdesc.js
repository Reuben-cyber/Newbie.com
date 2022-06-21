const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');
var session=require('express-session');
const { runInNewContext } = require('vm');

const app = express();


router.get('/roomdesc', function(req, res) {
  var id=req.query.u_id;
  var email=req.query.email;
  console.log(id);
  console.log(email);
    var sql='SELECT * FROM users where u_id='+id;
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('roomdesc', { title: 'roomatelist', roomateDesc: data,loggedin:req.session.loggedin,email:email,type:req.session.type});
  });
});
module.exports = router;
