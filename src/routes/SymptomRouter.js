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
var Symptom = require('../models/Symptoms');
/* GET users listing. */
router.get('/:username/checkup', function (req, res) {
    res.render('form');
});
router.post('/:username/update', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var curr_user, sick;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req.body.username = req.params.username;
                console.log(req.body);
                return [4 /*yield*/, User.findOne({ username: req.params.username }, ['_id', 'tested', 'testedResult'], { lean: true }, function (err, u) {
                        return u;
                    })];
            case 1:
                curr_user = _a.sent();
                sick = new Symptom({ user: curr_user._id, fever: req.body.fever, tiredness: req.body.tiredness, chills: req.body.chills, digestion: req.body.digestion, smell: req.body.smell, congestion: req.body.congestion, cough: req.body.cough, breathing: req.body.breathing, startDate: req.body.startDate, endDate: req.body.endDate });
                sick.save(function (err) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err)
                                        return [2 /*return*/, err];
                                    return [4 /*yield*/, User.updateOne({ _id: curr_user._id }, { symptom: sick._id, tested: req.body.tested, testedResult: req.body.testedResult, sex: req.body.sex, county: req.body.county, age: Number(req.body.age) })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                res.redirect('/');
                return [2 /*return*/];
        }
    });
}); });
router.post('/filter', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, flatSymptoms, results, symp, currObj, county, tested, testedResult, sympResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Symptom.find({}, 'user ' + req.body.symptom).populate('user')];
            case 1:
                query = _a.sent();
                flatSymptoms = query.map(function (user) {
                    return user.toObject();
                });
                results = {};
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
                };
                for (symp in flatSymptoms) {
                    currObj = flatSymptoms[symp];
                    county = currObj.user.county;
                    tested = currObj.user.tested;
                    testedResult = currObj.user.testedResult;
                    sympResult = currObj[req.body.symptom];
                    if (tested) {
                        if (testedResult === 1) {
                            results[county].positive += 1;
                        }
                        else if (testedResult === 0) {
                            results[county].negative += 1;
                        }
                    }
                    else {
                        results[county].untested += 1;
                    }
                    if (sympResult === 0) {
                        results[county].nes += 1;
                    }
                    else if (sympResult === 1) {
                        results[county].mild += 1;
                    }
                    else if (sympResult === 2) {
                        results[county].severe += 1;
                    }
                }
                res.send(JSON.stringify(results));
                return [2 /*return*/];
        }
    });
}); });
router.post('/all', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, flatSymptoms, results, symp, currObj, county;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Symptom.find().populate('user')];
            case 1:
                query = _a.sent();
                flatSymptoms = query.map(function (user) {
                    return user.toObject();
                });
                results = {};
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
                };
                for (symp in flatSymptoms) {
                    currObj = flatSymptoms[symp];
                    county = currObj.user.county;
                    results[county] += 1;
                    results['total'] += 1;
                }
                res.send(JSON.stringify(results));
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
