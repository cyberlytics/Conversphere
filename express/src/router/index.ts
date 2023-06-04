import express from 'express';
import rooms from './rooms.js';

const router = express.Router();

export default (): express.Router => {
    rooms(router);
    return router;
};
