// display products
var express = require('express');
var router = express.Router();
var db=require('../database.js');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/delproductad', function(req, res, next) {
    var sql='SELECT * FROM product';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('delproductad', { title: 'Product List', productData: data});
  });
});

//delete products
router.get('/product/delete/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'DELETE FROM product WHERE p_id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/delproductad');
  
});
module.exports = router;