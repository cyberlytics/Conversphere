import express from 'express';
import { getAllMessages} from '../controllers/messages.js';

export default (router: express.Router) => {
    router.get('/server/rooms/:id/messages', getAllMessages);
};