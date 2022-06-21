var express = require('express');
var router = express.Router();
var connection  = require('../database.js');


router.get('/deltravelad', function(req, res,next) {
    var sql='SELECT * FROM travel';
    connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('deltravelad', { title: 'travellist', travelData: data});
  });
});
router.get('/deltravelad/delete/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'DELETE FROM travel WHERE f_id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/deltravelad');
  
});


module.exports = router;
