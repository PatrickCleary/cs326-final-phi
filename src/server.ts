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

    //CORS
    this.router.use((request:any, response:any, next:any) => {
        response.header('Content-Type','application/json');
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', '*');
        next();
    });


    //TODO: change folder to html folder
    this.server.use('/', express.static('./'));
    this.server.use(express.json());
   
    //start up router for api (CRUD operations)
    this.server.use('/api', this.router);



    //TODO: add links between all pages.
    this.router.post('/form', function(request:any, response:any){
        response.render('form', {
            title: 'Submission Form'
        });
    });

    /*
    this.router.post('/charts', function(request:any, response:any){
        response.render('index', {
            title: 'Home Page'
        });
    });
    */

    //TODO: add operations for all necessary database reads.
    this.router.post('/submission/create', this.createHandler.bind(this));
    this.router.post('/submission/read', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
    this.router.post('/submission/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
    this.router.post('/submission/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
    this.router.post('/home/read', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
    this.router.post('*', this.errorHandler.bind(this));
    }



    private async errorHandler(request:any, response:any, next:any) : Promise<void> {
        console.log(request)
        let value : boolean = await this.theDatabase.isFound(request.body.name);
    if (!value) {
        response.write(JSON.stringify({'result' : 'error'}));
        response.end();
    } else {
        next();
    }
    }
    
    private async createHandler(request:any, response:any) : Promise<void> {
    await this.createCounter(request.body.name, response);
    }

    private async readHandler(request:any, response:any): Promise<void> {
    /// YOUR CODE GOES HERE
    await this.readCounter(request.body.name, response);

    }

    private async updateHandler(request:any, response:any) : Promise<void> {
    /// YOUR CODE GOES HERE
    await this.updateCounter(request.params['userId']+"-"+request.body.name, request.body.value, response);

    }

    private async deleteHandler(request:any, response:any) : Promise<void> {
    /// YOUR CODE GOES HERE
    await this.deleteCounter(request.params['userId']+"-"+request.body.name, response);
    }

    public listen(port: any) : void  {
    this.server.listen(port);
    }





    //TODO: update these to work with our data... aka add fields to create entries with User types.
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

