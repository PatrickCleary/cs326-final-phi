"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Symptoms = require('../models/Symptoms');
router.get('/', function (req, res) {
    res.render('signup');
});
router.post('/deleteUser', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var curruser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.findOne({ username: req.session.username })];
            case 1:
                curruser = _a.sent();
                if (!(curruser.symptom != null)) return [3 /*break*/, 3];
                return [4 /*yield*/, Symptoms.deleteOne({ _id: curruser.symptom }, function (err) {
                        res.redirect('/');
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, User.deleteOne({ username: req.session.username }, function (err) {
                    if (err)
                        return err;
                    req.session.logged_in = false;
                    req.session.username = "";
                    res.redirect('/');
                })];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.post('/newuser', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currUser, newbie;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.findOne({ username: req.body.username })];
            case 1:
                currUser = _a.sent();
                if (currUser == null) {
                    newbie = new User({ username: req.body.username, email: req.body.email, password: req.body.password, tested: false, testedResult: -2, symptom: null, sex: null, county: null, age: null, date: null });
                    newbie.save(function (err) {
                        if (err)
                            return err;
                        req.session.logged_in = true;
                        req.session.username = req.body.username;
                        res.redirect('/symptoms/checkup');
                    });
                }
                else {
                    res.redirect('/users');
                }
                return [2 /*return*/];
        }
    });
}); });
router.post('/auth', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var username, password, currUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = req.body.username;
                    password = req.body.password;
                    if (!(username && password)) return [3 /*break*/, 2];
                    return [4 /*yield*/, User.findOne({ username: username, password: password })];
                case 1:
                    currUser = _a.sent();
                    if (currUser == null) {
                        res.redirect('/login');
                    }
                    else {
                        req.session.logged_in = true;
                        req.session.username = username;
                        res.redirect('/symptoms/checkup');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    res.send('Please enter Username and Password!');
                    res.redirect('/login');
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
});
router.post('/logout', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            req.session.logged_in = false;
            req.session.username = "";
            res.redirect('/');
            return [2 /*return*/];
        });
    });
});
module.exports = router;
