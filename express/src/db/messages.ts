import mongoose from "mongoose";

const MessageScheme = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.UUID, required: true},
    text: {type: String, required: true},
    user_id: {type: mongoose.Schema.Types.UUID, required: true},
    room_id: {type: mongoose.Schema.Types.UUID, required: true},
    visibility: {type: Number, min: 0, max: 100, required: true}
});

export const MessageModel = mongoose.model("Message", MessageScheme);

export const getMessagesByRoom = (roomId: string) => {
    return MessageModel.find({id: roomId});
}