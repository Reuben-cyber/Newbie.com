const express = require('express');
var router = express.Router();
var connection  = require('../database.js');



router.get('/delplacesad', function(req, res,next) {
  
    var sql='SELECT * FROM places';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('delplacesad', { title: 'placeslist', placesData: data});
  });
});

router.get('/delplacesad/delete/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'DELETE FROM places WHERE f_id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/delplacesad');
  
});


module.exports = router;
