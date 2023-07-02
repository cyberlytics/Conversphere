// Import des dépendances nécessaires
import { Request, Response } from 'express';
import { getAllRooms, joinRoom,createRoom } from '../controllers/rooms';
import { getRooms,getRoomById , joinRoomWithId,createRoomWithName,getRoomByDescription } from '../db/rooms';
//import { getUserByNickname, createUser  } from '../db/users';
import * as Rooms from '../db/rooms';
import mongoose from 'mongoose';

// Mock de la fonction getRooms
jest.mock('../db/rooms', () => ({
  getRooms: jest.fn(),
  getRoomById: jest.fn(),
  createRoomWithName: jest.fn(),
  getRoomByDescription: jest.fn()
}));

describe('getAllRooms', () => {

  it('should return all rooms', async () => {
    // Définir le comportement du mock getRooms
    const mockRooms = [
      { _id: '1', name: 'Room 1', description: 'Description 1', users: ['user1', 'user2'] },
      { _id: '2', name: 'Room 2', description: 'Description 2', users: ['user3', 'user4'] }
    ];
    (getRooms as jest.Mock).mockResolvedValue(mockRooms);

    // Mock des objets Request et Response
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn()
    } as unknown as Response;

    // Appeler la fonction getAllRooms
    await getAllRooms(req, res);

    // Vérifier les résultats attendus
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: '1', name: 'Room 1', description: 'Description 1', users: ['user1', 'user2'] },
      { id: '2', name: 'Room 2', description: 'Description 2', users: ['user3', 'user4'] }
    ]);
    expect(res.end).toHaveBeenCalled();
  });

  it('should return status 400 if getRooms throws an error', async () => {
    (getRooms as jest.Mock).mockRejectedValue(new Error('Some error'));
    const req = {} as Request;
    const res = {
      sendStatus: jest.fn()
    } as unknown as Response;
    await getAllRooms(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(400);
  });







  it('should join a room and return user information', async () => {
    // Mock data
    const userid= new mongoose.Types.ObjectId()
    const mockRequest1 = {
      body: {
        room_id: userid.toString(),
        nickname: 'JohnDoe',
      },
    } as Request;

    const mockResponse1 = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response;

    // Call the function
    await joinRoom(mockRequest1, mockResponse1);
    expect(mockResponse1.status).toHaveBeenCalledWith(400);
    expect(mockResponse1.end).toHaveBeenCalled();
  });


  it('should create a room and return its details', async () => {
    const mockRequest1 = {
        body: {
          name: 'Room 1',
          description: 'Description 1',
        },
      } as Request;

    const mockResponse1 ={
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn(),
    }as unknown as Response;

    await createRoom(mockRequest1, mockResponse1);

    expect(mockResponse1.status).toHaveBeenCalledWith(200);
    expect(mockResponse1.end).toHaveBeenCalled();
  });

});

