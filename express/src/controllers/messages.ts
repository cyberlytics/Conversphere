import { getMessagesByRoom } from 'db/messages.js';
import express from 'express';


export const getAllMessages  = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;
        const messages = await getMessagesByRoom(id);
        return res.status(200).json(messages).end();
    }catch (err: any){
        console.log(err);
        return res.sendStatus(500);
    }
};