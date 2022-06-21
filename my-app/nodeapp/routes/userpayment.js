const express = require('express');
var router = express.Router();
const mysql = require('mysql');
var connection  = require('../database.js');

const app = express();

router.get('/userpayment', function(req, res) {
  console.log("sds");
  console.log(req.session.loggedin);
  console.log(req.session.usrid);
  var u_id=req.session.usrid;
    var sql=`SELECT payments.pay_id,payments.trans_id,payments.date,payments.amt,payments.status,product.name
    FROM payments
    INNER JOIN product ON payments.p_id=product.p_id where product.usr_id=`+u_id;
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('userpayment', { title: 'paymentuserlist', paymentuserData: data, loggedin:req.session.loggedin,type:req.session.type});
  });
});


module.exports = router;
