

import mongoose, { Document, Schema } from 'mongoose';

const MessageScheme = new mongoose.Schema({
    id:  {type: mongoose.Schema.Types.ObjectId, required: true},
    text: {type: String, required: true},
    user_id: {type: Schema.Types.ObjectId, required: true, ref: 'users'},
});

export const MessageModel = mongoose.model("Message", MessageScheme);

export const getMessages = () => MessageModel.find();
export const getMessageById = (id: string) => MessageModel.findById(id);
export const getMessagesByUserId = (userId: string) => MessageModel.find({ user_id: userId });
export const getMessagesByRoomId = (roomId: string) => MessageModel.find({ room_id: roomId });
export const createMessage = async (id: mongoose.Schema.Types.ObjectId, text: string, userId: string, roomId: string) => new MessageModel({ text, user_id: userId, room_id: roomId }).save().then(message => message.toObject());
export const deleteMessageById = (id: string) => MessageModel.findByIdAndDelete({ _id: id });

export const getMessagesByRoom = (roomId: string) => {MessageModel.find({room_id: roomId});}