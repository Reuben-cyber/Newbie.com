var express = require('express');
var router = express.Router();
var connection  = require('../database.js');


router.get('/delstayad', function(req, res,next) {
    var sql='SELECT * FROM stay';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('delstayad', { title: 'staylist', stayData: data});
  });
});
router.get('/delstayad/delete/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'DELETE FROM stay WHERE f_id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/delstayad');
  
});


module.exports = router;
