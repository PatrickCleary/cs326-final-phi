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
var url2 = '/symptoms';
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
function start() {
    positiveCases();
    symptomRead();
}
exports.start = start;
function positiveCases() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var filterTest, str, filterCounty, newURL, data, responseValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filterTest = document.getElementById('testResult').value;
                    str = "";
                    if (filterTest == "2")
                        str = "All ";
                    if (filterTest == "1")
                        str = "Positive ";
                    if (filterTest == "0")
                        str = "Negative ";
                    if (filterTest == "-1")
                        str = "Untested ";
                    document.getElementById('caseChart').innerHTML = str + "Form Submissions by Day";
                    filterCounty = document.getElementById('countyFilter').value;
                    newURL = url2 + '/caseFilter';
                    data = { "testValue": filterTest, "countyValue": filterCounty };
                    return [4 /*yield*/, connect(newURL, data)];
                case 1:
                    responseValue = _a.sent();
                    updateTestedChart(filterTest, responseValue);
                    return [2 /*return*/];
            }
        });
    }); })();
}
exports.positiveCases = positiveCases;
function symptomRead() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var filterSymptom, filterTest, filterCapitalized, newURL2, data2, responseValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filterSymptom = document.getElementById('symptoms').value;
                    filterTest = document.getElementById('symptomChartTestResult').value;
                    filterCapitalized = filterSymptom.charAt(0).toUpperCase() + filterSymptom.slice(1);
                    document.getElementById('symptomChart').innerHTML = filterCapitalized + " Severity by County";
                    newURL2 = url2 + '/filter';
                    data2 = { "symptom": filterSymptom, "testValue": filterTest };
                    return [4 /*yield*/, connect(newURL2, data2)];
                case 1:
                    responseValue = _a.sent();
                    updateTable(responseValue);
                    updateSymptomChart(responseValue);
                    updateMap(responseValue);
                    return [2 /*return*/];
            }
        });
    }); })();
}
exports.symptomRead = symptomRead;
function updateTable(symptomTable) {
    var table = document.getElementById("countyTable");
    for (var i = 1; i < 15; i++) {
        var row = table.rows[i];
        for (var j = 1; j < 4; j++) {
            var counties = ["Barnstable", "Berkshire", "Bristol", "Dukes", "Essex", "Franklin", "Hampden", "Hampshire", "Middlesex", "Nantucket", "Norfolk", "Plymouth", "Suffolk", "Worcester"];
            var num = 0;
            if (j == 1)
                num = symptomTable[counties[i - 1]].positive;
            if (j == 2)
                num = symptomTable[counties[i - 1]].negative;
            if (j == 3)
                num = symptomTable[counties[i - 1]].untested;
            row.cells[j].innerHTML = num.toString();
        }
    }
}
exports.updateTable = updateTable;
var c3 = require("c3");
var d3 = require("d3");
function updateTestedChart(filter, caseTable) {
    console.log(caseTable);
    var days = [];
    var values = [];
    days.push('x');
    if (filter == -1)
        values.push("Untested");
    else if (filter == 0)
        values.push("Negative_Test_Result");
    else if (filter == 1)
        values.push("New_Positive_Cases");
    else
        values.push("All_Forms");
    for (var _i = 0, _a = Object.entries(caseTable); _i < _a.length; _i++) {
        var key = _a[_i][0];
        days.push(key);
        if (filter == -1)
            values.push(caseTable[key].untested);
        else if (filter == 0)
            values.push(caseTable[key].negative);
        else if (filter == 1)
            values.push(caseTable[key].positive);
        else if (filter == 2)
            values.push(caseTable[key].positive + caseTable[key].negative + caseTable[key].untested);
    }
    var chart = c3.generate({
        bindto: '#chart-2',
        data: {
            x: 'x',
            columns: [
                days,
                values
            ],
            type: 'bar',
            colors: {
                All_Forms: '#000080',
                Untested: '#0086b3',
                Negative_Test_Result: '#40bf40',
                New_Positive_Cases: '#cc0000'
            }
        },
        axis: {
            x: {
                type: 'category',
                show: false
            }
        }
    });
}
exports.updateTestedChart = updateTestedChart;
function updateSymptomChart(symptomTable) {
    console.log(symptomTable);
    var rawData = [];
    var barData = [["none", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ["mild", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["severe", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    var counties = ["Barnstable", "Berkshire", "Bristol", "Dukes", "Essex", "Franklin", "Hampden",
        "Hampshire", "Middlesex", "Nantucket", "Norfolk", "Plymouth", "Suffolk", "Worcester"];
    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 3; j++) {
            if (j == 0)
                rawData.push(symptomTable[counties[i]].nes);
            if (j == 1)
                rawData.push(symptomTable[counties[i]].mild);
            if (j == 2)
                rawData.push(symptomTable[counties[i]].severe);
        }
    }
    var count = 0;
    for (var i = 1; i < 15; i++) {
        for (var j = 0; j < 3; j++) {
            barData[j][i] = rawData[count];
            count++;
        }
    }
    var chart = c3.generate({
        bindto: '#chart-1',
        data: {
            columns: barData,
            types: {
                none: 'bar',
                mild: 'bar',
                severe: 'bar'
            },
            colors: {
                none: '#0086b3',
                mild: '#40bf40',
                severe: '#cc0000'
            }
        },
        axis: {
            x: {
                type: 'category',
                categories: [counties[0], counties[1], counties[2], counties[3], counties[4], counties[5], counties[6],
                    counties[7], counties[8], counties[9], counties[10], counties[11], counties[12], counties[13]]
            }
        }
    });
}
exports.updateSymptomChart = updateSymptomChart;
var L = require("leaflet");
var map = L.map('map').setView([42.35, -71.08], 9);
var jQuery = require("jquery");
var geojsonlayer = L.geoJson();
L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png', {
    attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
    maxZoom: 17,
    minZoom: 8
}).addTo(map);
function updateMap(symptoms) {
    // load a tile layer
    var counties = ["Barnstable", "Berkshire", "Bristol", "Dukes", "Essex", "Franklin", "Hampden",
        "Hampshire", "Middlesex", "Nantucket", "Norfolk", "Plymouth", "Suffolk", "Worcester"];
    var totals = [];
    for (var i = 0; i < counties.length; i++) {
        totals[i] = symptoms[counties[i]].mild +
            symptoms[counties[i]].nes +
            symptoms[counties[i]].severe;
        totals[i] = (totals[i] - symptoms[counties[i]].nes) / 1100;
        totals[i] = 255 - Math.round(totals[i] * 255);
    }
    map.removeLayer(geojsonlayer);
    jQuery.getJSON("/maps/COUNTIES_POLY.json", function (hoodData) {
        geojsonlayer = L.geoJson(hoodData, { style: function (feature) {
                switch (feature.properties.NAME) {
                    case ('Barnstable'): return { color: 'rgb(255, ' + totals[0] + ',' + totals[0] + ')' };
                    case ('Berkshire'): return { color: 'rgb(255, ' + totals[1] + ',' + totals[1] + ')' };
                    case ('Bristol'): return { color: 'rgb(255, ' + totals[2] + ',' + totals[2] + ')' };
                    case ('Dukes'): return { color: 'rgb(255, ' + totals[3] + ',' + totals[3] + ')' };
                    case ('Essex'): return { color: 'rgb(255, ' + totals[4] + ',' + totals[4] + ')' };
                    case ('Franklin'): return { color: 'rgb(255, ' + totals[5] + ',' + totals[5] + ')' };
                    case ('Hampden'): return { color: 'rgb(255, ' + totals[6] + ',' + totals[6] + ')' };
                    case ('Hampshire'): return { color: 'rgb(255, ' + totals[7] + ',' + totals[7] + ')' };
                    case ('Middlesex'): return { color: 'rgb(255, ' + totals[8] + ',' + totals[8] + ')' };
                    case ('Nantucket'): return { color: 'rgb(255, ' + totals[9] + ',' + totals[9] + ')' };
                    case ('Norfolk'): return { color: 'rgb(255, ' + totals[10] + ',' + totals[10] + ')' };
                    case ('Plymouth'): return { color: 'rgb(255, ' + totals[11] + ',' + totals[11] + ')' };
                    case ('Suffolk'): return { color: 'rgb(255, ' + totals[12] + ',' + totals[12] + ')' };
                    case ('Worcester'): return { color: 'rgb(255, ' + totals[13] + ',' + totals[13] + ')' };
                }
            } }).addTo(map);
    });
}
exports.updateMap = updateMap;
