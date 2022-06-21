// display products
var express = require('express');
var router = express.Router();
var db=require('../database.js');
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/deleducationad', function(req, res, next) {
    var sql='SELECT * FROM education';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('deleducationad', { title: 'Education List', EducationData: data});
  });
});

//delete products
router.get('/deleducationad/delete/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'DELETE FROM education WHERE e_id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/delproductad');
  
});
module.exports = router;