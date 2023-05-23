import express from 'express';

export const info  = async (req: express.Request, res: express.Response) => {
    try{
        console.log('info, req.body', req.body);
        const message = "this is a express server";
        return res.status(200).json(message).end();
    }catch (err: any){
        console.log(err);
        return res.sendStatus(500);
    }
};