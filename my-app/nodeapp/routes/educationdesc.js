const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');
var session=require('express-session');
const { runInNewContext } = require('vm');

const app = express();


router.get('/edudesc', function(req, res) {
  var id=req.query.e_id;
    var sql='SELECT * FROM education where e_id='+id;
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('edudesc', { title: 'edulist', eduDesc: data,loggedin:req.session.loggedin,type:req.session.type});
  });
});
module.exports = router;
