import express from 'express';
import authentication from './authentication.js';
import users from './users.js';
import info from './info.js';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    info(router);

    return router;
};
