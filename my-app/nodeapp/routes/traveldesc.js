const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');
var session=require('express-session');
const { runInNewContext } = require('vm');

const app = express();


router.get('/traveldesc', function(req, res) {
  var id=req.query.t_id;
    var sql='SELECT * FROM travel where t_id='+id;
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('traveldesc', { title: 'travellist', travelDesc: data,loggedin:req.session.loggedin,type:req.session.type});
  });
});
module.exports = router;
