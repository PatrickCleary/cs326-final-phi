let mongoose = require('mongoose');
let User = require('./models/User');
let Symptom = require('./models/Symptoms');

export class Database {
  //Import the mongoose module
  //Set up default mongoose connection
  constructor(name: String) {
    mongoose.connect("mongodb+srv://heroku_user:potato99@cluster0-krl3x.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });

    //Get the default connection
    var db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }


}
