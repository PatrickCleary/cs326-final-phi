var express = require('express');
var router = express.Router();
let User = require('../models/User');

router.get('/', function(req: any, res: any) {
  res.render('signup');
});

router.post('/newuser', async (req: any, res: any) => {
  var newbie = new User({ username: req.body.username, email: req.body.email, password: req.body.password, tested: false, testedResult: -1, symptom: null });
  newbie.save(function(err) {
    if (err) return handleError(err);
    res.redirect('/');
  });
});

module.exports = router;
