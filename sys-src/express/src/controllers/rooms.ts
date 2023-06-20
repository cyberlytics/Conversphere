import { getRooms,getRoomById, getRoomByName,getRoomByDescription,  deleteRoomById, createRoom,joinRoomWithNickname } from '../db/rooms.js';
import { getUserByNickname , createUser} from '../db/users.js';
import {  Request, Response } from 'express';
import mongoose from 'mongoose';

export const getAllRooms = async(req: Request, res: Response) => {
  try{
    const rooms = await getRooms();
    return res.status(200).json(rooms).end();
}catch (err: any){
    console.log(err);
    return res.sendStatus(400);
}
};
export const joinRoom = async (room_id: string, nickname: string) => {
  try {
    const existingUser = await getUserByNickname(nickname);

    if (existingUser) {
      return { success: false, error: "Username already used in the requested chatroom", status: 423 };
    }


    const newUser = await createUser( nickname);

    const updatedRoom = await joinRoomWithNickname(room_id, nickname);
  } catch (error) {
    return { success: false, error, status: 500 };
  }
};
