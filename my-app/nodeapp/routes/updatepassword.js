const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');

const app = express();

router.get('/updatepassword', function(req, res) {
  console.log("sds");
    res.render('updatepassword',{usr_id:req.session.usrid,type:req.session.type});
  });


module.exports = router;
