"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var user_1 = require("./controller/user");
var config = require("config");
var http_1 = require("http");
// import { AddressInfo } from 'net';
var app = express();
var server = new http_1.Server(app);
// const port:number = 3000;
var port = server.listen(config.get("port"));
server.listen(port);
console.log("server start on port " + port.address()["port"]);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api/v1/user', user_1.UserController);
//# sourceMappingURL=D:/trainAPI/app.js.map