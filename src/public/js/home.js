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
exports.__esModule = true;
//TODO: Fix double variable names, scope issue, url2/postData2/newURL2,data2
var chartkick = require("chartkick");
var chart = require("chart.js");
var url2 = 'http://localhost:8080/symptoms';
var connect = function postData(url, data) {
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
                    }).then(function (resp) { return resp.json(); })];
                case 1:
                    resp = _a.sent();
                    return [2 /*return*/, resp];
            }
        });
    });
};
//sends symptom selected to DB, goal is to then get info from every User for that symptom.
//Issue is User class is currently defined in submission.ts bc of the import/export bug
//which needs to change
function symptomRead() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var filter, newURL2, data2, responseValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filter = document.getElementById('symptoms').value;
                    newURL2 = url2 + '/filter';
                    console.log('getting symptom data: fetching from ' + newURL2);
                    console.log(filter);
                    data2 = { "symptom": filter };
                    return [4 /*yield*/, connect(newURL2, data2)];
                case 1:
                    responseValue = _a.sent();
                    updateTable(responseValue);
                    updateChart(responseValue);
                    return [2 /*return*/];
            }
        });
    }); })();
}
exports.symptomRead = symptomRead;
function updateTable(symptomTable) {
    console.log(symptomTable);
    var table = document.getElementById("countyTable");
    for (var i = 1; i < 15; i++) {
        var row = table.rows[i];
        for (var j = 1; j < 7; j++) {
            var counties = ["Barnstable", "Berkshire", "Bristol", "Dukes", "Essex", "Franklin", "Hampden", "Hampshire", "Middlesex", "Nantucket", "Norfolk", "Plymouth", "Suffolk", "Worcester"];
            var num = 0;
            if (j == 1)
                num = symptomTable[counties[i - 1]].nes;
            if (j == 2)
                num = symptomTable[counties[i - 1]].mild;
            if (j == 3)
                num = symptomTable[counties[i - 1]].severe;
            if (j == 4)
                num = symptomTable[counties[i - 1]].positive;
            if (j == 5)
                num = symptomTable[counties[i - 1]].negative;
            if (j == 6)
                num = symptomTable[counties[i - 1]].untested;
            row.cells[j].innerHTML = num.toString();
        }
    }
}
function updateChart(symptomTable) {
    chartkick.use(chart);
    var x = new chartkick.PieChart("chart-1", [["Blueberry", 44], ["Strawberry", 23]]);
}
