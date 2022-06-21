const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');

const app = express();

router.get('/forgot', function(req, res) {
  console.log("sds");
    res.render('forgot',{loggedin:req.session.loggedin});
  });


module.exports = router;
