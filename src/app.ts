'use strict';

import {Database} from './database';
import {Server} from './server';

const database = new Database('test');
const server =   new Server(database);

server.listen(8080);
