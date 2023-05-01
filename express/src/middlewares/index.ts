import express from 'express';
import pkg from 'lodash';
const { get, merge } = pkg;
import { getUserBySessionToken } from '../db/users.js';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const token = req.cookies['WAE-AUTH-TOKEN'];
        if (!token) {
            return res.sendStatus(403);
        }
        const user = await getUserBySessionToken(token);
        if (!user) {
            return res.sendStatus(403);
        }
        
        merge(req, {identity: user});

        return next();
    }catch (err: any){
        console.log(err);
        return res.sendStatus(500);
    }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { id } = req.params;
      const currentUserId = get(req, 'identity._id') as unknown as string;
  
      if (!currentUserId) {
        return res.sendStatus(400);
      }
  
      if (currentUserId.toString() !== id) {
        return res.sendStatus(403);
      }
  
      next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }