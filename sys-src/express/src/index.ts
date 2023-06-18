import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
//import mongoose from 'mongoose';
import router from './router/index.js';
import { checkNamespaces, handleNamespaces } from './sockets/socketController.js';

const app: Express = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors:{
    origin: "http://localhost:3000"
  }
});

const nsp = checkNamespaces(io);
handleNamespaces(nsp);

httpServer.listen(8080, () => {
  console.log('Server is running on port 8080');
});

/*
const MONGO_URL = "mongodb+srv://feillukas:"+encodeURIComponent("pEj?VQK>w2*2Uk4UAk5MS<9mDiT7fYyZ")+"@wae.6bsejdu.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (err: Error) => {
  console.log(err);
});
*/


app.use('/', router());