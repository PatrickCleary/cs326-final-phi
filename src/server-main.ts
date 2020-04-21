'use strict';

import {Database} from './database';
import {Server} from './server';

const database = new Database('COVID');
const server =   new Server(database);

server.listen(8080);