const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');
var session=require('express-session');
const { runInNewContext } = require('vm');

const app = express();


router.get('/fooddesc', function(req, res) {
  var id=req.query.f_id;
    var sql='SELECT * FROM food where f_id='+id;
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('fooddesc', { title: 'foodlist', foodDesc: data,loggedin:req.session.loggedin,type:req.session.type});
  });
});
module.exports = router;
