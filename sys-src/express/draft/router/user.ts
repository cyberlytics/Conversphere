import express from 'express';

import {getAllUsers, getUserbyId_ctr, getUserByNickname_ctr, createUser_ctr, deleteUserById_ctr} from '../controllers/user.js';


const user = express.Router();

user.get('/user', getAllUsers);
user.get('/user/id/:id', getUserbyId_ctr);
user.get('/user/nickname/:nickname', getUserByNickname_ctr);
user.delete('/user/delete_id/:id', deleteUserById_ctr);
user.post('/user', createUser_ctr);


export default user;
