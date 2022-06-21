
const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');
var session=require('express-session');

const app = express();

router.get('/contactseller', function(req, res) {
  console.log("sds");
  console.log(req.session.usrid);
  var email=req.query.email;
  console.log(email);
  if(req.session.loggedin == true)
  {
    res.render('contactseller',{usr_id:req.session.usrid,loggedin:req.session.loggedin,email:email,type:req.session.type});
  }
  else
  {
    res.render('index',{loggedin:req.session.loggedin,usr_id:req.session.usrid,type:req.session.type});
  }
  });


module.exports = router;
