const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');
var session=require('express-session');
const { runInNewContext } = require('vm');

const app = express();


router.get('/shoppingdesc', function(req, res) {
  var id=req.query.s_id;
    var sql='SELECT * FROM shopping where s_id='+id;
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('shoppingdesc', { title: 'shoppinglist', shoppingDesc: data,loggedin:req.session.loggedin,type:req.session.type});
  });
});
module.exports = router;
