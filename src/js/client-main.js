(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.client = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
//TODO: add all fields
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(username, password) {
        this.tested = false;
        this.testedResult = "-1";
        //TODO: fill out Symptoms Interface in Symptoms.ts
        this.Symptoms = { fever: 0, tiredness: 0, chills: 0, digestion: 0, smell: 0, congestion: 0, cough: 0, breathing: 0 };
        this.username = username;
        this.password = password;
    }
}
exports.User = User;

},{}],2:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const postData_1 = require("./postData");
///////////////////////////////////////////////FORM PAGE///////////////////////////////////////////////
const urlForm = 'http://localhost:8080/api/submission';
function yesTested() {
    $('#results-positive')[0].disabled = false;
    $("#results-negative")[0].disabled = false;
    $("#results-na")[0].disabled = true;
    $("#results-na")[0].checked = false;
}
exports.yesTested = yesTested;
function noTested() {
    $('#results-positive')[0].disabled = true;
    $("#results-negative")[0].disabled = true;
    $("#results-na")[0].disabled = false;
    $("#results-na")[0].checked = true;
}
exports.noTested = noTested;
function getSubmissionValues() {
    let user = new User_1.User("username", "password");
    let feverValue = $('input[name="fever"]:checked').val();
    let tirednessValue = $('input[name="tiredness"]:checked').val();
    let chillsValue = $('input[name="Chills"]:checked').val();
    let digestionValue = $('input[name="digestion"]:checked').val();
    let smellValue = $('input[name="smell"]:checked').val();
    let congestionValue = $('input[name="congestion"]:checked').val();
    let coughValue = $('input[name="dry-cough"]:checked').val();
    let breathingValue = $('input[name="difficulty-breathing"]:checked').val();
    let testedCheckValue = $('input[name="tested-check"]:checked').val();
    let testedResultsValue = $('input[name="results"]:checked').val();
    user.Symptoms = { fever: feverValue, tiredness: tirednessValue, chills: chillsValue, digestion: digestionValue, smell: smellValue, congestion: congestionValue, cough: coughValue, breathing: breathingValue };
    user.tested = testedCheckValue;
    user.testedResult = testedResultsValue;
    return user;
}
exports.getSubmissionValues = getSubmissionValues;
function submissionCreate() {
    (() => __awaiter(this, void 0, void 0, function* () {
        console.log('here');
        let username = "placeholderUsername";
        let password = "placeholderPassword";
        const newURL = urlForm + '/create';
        //TODO: On Submit button press, check if all fields have been filled out
        const data = getSubmissionValues();
        console.log(data);
        console.log('creating new submission. fetching:' + newURL);
        const responseValue = yield postData_1.postData(newURL, data);
        const JSONResponse = yield responseValue.json();
        if (JSONResponse['result'] !== 'error') {
            console.log('submission created');
        }
        else {
            console.log('submission failed!');
        }
    }))();
}
exports.submissionCreate = submissionCreate;
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////HOME PAGE///////////////////////////////////////////////
const urlHome = 'http://localhost:8080/api/home';
function symptomRead() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let filter = $("#symptoms option:selected").text();
        const newURL = urlHome + '/read';
        console.log('getting symptom data: fetching' + newURL);
        console.log(filter);
        const data = { "symptom": filter };
        const responseValue = yield postData_1.postData(newURL, data);
        const JSONResponse = yield responseValue.json();
        if (JSONResponse['result'] !== 'error') {
            console.log('data found');
        }
        else {
            console.log('failed!');
        }
    }))();
}
exports.symptomRead = symptomRead;
///////////////////////////////////////////////////////////////////////////////////////////////////////

},{"./User":1,"./postData":3}],3:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        });
        return resp;
    });
}
exports.postData = postData;

},{}]},{},[2])(2)
});
