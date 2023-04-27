import express from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/users.js';
import { isAuthenticated, isOwner } from '../middlewares/index.js';

export default (router: express.Router) => {
    router.get('/users',isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};