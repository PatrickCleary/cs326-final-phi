var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/update', function(req:any, res:any) {
  res.render('form');
});

module.exports = router;
