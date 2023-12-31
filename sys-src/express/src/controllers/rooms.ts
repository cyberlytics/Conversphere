import { User } from './../model/User';
import { getRooms, joinRoomWithId, createRoomWithName, getRoomById, getUsersByRoomId, getRoomByName, getRoomByDescription } from './../db/rooms';
import { getUserByNickname , createUser, getAllUserNames} from '../db/users';
import {  Request, Response } from 'express';

export const getAllRooms = async(req: Request, res: Response) => {
  try{
    const rooms = (await getRooms()).map(x => {
        return {
            id: x._id.toString(),
            name: x.name,
            description: x.description,
            users: x.users
        };
    });
    return res.status(200).json(rooms).end();
}catch (err: any){
    return res.sendStatus(400);
}
};

export const joinRoom = async (req: Request, res: Response ) => {
    try {
        const {room_id, nickname} = req.body;
        //console.log("Request to join room(" + room_id + ") with nickname: " + nickname);

        // get the room and check
        const room = await getRoomById(room_id);
        if(!room){
            return res.status(400).end();
        }
        console.log("Room found: " + room.name);

        //check if there is already a user in the room
        const existingUser = await getUserByNickname(nickname);
        if(existingUser){
            if(room.users.some(x => x == existingUser._id)){
                console.log("User already in room!!!");
                return res.status(423).end();
            }
        }
        console.log("User not found in room, fine to join");

        // create new user
        const newUser = await createUser(nickname);
        await joinRoomWithId(room_id, newUser._id);

        const returnUser = {
            id: newUser._id.toString(),
            nickname: newUser.nickname,
            position: newUser.position
        } as User;
        console.log("User created and joined room, returning user: "+ returnUser.nickname);

        return res.status(200).json(returnUser).end();
    }catch (err: any) {
        return res.sendStatus(500);
    }
};

export const createRoom = async (req: Request, res: Response) => {
    try{
        const {name, description} = req.body;

        const db_room = await createRoomWithName(name, description);
        const room = {
            id: db_room._id.toString(),
            name: db_room.name,
            description: db_room.description
        };

        return res.status(200).json(room).end();
    }catch(err: any){
        return res.status(500);
    }
};
