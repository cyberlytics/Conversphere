import express from 'express';

export const getAllRooms  = async (req: express.Request, res: express.Response) => {
    try{
        const rooms = [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                name: "Room 1",
                description: "Mocked room index 0",
                userIds: [
                    {
                        userId: "8604bfd2-98f0-4fff-bc78-e9665fba2af2"
                    },
                    {
                        userId: "1f632323-8098-4765-b0bf-84365efdb5e3"
                    }
                ]
            },
            {
                id: "00bab858-96ea-4e80-be16-95e8a84ae5ee",
                name: "Room 2",
                description: "Mocked room index 1",
                userIds: [
                    {
                        userId: "7d2aadd8-071a-4075-b226-e218a4c37ca5"
                    },
                    {
                        userId: "d810ac55-1616-43c1-8e2b-4e0066c902e2"
                    }
                ]
            },
            {
                id: "5dfc1a13-e0db-402a-9743-43fd17efb742",
                name: "Room 2",
                description: "Mocked room index 1",
                userIds: [
                    {
                        userId: "7deaf4b7-ab11-4c6c-a4dc-0ada8b0a1e33"
                    },
                    {
                        userId: "d727f22d-adb8-4961-a4d7-716f40919c64"
                    }
                ]
            },
            
        ]
        console.log("Request for all rooms.");
        return res.status(200).json(rooms).end();
    }catch (err: any){
        console.log(err);
        return res.sendStatus(500);
    }
};

export const joinRoom  = async (req: express.Request, res: express.Response) => {
    try{
        const {room_id, nickname} = req.body;
        console.log("Request to join room(" + room_id + ") with nickname: " + nickname);
        const user = {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            nickname: nickname
        }
        return res.status(200).json(user).end();
    }catch (err: any){
        console.log(err);
        return res.sendStatus(500);
    }
};