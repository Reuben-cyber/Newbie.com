/* const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');
var session=require('express-session');

const app = express();

router.get('/updateitem', function(req, res) {
  console.log("sds");
  console.log(req.session.usrid);
    res.render('updateitem',{usr_id:req.session.usrid});
  });


module.exports = router; */

// display users
var express = require('express');
var router = express.Router();
var db=require('../database.js');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/deleteusersad', function(req, res, next) {
    var sql='SELECT * FROM users';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('deleteusersad', { title: 'User List', userData: data,type:req.session.type});
  });
});
module.exports = router;

//delete users
router.get('/users/delete/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'DELETE FROM users WHERE u_id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/deleteusersad');
  
});