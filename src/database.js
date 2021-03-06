"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var User = require('./models/User');
var Symptom = require('./models/Symptoms');
var Database = /** @class */ (function () {
    //Import the mongoose module
    //Set up default mongoose connection
    function Database(name) {
        var mongoDB = process.env.DB_STRING;
        mongoose.connect(mongoDB, { useNewUrlParser: true });
        //Get the default connection
        var db = mongoose.connection;
        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
    return Database;
}());
exports.Database = Database;
