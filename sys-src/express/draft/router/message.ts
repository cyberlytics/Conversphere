import express from 'express';




import {
  getAllMessages,
  getMessageById_ctr,
  getMessagesByUserId_ctr,
  getMessagesvisibility_ctr,
  getMessagesByRoomId_ctr,
  createMessage_ctrl,
  deleteMessageById_ctr
} from '../controllers/message.js';

const message = express.Router();

message.get('/messages/getall', getAllMessages);
message.get('/messages/id/:id', getMessageById_ctr);
message.get('/messages/user/:userId', getMessagesByUserId_ctr);
message.get('/messages/visibility/:visibility', getMessagesvisibility_ctr);
message.get('/messages/room/:roomId', getMessagesByRoomId_ctr);
message.post('/messages/create', createMessage_ctrl);
message.delete('/messages/delte/:id', deleteMessageById_ctr);

export default message;
