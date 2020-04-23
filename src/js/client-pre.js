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
