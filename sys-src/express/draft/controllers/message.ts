import { getMessages, getMessageById,getMessagesByUserId,  getMessagesByRoomId, createMessage,deleteMessageById,getMessagesvisibility} from '../db/message.js';
import { Request, Response } from 'express';

export const createMessage_ctrl = async(req: Request, res: Response) => {
  try{
    const {text,userId, roomId, visibility }=req.body;
    const user =await createMessage(text,userId, roomId, visibility );
    return res.status(200).json(user).end();
  }catch (err: any){
    console.log(err);
    return res.sendStatus(500);
}
};

// Get a message by ID
export const getMessageById_ctr = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const message = await getMessageById(id);

    return res.json(message);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

// Get messages by user ID
export const getMessagesByRoomId_ctr = async(req: Request, res: Response) => {
  try {
    const { roomid } = req.params;

    const message = await getMessagesByRoomId(roomid);

    return res.json(message);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
export const getMessagesByUserId_ctr = async(req: Request, res: Response) => {
  try {
    const { userid } = req.params;

    const message = await getMessagesByUserId(userid);

    return res.json(message);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const getMessagesvisibility_ctr = async(req: Request, res: Response) => {
  try {
    const { visibility } = req.params;

    const message = await getMessagesvisibility(visibility);

    return res.json(message);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}


// Get all messages
export const getAllMessages = async(req: Request, res: Response) => {
  try{
    const message = await getMessages();
    return res.status(200).json(message).end();
}catch (err: any){
    console.log(err);
    return res.sendStatus(500);
}
};

export const deleteMessageById_ctr = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;

    const deletedmessage = await deleteMessageById(id);

    return res.json(deletedmessage);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}