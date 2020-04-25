var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Symptom = require('../models/Symptoms');


/* GET users listing. */
router.get('/:username/checkup', function(req: any, res: any) {
  res.render('form');
});

router.post('/:username/update', async (req: any, res: any) => {
  req.body.username = req.params.username;
  console.log(req.body);
  var curr_user = await User.findOne({ username: req.params.username }, ['_id', 'tested', 'testedResult'], { lean: true },
    function(err: any, u: any) {
      return u;
    });
  var sick = new Symptom({ user: curr_user._id, fever: req.body.fever, tiredness: req.body.tiredness, chills: req.body.chills, digestion: req.body.digestion, smell: req.body.smell, congestion: req.body.congestion, cough: req.body.cough, breathing: req.body.breathing, startDate: req.body.startDate, endDate: req.body.endDate });
  sick.save(async function(err: any) {
    if (err) return err;
    await User.updateOne({ _id: curr_user._id }, { symptom: sick._id, tested: req.body.tested, testedResult: req.body.testedResult, sex: req.body.sex, county: req.body.county, age: Number(req.body.age) });
  });
  res.redirect('/');
});


router.post('/filter', async (req: any, res: any) => {
  const query = await Symptom.find({}, 'user ' + req.body.symptom).populate('user');
  var flatSymptoms = query.map(function(user: any) {
    return user.toObject();
  });
  var results: { [key: string]: { [key: string]: number;} } = {};
  results = {
    "Barnstable": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 },
    "Berkshire": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 },
    "Bristol": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 },
    "Dukes": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 },
    "Essex": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 },
    "Franklin": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 },
    "Hampden": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 },
    "Hampshire": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 },
    "Middlesex": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 },
    "Nantucket": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 },
    "Norfolk": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 },
    "Plymouth": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 },
    "Suffolk": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 },
    "Worcester": { "nes": 0, "mild": 0, "severe": 0, "positive": 0, "negative": 0, "untested": 0 }
  }
  for (var symp in flatSymptoms) {
    var currObj = flatSymptoms[symp];
    var county = currObj.user.county as string;
    var tested = currObj.user.tested;
    var testedResult = currObj.user.testedResult;
    var sympResult = currObj[req.body.symptom];
    if(tested) {
      if(testedResult===1) {
        results[county].positive +=1;
      }
      else if(testedResult===0) {
        results[county].negative +=1;
      }
    }
    else {
      results[county].untested+=1;
    }
    if(sympResult===0) {
      results[county].nes+=1;
    }
    else if(sympResult===1) {
      results[county].mild+=1;
    }
    else if(sympResult===2) {
      results[county].severe+=1;
    }
  }
  res.send(JSON.stringify(results));
});

router.post('/all', async (req: any, res: any) => {
  const query = await Symptom.find().populate('user');
  var flatSymptoms = query.map(function(user: any) {
    return user.toObject();
  });
  var results: { [key: string]: number;}  = {};
  results = {
    "Barnstable": 0,
    "Berkshire": 0,
    "Bristol": 0,
    "Dukes": 0,
    "Essex": 0,
    "Franklin": 0,
    "Hampden": 0,
    "Hampshire": 0,
    "Middlesex": 0,
    "Nantucket": 0,
    "Norfolk": 0,
    "Plymouth": 0,
    "Suffolk": 0,
    "Worcester": 0,
    "total": 0,
  }
  for (var symp in flatSymptoms) {
    var currObj = flatSymptoms[symp];
    var county = currObj.user.county as string;
   
        results[county] +=1;
        results['total']+=1; 
  }
  res.send(JSON.stringify(results));
});
module.exports = router;
