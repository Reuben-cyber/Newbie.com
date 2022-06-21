var express = require('express');
var router = express.Router();
var connection  = require('../database.js');



router.get('/delshoppingad', function(req, res, next) {
    var sql='SELECT * FROM shopping';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('delshoppingad', { title: 'shoppinglist', shoppingData: data});
  });
});
router.get('/delshoppingad/delete/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'DELETE FROM shopping WHERE f_id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/delshoppingad');
  
});


module.exports = router;
