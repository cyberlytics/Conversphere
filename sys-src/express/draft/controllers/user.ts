import { getUsers,getUserById,createUser,deleteUserById, getUserByNickname } from  "../db/user.js";
import { Express, Request, Response } from 'express';
import mongoose from 'mongoose';




export const createUser_ctr = async (req: Request, res: Response) => {
  try{
    const {nickname}=req.body;
    const user =await createUser(nickname);
    return res.status(200).json(user).end();
  }catch (err: any){
    console.log(err);
    return res.sendStatus(500);
}
};




export const getAllUsers = async (req:Request, res:Response) => {
  try{
    const users = await getUsers();
    return res.status(200).json(users).end();
}catch (err: any){
    console.log(err);
    return res.sendStatus(500);
}
};


export const deleteUserById_ctr = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
export const getUserbyId_ctr = async(req:Request, res:Response) => {
  try{
    const{id} =req.params;
    const user=await getUserById(id)
    return res.json(user);
    
  }catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
export const getUserByNickname_ctr = async(req:Request, res:Response) => {
  try{
    const{nickname} =req.params;
    const user=await getUserByNickname(nickname)
    return res.json(user);
    
  }catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}





