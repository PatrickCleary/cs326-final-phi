"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var User = require('./models/User');
var Symptom = require('./models/Symptoms');
var Database = /** @class */ (function () {
    //Import the mongoose module
    //Set up default mongoose connection
    function Database(name) {
        mongoose.connect("mongodb+srv://heroku_user:potato99@cluster0-krl3x.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });
        //Get the default connection
        var db = mongoose.connection;
        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
    return Database;
}());
exports.Database = Database;
