const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');
var session=require('express-session');

const app = express();

router.get('/adminfunction', function(req, res) {
  console.log("sds");
  console.log(req.session.usrid);
    res.render('adminfunction',{usr_id:req.session.usrid,type:req.session.type});
  });


module.exports = router;
