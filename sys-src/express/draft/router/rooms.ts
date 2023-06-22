import express from 'express';
import {
  getAllRooms,
  getRoomByName_ctr,
  getRoomById_ctr,
  getRoomByDescription_ctr,
  createRoom_ctr,
  deleteRoomById_ctr
} from '../controllers/rooms.js';


const room = express.Router();


room.get('/rooms', getAllRooms);
room.get('/rooms/name/:name', getRoomByName_ctr);
room.get('/rooms/id/:id', getRoomById_ctr);
room.get('/rooms/description/:description', getRoomByDescription_ctr);
room.post('/rooms/create', createRoom_ctr);
room.delete('/rooms/delete/:id', deleteRoomById_ctr);



export default room;