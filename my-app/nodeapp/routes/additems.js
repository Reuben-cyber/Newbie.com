const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');
var session=require('express-session');

const app = express();

router.get('/additems', function(req, res) {
  console.log("sds");
  console.log(req.session.usrid);
    res.render('additems',{usr_id:req.session.usrid,type:req.session.type});
  });


module.exports = router;
