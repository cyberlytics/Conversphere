import mongoose, { HydratedDocument } from "mongoose";
const RoomScheme = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    users: {type: [mongoose.Schema.Types.ObjectId]}
});


export const Room = mongoose.model("Room", RoomScheme);

export const getRooms = () => Room.find();
export const getRoomById = (id: string) => Room.findById(id);
export const getRoomByDescription = (description: string) => Room.findOne({ description });
export const deleteRoomById = (id: string) => Room.findByIdAndDelete({ _id: id }).exec();
export const createRoomWithName = async (name: string, description: string) => new Room({ name, description }).save().then(room => room.toObject());

export const leaveRoomWithId = async (room_id: string, user_id: string) : Promise<HydratedDocument<any>> => {
    return await Room.findByIdAndUpdate(
        room_id,
        { $pull: { users: user_id } },
        { new: true })
};

export const joinRoomWithId = async (room_id: string, user_id: mongoose.Types.ObjectId) : Promise<HydratedDocument<any>> => {
    return await Room.updateOne(
        {_id: room_id},
        {$push: {
            users: user_id
        }},
        { new: true });
};

export const getRoomByName = async (ame: string) : Promise<HydratedDocument<any>> => {
    return await Room.findOne({ name });
};

export const getUsersByRoomId = async (room_id: string) => (await Room.findById(room_id))?.users;


