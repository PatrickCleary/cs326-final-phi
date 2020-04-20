export class Database {

    private MongoClient = require('mongodb').MongoClient;
    private uri = "mongodb+srv://guest:guest@cluster0-y0tyl.mongodb.net/test?retryWrites=true&w=majority";
    private collectionName : string;
    private dbName : string = "users";
    private client : any;

    constructor(collectionName:any) {
	this.collectionName = collectionName;
	this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
	// Open up a connection to the client.
	// Open up a connection to the client.
	// The connection is asynchronous, but we can't call await directly
	// in the constructor, which cannot be async. So, we use "IIFE". Explanation below.
	
	/* from https://anthonychu.ca/post/async-await-typescript-nodejs/

	  Async/Await and the Async IIFE

	  The await keyword can only be used inside of a function
	  marked with the async keyword. [...] One way to do this is
	  with an "async IIFE" (immediately invoked function
	  expression)...

	   (async () => {
	   // code goes here
	   })();

	*/
	(async () => {
	    await this.client.connect().catch((err: any) => { console.log(err); });
	})();
    }

    public async put(userName: string, value: string) : Promise<void> {
        let db = this.client.db(this.dbName);
        let collection = db.collection(this.collectionName);
        console.log("put: userName = " + userName + ", value = " + value);
        let result = await collection.updateOne({'name' : userName}, { $set : { 'value' : value} }, { 'upsert' : true } );
        console.log("result = " + result);
    
    }

    public async get(userName: string) : Promise<string> {
        let db = this.client.db(this.dbName); // this.level(this.dbFile);
        let collection = db.collection(this.collectionName);
        console.log("get: userName = " + userName);
        let result = await collection.findOne({'name' : userName });
        console.log("get: returned " + JSON.stringify(result));
        if (result) {
            return result.value;
        } else {
            return 'get failed';
        }
    }
    
    public async del(username: string) : Promise<void> {
        let db = this.client.db(this.dbName);
        let collection = db.collection(this.collectionName);
        console.log("delete: username = " + username);
        let result = await collection.deleteOne({'name' : username });
        console.log("result = " + result);
    }
    
    public async isFound(userName: string) : Promise<boolean>  {
        console.log("isFound: userName = " + userName);
        let v = await this.get(userName);
        console.log("is found result = " + v);
        if (v === null) {
            return false;
        } else {
            return true;
        }
    }
}