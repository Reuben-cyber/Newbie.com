var express = require('express');
var router = express.Router();
var db=require('../database.js');


router.get('/delfoodad', function(req, res, next) {
    var sql='SELECT * FROM food';
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('delfoodad', { title: 'Food List', foodData: data});
  });
});


router.get('/delfoodad/delete/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'DELETE FROM food WHERE f_id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/delfoodad');
  
});
module.exports = router;