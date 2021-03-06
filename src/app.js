'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./database");
var server_1 = require("./server");
var database = new database_1.Database('coronaDB');
var server = new server_1.Server(database);
server.listen(process.env.PORT || '8080');
