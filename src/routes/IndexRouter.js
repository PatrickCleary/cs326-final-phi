"use strict";
var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res) {
    if (req.session.logged_in) {
        res.render('index', { logged_in: true });
    }
    else {
        res.render('index', { logged_in: false });
    }
});
router.get('/login', function (req, res) {
    res.render('login');
});
router.get('/register', function (req, res) {
    res.render('signup');
});
module.exports = router;
