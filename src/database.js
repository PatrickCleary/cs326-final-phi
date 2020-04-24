"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var User = require('./models/User');
var Symptom = require('./models/Symptoms');
var Database = /** @class */ (function () {
    //Import the mongoose module
    //Set up default mongoose connection
    function Database(name) {
        var mongoDB = 'mongodb://heroku_user:potato99@cluster0-shard-00-00-krl3x.mongodb.net:27017,cluster0-shard-00-01-krl3x.mongodb.net:27017,cluster0-shard-00-02-krl3x.mongodb.net:27017/coronaDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
<<<<<<< HEAD
        //var mongoDB = 'mongodb://127.0.0.1/' + name;
=======
>>>>>>> 355ff4c666316d9dd2241d1d3c7685c2a5f499d5
        mongoose.connect(mongoDB, { useNewUrlParser: true });
        //Get the default connection
        var db = mongoose.connection;
        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
    return Database;
}());
exports.Database = Database;
