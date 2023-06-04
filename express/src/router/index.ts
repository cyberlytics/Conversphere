import express from 'express';
import rooms from './rooms.js';
import messages from './messages.js'
import info from './info.js';

const router = express.Router();

export default (): express.Router => {
    rooms(router);
    messages(router);
    info(router);
    return router;
};
