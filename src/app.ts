import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { UserController } from './controller/user';
import { LoginController } from './controller/login';
import { IssueController } from './controller/issue';
import { PicController } from './controller/pic';
import { jwt } from './shared/auth';
import * as config from 'config';
import * as io from 'socket.io';


import { Server } from 'http';
// import { AddressInfo } from 'net';

const app = express();
const server = new Server(app);

// const port:number = 3000;
let port = server.listen(config.get("port"));
const socketio = io(server);

server.listen(port);
console.log(`server start on port ${port.address()["port"]}`);

socketio.on("connection", (_socket) => {
    _socket.on('newPic', (payload) => {
        socketio.emit('updatePic', 1);
    });

    _socket.on("deletePic", (payload) => {
        socketio.emit('updatePic', -1);
    });

});

app.use(jwt.initialize());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api/v1/user', UserController);
app.use('/api/v1/login', LoginController);
app.use('/api/v1/issue', IssueController);
app.use('/api/v1/pic', PicController);