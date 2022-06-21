const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');

const app = express();

router.get('/about', function(req, res) {
  console.log("sds");
    res.render('about',{loggedin:req.session.loggedin,type:req.session.type});
  });


module.exports = router;
