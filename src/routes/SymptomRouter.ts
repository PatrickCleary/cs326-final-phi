var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Symptom = require('../models/Symptoms');


/* GET users listing. */
router.get('/:username/checkup',function(req:any,res:any) {
  res.render('form');
});

router.post('/:username/update', async (req:any, res:any) => {
  req.body.username = req.params.username;
  var curr_user = await User.findOne({username: req.params.username}, ['_id', 'tested', 'testedResult'],  { lean: true },
  function(err:any,u:any) {
    return u;
  });
  var sick = new Symptom({user: curr_user._id, fever: req.body.fever, tiredness: req.body.tiredness,chills: req.body.chills, digestion: req.body.digestion, smell: req.body.smell, congestion: req.body.congestion, cough: req.body.cough, breathing: req.body.breathing});
  sick.save(function(err:any) {
    if (err) return err;
    User.findOneAndUpdate({_id: curr_user._id}, {symptom:sick._id, tested:req.body.tested,testedResult:req.body.testedResult},function(err:any) {
      if (err) return err;
      else {return 0;}
    });
  });
  res.redirect('/');
});

module.exports = router;
