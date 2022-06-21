var express = require('express');
var router = express.Router();
const app = express();
var session=require('express-session');

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

module.exports = router;
