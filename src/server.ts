let http = require('http');
let url = require('url');
let express = require('express');
import {Database} from './database';

export class Server {

    private theDatabase: Database;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = 8080;
    private router = express.Router();

    constructor(db : Database) {
    this.theDatabase = db;

    this.router.use((request:any, response:any, next:any) => {
        response.header('Content-Type','application/json');
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', '*');
        next();
    });

    // Serve static pages from a particular path.
    //TODO: change folder to html folder
    this.server.use('/', express.static('./'));
    //// YOUR CODE GOES HERE
    //// HANDLE CREATE, READ, UPDATE, AND DELETE OPERATIONS
    //// HANDLE ERRORS WITH A WILDCARD (*)
    // Start up the form submission endpoint at '/submission'.
    this.server.use('/submission', this.router);
    this.router.get('/submission/create', this.createHandler.bind(this));
    this.router.get('/submission/read', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
    this.router.get('/submission/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
    this.router.get('/submission/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
    this.router.get('*', this.errorHandler.bind(this));
    }

    private async errorHandler(request:any, response:any, next:any) : Promise<void> {
    let value : boolean = await this.theDatabase.isFound(request.params['userId']+"-"+request.query.name);
    if (!value) {
        response.write(JSON.stringify({'result' : 'error'}));
        response.end();
    } else {
        next();
    }
    }
    
    private async createHandler(request:any, response:any) : Promise<void> {
    await this.createCounter(request.params['userId']+"-"+request.query.name, response);
    }

    private async readHandler(request:any, response:any): Promise<void> {
    /// YOUR CODE GOES HERE
    await this.readCounter(request.params['userId']+"-"+request.query.name, response);

    }

    private async updateHandler(request:any, response:any) : Promise<void> {
    /// YOUR CODE GOES HERE
    await this.updateCounter(request.params['userId']+"-"+request.query.name, request.query.value, response);

    }

    private async deleteHandler(request:any, response:any) : Promise<void> {
    /// YOUR CODE GOES HERE
    await this.deleteCounter(request.params['userId']+"-"+request.query.name, response);
    }

    public listen(port: any) : void  {
    this.server.listen(port);
    }

    public async createCounter(name: string, response:any) : Promise<void> {
    console.log("creating counter named '" + name + "'");
    await this.theDatabase.put(name, '0');
    response.write(JSON.stringify({'result' : 'created',
                    'name' : name,
                    'value' : 0 }));
    response.end();
    }

    public async errorCounter(name: string, response:any) : Promise<void> {
    response.write(JSON.stringify({'result': 'error'}));
    response.end();
    }

    public async readCounter(name: string, response:any) : Promise<void> {
    let value = await this.theDatabase.get(name);
    response.write(JSON.stringify({'result' : 'read',
                    'name' : name,
                    'value' : value }));
    response.end();
    }

    public async updateCounter(name: string, value: string, response:any) : Promise<void> {
    await this.theDatabase.put(name, value);
    response.write(JSON.stringify({'result' : 'updated',
                    'name' : name,
                    'value' : value }));
    response.end();
    }
    
    public async deleteCounter(name : string, response:any) : Promise<void> {
    await this.theDatabase.del(name);
    response.write(JSON.stringify({'result' : 'deleted',
                    'value'  : name }));
    response.end();
    }
}

