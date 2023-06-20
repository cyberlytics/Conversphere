import express, { Express } from 'express';
import { Server } from 'socket.io';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router/index.js';
import { checkNamespaces, handleNamespaces } from './sockets/socketController.js';
import mongoose from 'mongoose';

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

const uri = "mongodb+srv://web_anwendung_projekt:W6aKJmOszJOj7Sw1@cluster0.i5kfluk.mongodb.net/?retryWrites=true&w=majority";
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas', error);
  }
};
connectToMongoDB();


app.use('/', router());