let mongoose = require('mongoose');
let User = require('./models/User');
let Symptom = require('./models/Symptoms');

export class Database {
  //Import the mongoose module
  //Set up default mongoose connection
  constructor(name: String) {
    const mongoDB= 'mongodb://heroku_user:potato99@cluster0-shard-00-00-krl3x.mongodb.net:27017,cluster0-shard-00-01-krl3x.mongodb.net:27017,cluster0-shard-00-02-krl3x.mongodb.net:27017/coronaDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
    //var mongoDB = 'mongodb://127.0.0.1/' + name;
    mongoose.connect(mongoDB, { useNewUrlParser: true });

    //Get the default connection
    var db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }


}
