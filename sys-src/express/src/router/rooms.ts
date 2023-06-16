import express from 'express';
import { getAllRooms, joinRoom } from '../controllers/rooms.js';

export default (router: express.Router) => {
    router.get('/api/rooms', getAllRooms);
    router.post('/api/join', joinRoom);
};