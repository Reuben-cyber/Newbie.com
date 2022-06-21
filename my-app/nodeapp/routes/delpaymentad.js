// display products
var express = require('express');
var router = express.Router();
var db=require('../database.js');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/delpaymentad', function(req, res, next) {
    var sql=`SELECT payments.pay_id,payments.p_id,payments.trans_id,payments.date,payments.amt,payments.status,product.name
    FROM payments
    INNER JOIN product ON payments.p_id=product.p_id`;
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('delpaymentad', { title: 'Payment List', PaymentData: data});
  });
});

//delete products
router.get('/delpaymentad/delete/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'Update product set status="b" where p_id='+id;
    db.query(sql, function (err, data) {
    if (err) throw err;
    res.redirect('/delpaymentad');
    console.log(data.affectedRows + " record(s) updated");
  });

  
});

//status change
router.get('/delpaymentad/status/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'Update payments set status = "completed" where pay_id ='+id;
    db.query(sql, function (err, data) {
    if (err) throw err;
    res.redirect('/delpaymentad');
    console.log(data.affectedRows + " record(s) updated");
  });
  
});
module.exports = router;