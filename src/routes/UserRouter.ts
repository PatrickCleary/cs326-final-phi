var express = require('express');
var router = express.Router();
var User = require('../models/User');
var User = require('../models/Symptoms');

router.get('/', function(req: any, res: any) {
  res.render('signup');
});


router.post('/deleteUser', async (req:any, res:any)=>{
  var curruser = await User.findOne({username:req.session.username});
  console.log(curruser)
  if(curruser.symptom != null){
    var currUser = await Symptom.deleteOne({_id: curruser.symptom}, (err:any)=>{
      res.redirect('/');
    })
  }
  await Symptom.deleteOne({username:req.session.username}, (err:any)=>{

    if (err) return err;
    req.session.logged_in=false;
    req.session.username="";
    res.redirect('/')

  });
  
    
  });


router.post('/newuser', async (req: any, res: any) => {
  var currUser = await User.findOne({ username: req.body.username});
  if(currUser==null) {
  var newbie = new User({ username: req.body.username, email: req.body.email, password: req.body.password, tested: false, testedResult: -2, symptom: null ,sex: null, county: null, age: null, date:null});
  newbie.save(function(err:any) {
        if (err) return err;
        req.session.logged_in = true;
        req.session.username = req.body.username;
        res.redirect('/symptoms/checkup');
      });
  } 
  else {
    res.send('That Username is Taken');
    res.redirect('/users');
  }
});

router.post('/auth', async function(req:any, res:any) {
  var username = req.body.username;
	var password = req.body.password;
  if(username&&password) {
    var currUser = await User.findOne({ username: username, password: password });
    if (currUser==null){
      res.redirect('/login');
    }
    else {
      console.log(currUser);
      req.session.logged_in = true;
      req.session.username = username;
			res.redirect('/symptoms/checkup');
    }
  } else {
		res.send('Please enter Username and Password!');
		res.redirect('/login');
	}
});

router.post('/logout', async function(req:any, res:any){
  req.session.logged_in=false;
  req.session.username="";
  res.redirect('/');
});

module.exports = router;
