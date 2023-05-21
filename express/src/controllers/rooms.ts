import { getRooms, joinRoomWithNickname, leaveRoomWithId } from 'db/rooms.js';
import express from 'express';

export const getAllRooms  = async (req: express.Request, res: express.Response) => {
    try{
        const rooms = await getRooms();
        return res.status(200).json(rooms).end();
    }catch (err: any){
        console.log(err);
        return res.sendStatus(500);
    }
};

export const joinRoom  = async (req: express.Request, res: express.Response) => {
    try{
        const {room_id, nickname} = req.body;

        const user = await joinRoomWithNickname(room_id, nickname);
        return res.status(200).json(user).end();
    }catch (err: any){
        console.log(err);
        return res.sendStatus(500);
    }
};


export const leaveRoom  = async (req: express.Request, res: express.Response) => {
    try{
        const {room_id, user_id} = req.body;
        await leaveRoomWithId(room_id, user_id);
        return res.sendStatus(200);
    }catch (err: any){
        console.log(err);
        return res.sendStatus(500);
    }
};

