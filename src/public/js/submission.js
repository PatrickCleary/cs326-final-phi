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
var url = 'http://localhost:8080';
var placeholdervalue = 'placeholder';
function yesTested() {
    $('#results-positive')[0].disabled = false;
    $("#results-negative")[0].disabled = false;
    $("#results-na")[0].disabled = true;
    $("#results-na")[0].checked = false;
}
function noTested() {
    $('#results-positive')[0].disabled = true;
    $("#results-negative")[0].disabled = true;
    $("#results-na")[0].disabled = false;
    $("#results-na")[0].checked = true;
}
var Use = /** @class */ (function () {
    function Use() {
        this.tested = false;
        this.testedResult = "-1";
        //TODO: fill out Symptoms Interface in Symptoms.ts
        this.Symptoms = { fever: 0, tiredness: 0, chills: 0, digestion: 0, smell: 0, congestion: 0, cough: 0, breathing: 0 };
    }
    return Use;
}());
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        redirect: 'follow',
                        body: JSON.stringify(data)
                    })];
                case 1:
                    resp = _a.sent();
                    return [2 /*return*/, resp];
            }
        });
    });
}
function getSubmissionValues() {
    var user = new Use();
    var feverValue = $('input[name="fever"]:checked').val();
    var tirednessValue = $('input[name="tiredness"]:checked').val();
    var chillsValue = $('input[name="Chills"]:checked').val();
    var digestionValue = $('input[name="digestion"]:checked').val();
    var smellValue = $('input[name="smell"]:checked').val();
    var congestionValue = $('input[name="congestion"]:checked').val();
    var coughValue = $('input[name="dry-cough"]:checked').val();
    var breathingValue = $('input[name="difficulty-breathing"]:checked').val();
    var testedCheckValue = $('input[name="tested-check"]:checked').val();
    var testedResultsValue = $('input[name="results"]:checked').val();
    user.Symptoms = { fever: feverValue, tiredness: tirednessValue, chills: chillsValue, digestion: digestionValue, smell: smellValue, congestion: congestionValue, cough: coughValue, breathing: breathingValue };
    user.tested = testedCheckValue;
    user.testedResult = testedResultsValue;
    return user;
}
function submissionCreate() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var username, password, newURL, data, responseValue, JSONResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('here');
                    username = "placeholderUsername";
                    password = "placeholderPassword";
                    newURL = url + '/symptoms/sample/update';
                    data = getSubmissionValues();
                    console.log(data);
                    console.log('creating new submission. fetching:' + newURL);
                    return [4 /*yield*/, postData(newURL, data)];
                case 1:
                    responseValue = _a.sent();
                    return [4 /*yield*/, responseValue.json()];
                case 2:
                    JSONResponse = _a.sent();
                    if (JSONResponse['result'] !== 'error') {
                        console.log('submission created');
                        window.location.href = "http://localhost:3000";
                    }
                    else {
                        console.log('submission failed!');
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
