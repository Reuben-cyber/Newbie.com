var express = require('express');
var router = express.Router();
const app = express();
var session=require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,loggedin:req.session.loggedin,type:req.session.type });
});

module.exports = router;
