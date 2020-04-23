var express = require('express');
var router = express.Router();
let User = require('../models/User');
let Symptom = require('../models/Symptoms');

/* GET users listing. */
router.get('/:username/checkup',function(req:any,res:any) {
  res.render('form');
});

router.post('/:username/update', async function(req:any, res:any) {
  req.body.username = req.params.username;
  let curr_user = await User.findOne({username: req.params.username}, ['_id', 'tested', 'testedResult'],  { lean: true },
  function(err:any,u:any) {
    return u;
  });
  console.log(curr_user);
  console.log(req.body);
});

module.exports = router;
