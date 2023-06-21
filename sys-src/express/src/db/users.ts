import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nickname: {type: String, required: true},
    position: {type: {x: { type: Number, required: false },y: { type: Number, required: false }},required: false}
});

export const UserModel = mongoose.model("User", UserSchema);

//
export const getUsers = () => UserModel.find();
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserByNickname = (nickname: string) => UserModel.findOne({nickname});
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete({_id: id});
export const createUser = async (nickname: string) => new UserModel({nickname}).save().then((user) => user.toObject());

export const getAllUserNames = () => UserModel.find().distinct('nickname').exec();




