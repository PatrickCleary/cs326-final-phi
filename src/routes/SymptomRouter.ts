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
  var curr_user = await User.findOne({ username: req.params.username }, ['_id', 'tested', 'testedResult','symptom'], { lean: true },
    function(err: any, u: any) {
      return u;
    });

  if(curr_user.symptom === null){
    var sick = new Symptom({ user: curr_user._id, fever: req.body.fever, tiredness: req.body.tiredness, chills: req.body.chills, digestion: req.body.digestion, smell: req.body.smell, congestion: req.body.congestion, cough: req.body.cough, breathing: req.body.breathing, date: req.body.date});
    sick.save(async function(err: any) {
      if (err) return err;
      await User.updateOne({ _id: curr_user._id }, { symptom: sick._id, tested: req.body.tested, testedResult: req.body.testedResult, sex: req.body.sex, county: req.body.county, age: Number(req.body.age), date: req.body.date});
    });
  }
  else{
    await Symptom.updateOne({ user: curr_user._id}, {fever: req.body.fever, tiredness: req.body.tiredness, chills: req.body.chills, digestion: req.body.digestion, smell: req.body.smell, congestion: req.body.congestion, cough: req.body.cough, breathing: req.body.breathing, date: req.body.date});
    await User.updateOne({ _id: curr_user._id }, {tested: req.body.tested, testedResult: req.body.testedResult, sex: req.body.sex, county: req.body.county, age: Number(req.body.age), date: req.body.date});
  }
  res.redirect('/');
});

router.post('/caseFilter', async (req: any, res: any) => {
  var value:number = parseInt(req.body.testValue);
  var countyValue:string = req.body.countyValue;
  var results: { [key: string]: { [key: string]: number;} } = {};
  //maybe let this dictionary reside in a different folder
  results = {
    "3-1-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-2-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-3-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-4-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-5-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-6-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-7-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-8-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-9-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-10-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-11-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-12-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-13-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-14-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-15-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-16-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-17-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-18-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-19-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-20-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-21-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-22-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-23-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-24-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-25-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-26-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-27-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-28-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-29-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-30-2020": { "positive": 0, "negative": 0, "untested": 0},
    "3-31-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-1-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-2-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-3-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-4-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-5-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-6-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-7-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-8-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-9-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-10-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-11-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-12-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-13-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-14-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-15-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-16-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-17-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-18-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-19-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-20-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-21-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-22-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-23-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-24-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-25-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-26-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-27-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-28-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-29-2020": { "positive": 0, "negative": 0, "untested": 0},
    "4-30-2020": { "positive": 0, "negative": 0, "untested": 0},
    "5-1-2020": { "positive": 0, "negative": 0, "untested": 0},
    "5-2-2020": { "positive": 0, "negative": 0, "untested": 0},
    "5-3-2020": { "positive": 0, "negative": 0, "untested": 0},
    "5-4-2020": { "positive": 0, "negative": 0, "untested": 0}
  }

  var queryTest;

  if(countyValue == "All"){
    queryTest = await User.find({testedResult:value},{testedResult:1,date:1,_id:0});
  }
  else{
    queryTest = await User.find({testedResult:value,county:countyValue},{testedResult:1,date:1,_id:0});
  }


  for(var i in queryTest){
    var datePre = queryTest[i].date;
    var day = datePre.getDate();
    var month = datePre.getMonth() + 1;
    var year = datePre.getFullYear();

    if((day==29) && (month == 2)){
      day=1;
      month=3;
    }

    var date = month + "-" + day + "-" + year;
    if(queryTest[i].testedResult == 1){
      results[date].positive += 1;
    }
    else if(queryTest[i].testedResult == 0){
      results[date].negative += 1;
    }
    else if(queryTest[i].testedResult == -1){
      results[date].untested += 1;
    }

  }
  res.send(JSON.stringify(results));
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
    //if(tested) {
      if(testedResult===1) {
        results[county].positive +=1;
      }
      else if(testedResult===0) {
        results[county].negative +=1;
      }
    //}
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
