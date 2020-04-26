"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
var url = require('url');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Server = /** @class */ (function () {
    function Server(db) {
        // Server stuff: use express instead of http.createServer
        this.server = express();
        this.port = 8080;
        this.router = express.Router();
        //CORS
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(bodyParser.json());
        this.server.use(express.json()); // to support JSON-encoded bodies
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
    Server.prototype.listen = function (port) {
        this.server.listen(port);
    };
    return Server;
}());
exports.Server = Server;
