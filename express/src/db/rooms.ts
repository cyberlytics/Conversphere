import mongoose from "mongoose";

const RoomScheme = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.UUID, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true}
});

export const RoomModel = mongoose.model("Room", RoomScheme);

export const getRooms = () => RoomModel.find();

export const leaveRoomWithId = (room_id: string, user_id: string) => {

}

export const joinRoomWithNickname = (room_id: string, nickname: string) => {
    
}