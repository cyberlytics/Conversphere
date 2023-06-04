import express from 'express';
import { getAllRooms, joinRoom, leaveRoom } from '../controllers/rooms.js';

export default (router: express.Router) => {
    router.get('/server/rooms', getAllRooms);
    router.get('/server/join', joinRoom);
    router.get('/server/leave', leaveRoom);
};