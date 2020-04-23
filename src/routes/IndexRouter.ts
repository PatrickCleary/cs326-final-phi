var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/register', function(req, res) {
  res.render('signup');
});

module.exports = router;