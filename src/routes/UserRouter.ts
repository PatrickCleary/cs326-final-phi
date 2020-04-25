var express = require('express');
var router = express.Router();
var User = require('../models/User');


router.get('/', function(req: any, res: any) {
  res.render('signup');
});

router.post('/newuser', async (req: any, res: any) => {
  var newbie = new User({ username: req.body.username, email: req.body.email, password: req.body.password, tested: false, testedResult: -1, symptom: null ,sex: null, county: null, age: null});
  newbie.save(function(err:any) {
    if (err) return err;
    res.redirect('/symptoms/sample/checkup');
  });
});

module.exports = router;
