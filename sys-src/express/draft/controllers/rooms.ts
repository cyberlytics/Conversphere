import { getRooms,getRoomById, getRoomByName,getRoomByDescription,  deleteRoomById, createRoom,joinRoomWithNickname } from '../db/rooms.js';
import { getUserByNickname , createUser} from '../db/user.js';
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























export const getRoomById_ctr = async(req: Request, res: Response) => {

  try{
    const{id} =req.params;
    const room=await getRoomById(id)
    return res.json(room);
    
  }catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const getRoomByName_ctr = async (req: Request, res: Response) => {

  try{
    const{name} =req.params;
    const room=await getRoomByName(name)
    return res.json(room);
    
  }catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
export const getRoomByDescription_ctr = async (req: Request, res: Response) => {

  try{
    const{description} =req.params;
    const room=await getRoomByDescription(description)
    return res.json(room);
    
  }catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const createRoom_ctr =async (req: Request, res: Response) => {
  try{
    const {name, description}=req.body;
    const room =await createRoom(name, description);
    return res.status(200).json(room).end();
  }catch (err: any){
    console.log(err);
    return res.sendStatus(400);
}
};

export const deleteRoomById_ctr = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;

    const deletedRoom = await deleteRoomById(id);

    return res.json(deletedRoom);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}