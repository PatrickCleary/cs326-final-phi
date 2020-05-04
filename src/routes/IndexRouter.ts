var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req:any, res:any) {
  if(req.session.logged_in){
    res.render('index',{logged_in:true});
  }
  else {
    res.render('index',{logged_in:false});
  }
});

router.get('/login', function(req:any, res:any) {
  res.render('login');
});

router.get('/register', function(req:any, res:any) {
  res.render('signup');
});

module.exports = router;
