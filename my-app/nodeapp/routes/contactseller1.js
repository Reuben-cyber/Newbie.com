
const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');
var session=require('express-session');

const app = express();

router.get('/contactseller1', function(req, res) {
  console.log("sds");
  var name=req.query.name;
  var cat=req.query.cat;
  if(req.session.loggedin == true)
  {
    //var sql2="select users.email,product.name from users inner join product on users.u_id= product.usr_id where product.name=p_name";
    var sql=`SELECT users.email,`+cat+`.name
    FROM users
    INNER JOIN ` +cat+ ` ON users.u_id= `+cat+`.usr_id`+` where `+cat+`.name=`+`'`+name+`'`;
    console.log(sql);
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('contactseller1',{usr_id:req.session.usrid,emailData:data,loggedin:req.session.loggedin,type:req.session.type});
    });
  }
  else
  {
    res.render('index',{loggedin:req.session.loggedin,usr_id:req.session.usrid,type:req.session.type});
  }
  });


module.exports = router;
