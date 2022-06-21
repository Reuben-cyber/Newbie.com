const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var session=require('express-session');
const { response } = require('../app.js');
var connection  = require('../database.js');

const app = express();

router.get('/payment', function(req, res) {
  console.log("sds");
  var uid=req.session.id;
  var p_id=req.query.p_id;
  console.log(p_id);
  var price=req.query.price;
  console.log(price);
  if(req.session.loggedin == true)
    res.render('payment',{loggedin:req.session.loggedin,usr_id:req.session.usrid,p_id:p_id,price:price,type:req.session.type});
  else
  {
 res.render('index',{loggedin:req.session.loggedin,usr_id:req.session.usrid});
  }
  });


module.exports = router;
