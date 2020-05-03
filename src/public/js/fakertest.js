/* mySeedScript.js */
// require the necessary libraries
const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const _ = require("lodash");
// Connection URL
const url= 'mongodb://heroku_user:potato99@cluster0-shard-00-00-krl3x.mongodb.net:27017,cluster0-shard-00-01-krl3x.mongodb.net:27017,cluster0-shard-00-02-krl3x.mongodb.net:27017/coronaDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

// Database Name
const dbName = "coronaDB";

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);

  const db = client.db(dbName);

  // get access to the relevant collections
  const usersCollection = db.collection("users");
  const symptomsCollection = db.collection("symptoms");
  let counties = ["Barnstable","Berkshire","Bristol","Dukes","Essex","Franklin","Hampden",
  "Hampshire","Middlesex","Nantucket","Norfolk","Plymouth","Suffolk","Worcester"];
  let sexy = ["male","female"]
  // make a bunch of users
  let users = [];
  let userIds = [];
  //usersCollection.deleteMany({});
  //symptomsCollection.deleteMany({});
  for (let i = 0; i < 5000; i += 1) {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const date = faker.date.between('2020-03-01', '2020-05-03');
    const test = faker.random.boolean();
    var result = 0;
    if (test){
      result = faker.random.number({max:1, min:0});
    }
    else{
      result = -1;
    }
    let newUser = {
      tested: test,
      testedResult:result,
      email,
      password,
      symptom:null,
      sex:sexy[faker.random.number({max:1,min:0})],
      county: counties[faker.random.number({max:13,min:0})],
      age:faker.random.number({max:75,min:1}),
      date
    };
    users.push(newUser);

    // visual feedback always feels nice!
    //console.log(newUser);
  }
  usersCollection.insertMany(users, function(err, r) {
    assert.equal(null, err);
    userIds= r.insertedIds;
    console.log(userIds);
    let symptoms = [];
  for (let i = 0; i < 5000; i += 1) {
    let newSymptom = {
    fever: faker.random.number({max:2, min:0}),
    tiredness: faker.random.number({max:2, min:0}),
    chills: faker.random.number({max:2, min:0}),
    digestion: faker.random.number({max:2, min:0}),
    smell: faker.random.number({max:2, min:0}),
    congestion: faker.random.number({max:2, min:0}),
    cough: faker.random.number({max:2, min:0}),
    breathing: faker.random.number({max:2, min:0}),
    user:userIds[i]
    };
        // use lodash to pick a random user as the author of this post
      // author: _.sample(users),

      // use lodash to add a random subset of the users to this post
      //      likes: _.sampleSize(users, Math.round(Math.random * users.length)).map(
      //      user => user._id
        //  )
    
    symptoms.push(newSymptom);

    // visual feedback again!
  //  console.log(newSymptom);
  }
  symptomsCollection.insertMany(symptoms, function(err, r){
      symptomIds = r.insertedIds;
      for( let i = 0; i<5000; i++){
      usersCollection.findOneAndUpdate({_id: userIds[i]},
      { $set: { symptom: symptomIds[i]}});
      }
    client.close();

  });
  console.log("Database seeded!");
  });
  // make a bunch of posts
  
});
