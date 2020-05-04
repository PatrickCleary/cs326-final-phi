let http = require('http');
let url = require('url');
let express = require('express');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
var envConf = require('dotenv').config();
var session = require('express-session');
import {Database} from './database';

export class Server {

    private theDatabase: any;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = 8080;
    private router = express.Router();

    constructor(db : Database) {

    //CORS
    this.router.use((request:any, response:any, next:any) => {
        response.header('Content-Type','application/json');
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', '*');
        next();
    });

    this.server.use(session({
	   secret: process.env.SESSION_SECRET,
	   resave: true,
	   saveUninitialized: true
    }));


    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());

    this.server.use(express.json());       // to support JSON-encoded bodies
    this.server.use(express.urlencoded());

    var path = require('path');
    this.server.use('/', express.static('./src/public'));
    this.server.use('/symptoms', express.static('./src/public'));
    this.server.use(express.json());
    //TODO: change folder to html folder
    this.server.set('views', path.join(__dirname, 'views'));
    this.server.engine('html', require('ejs').renderFile);
    this.server.set('view engine', 'ejs');

    var indexRouter = require('./routes/IndexRouter');
    var symptomsRouter = require('./routes/SymptomRouter');
    var usersRouter = require('./routes/UserRouter');


    this.server.use('/', indexRouter);
    this.server.use('/symptoms', symptomsRouter);
    this.server.use('/users', usersRouter);

    }

    /*
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
    */
    public listen(port: any) : void  {
    this.server.listen(port);
    }


}
