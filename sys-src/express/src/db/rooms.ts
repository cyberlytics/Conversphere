import mongoose from "mongoose";
import { getUserByNickname , createUser} from './users.js';
const RoomScheme = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.UUID, required: true},
    name: {type: String, required: true},
    description: {type: String},
    users: [{ type: String }]
});


export const Room = mongoose.model("Room", RoomScheme);

export const getRooms = () => Room.find();
export const getRoomById = (id: string) => Room.findById(id);
export const getRoomByName = (name: string) => Room.findOne({ name });
export const getRoomByDescription = (description: string) => Room.findOne({ description });
export const deleteRoomById = (id: string) => Room.findByIdAndDelete({ _id: id });
export const createRoom = async (id: mongoose.Schema.Types.ObjectId, name: string, description: string) => new Room({ name, description }).save().then(room => room.toObject());

export const leaveRoomWithId = (room_id: string, user_id: string) => {Room.findByIdAndUpdate(room_id,{ $pull: { users: user_id } },{ new: true })};

export const joinRoomWithNickname = (room_id: string, user_id: string) => {Room.findByIdAndUpdate(room_id,{ $addToSet: { users: user_id } },{ new: true })};

export const getUsersByRoomId = async (room_id: string) => (await Room.findById(room_id))?.users;


