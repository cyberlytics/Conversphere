import express from 'express';
import rooms from './rooms.js';
import messages from './messages.js'

const router = express.Router();

export default (): express.Router => {
    rooms(router);
    messages(router);
    return router;
};
