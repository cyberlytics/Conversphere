import { info } from '../controllers/info.js';
import express from 'express';

export default (router: express.Router) => {
    router.get('/info', info);
};
