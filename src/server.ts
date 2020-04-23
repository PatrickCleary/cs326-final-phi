let http = require('http');
let url = require('url');
let express = require('express');
import {Database} from './database';

export class Server {

    private theDatabase: any;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = 8080;
    private router = express.Router();

    constructor(db : Database) {

    //CORS
    this.router.use((request, response, next) => {
        response.header('Content-Type','application/json');
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', '*');
        next();
    });

    var path = require('path');
    this.server.use('/', express.static('./src/public'));
    this.server.use('/symptoms', express.static('./src/public'));
    this.server.use(express.json());
    //TODO: change folder to html folder
    this.server.set('views', path.join(__dirname, 'views'));
    this.server.engine('html', require('ejs').renderFile);
    this.server.set('view engine', 'html');

    var indexRouter = require('./routes/IndexRouter');
    var symptomsRouter = require('./routes/SymptomRouter');

    this.server.use('/', indexRouter);
    this.server.use('/symptoms', symptomsRouter);


    this.server.use(function(req, res, next) {
      next(createError(404));
    });


    // error handler
    this.server.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.send('404');
    });
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
