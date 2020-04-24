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
  // make a bunch of users
  let users = [];
  let userIds = [];
  usersCollection.deleteMany({});
  symptomsCollection.deleteMany({});
  for (let i = 0; i < 1000; i += 1) {
    const email = faker.internet.email();
    const password = faker.internet.password();
    let newUser = {
      tested: faker.random.boolean(),
        testedResult:faker.random.number({max:1, min:-1}),
        
        email,
        password,
        symptom:null,
      sex:"female",
      county: "Suffolk",
      age:23
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
  for (let i = 0; i < 1000; i += 1) {
    let newSymptom = {
    fever: faker.random.number({max:2, min:0}),
    tiredness: faker.random.number({max:2, min:0}),
    chills: faker.random.number({max:2, min:0}),
    digestion: faker.random.number({max:2, min:0}),
    smell: faker.random.number({max:2, min:0}),
    congestion: faker.random.number({max:2, min:0}),
    cough: faker.random.number({max:2, min:0}),
    breathing: faker.random.number({max:2, min:0}),
    user:userIds[i],
    startDate:faker.date.past,
    endDate:faker.date.past,
      // use lodash to pick a random user as the author of this post
     // author: _.sample(users),

      // use lodash to add a random subset of the users to this post
//      likes: _.sampleSize(users, Math.round(Math.random * users.length)).map(
  //      user => user._id
    //  )
    };
    symptoms.push(newSymptom);

    // visual feedback again!
  //  console.log(newSymptom);
  }
  symptomsCollection.insertMany(symptoms, function(err, r){
      symptomIds = r.insertedIds;
      for( let i = 0; i<1000; i++){
      usersCollection.findOneAndUpdate({_id: userIds[i]},
      { $set: { symptom: symptomIds[i]}});
      }
    client.close();

  });
  console.log("Database seeded!");
  });
  // make a bunch of posts
  
});
