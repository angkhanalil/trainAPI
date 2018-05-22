import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { UserController } from './controller/user';
import * as config from 'config';

import { Server } from 'http';
// import { AddressInfo } from 'net';
const app = express();
const server = new Server(app);

// const port:number = 3000;
let port = server.listen(config.get("port"));

server.listen(port);
console.log(`server start on port ${port.address()["port"]}`);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api/v1/user', UserController);