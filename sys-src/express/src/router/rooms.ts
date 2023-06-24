import express from 'express';
import { createRoom, getAllRooms, joinRoom } from '../controllers/rooms';

export default (router: express.Router) => {
    router.get('/api/rooms', getAllRooms);
    router.post('/api/joinRoom', joinRoom);
    router.post('/api/createRoom', createRoom);
};