'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./database");
var server_1 = require("./server");
var database = new database_1.Database('test');
var server = new server_1.Server(database);
server.listen(8080);
