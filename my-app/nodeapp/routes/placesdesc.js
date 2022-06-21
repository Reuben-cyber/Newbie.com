const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');
var session=require('express-session');
const { runInNewContext } = require('vm');

const app = express();


router.get('/placesdesc', function(req, res) {
  var id=req.query.pl_id;
    var sql='SELECT * FROM places where pl_id='+id;
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('placesdesc', { title: 'placeslist', placesDesc: data,loggedin:req.session.loggedin,type:req.session.type});
  });
});
module.exports = router;
