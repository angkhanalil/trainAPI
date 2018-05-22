import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { UserController } from './controller/user';

import { Server } from 'http';
const app = express();
const server = new Server(app);

const port:number = 3000;

server.listen(port);
console.log(`server start on port ${port}`);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api/v1/user', UserController);