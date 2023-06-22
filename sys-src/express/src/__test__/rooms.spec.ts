import * as Room from '../db/rooms.js';
import mongoose from 'mongoose';

describe('Room Functions', () => {
    beforeAll(async () => {
        // Connect to the MongoDB database
        await mongoose.connect("mongodb+srv://web_anwendung_projekt:W6aKJmOszJOj7Sw1@cluster0.i5kfluk.mongodb.net/?retryWrites=true&w=majority", {
        });
      });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await Room.Room.deleteMany({});
  });

  describe('getRooms', () => {
    it('should get all rooms', async () => {
      // Create sample rooms
      const room1 = new Room.Room({ name: 'Room 1', description: 'Description 1' });
      await room1.save();
      const room2 = new Room.Room({ name: 'Room 2', description: 'Description 2' });
      await room2.save();

      const rooms = await Room.getRooms();

      expect(rooms.length).toBe(2);
      expect(rooms[0].name).toBe('Room 1');
      expect(rooms[1].name).toBe('Room 2');
    });

    it('should return an empty array if no rooms exist', async () => {
      const rooms = await Room.getRooms();

      expect(rooms.length).toBe(0);
    });
  });

  describe('getRoomById', () => {
    it('should get a room by ID', async () => {
      const room = new Room.Room({ name: 'Room 1', description: 'Description 1' });
      await room.save();

      const foundRoom = await Room.getRoomById(room._id.toString());

      expect(foundRoom).toBeDefined();
      expect(foundRoom?.name).toBe('Room 1');
      expect(foundRoom?.description).toBe('Description 1');
    });

    it('should return null if no room is found', async () => {
      const foundRoom = await Room.getRoomById('nonexistent_id');

      expect(foundRoom).toBeNull();
    });
  });

  describe('getRoomByName', () => {
    it('should get a room by name', async () => {
      const room = new Room.Room({ name: 'Room 1', description: 'Description 1' });
      await room.save();

      const foundRoom = await Room.getRoomByName('Room 1');

      expect(foundRoom).toBeDefined();
      expect(foundRoom?.name).toBe('Room 1');
      expect(foundRoom?.description).toBe('Description 1');
    });

    it('should return null if no room is found', async () => {
      const foundRoom = await Room.getRoomByName('Nonexistent Room');

      expect(foundRoom).toBeNull();
    });
  });

  describe('getRoomByDescription', () => {
    it('should get a room by description', async () => {
      const room = new Room.Room({ name: 'Room 1', description: 'Description 1' });
      await room.save();

      const foundRoom = await Room.getRoomByDescription('Description 1');

      expect(foundRoom).toBeDefined();
      expect(foundRoom?.name).toBe('Room 1');
      expect(foundRoom?.description).toBe('Description 1');
    });

    it('should return null if no room is found', async () => {
      const foundRoom = await Room.getRoomByDescription('Nonexistent Description');

      expect(foundRoom).toBeNull();
    });
  });

  describe('deleteRoomById', () => {
    it('should delete a room by ID', async () => {
      const room = new Room.Room({ name: 'Room 1', description: 'Description 1' });
      await room.save();

      await Room.deleteRoomById(room._id.toString());

      const foundRoom = await Room.Room.findById(room._id);

      expect(foundRoom).toBeNull();
    });
  });

  describe('createRoomWithName', () => {
    it('should create a room with the given name and description', async () => {
      const name = 'New Room';
      const description = 'New Description';

      const createdRoom = await Room.createRoomWithName(name, description);

      expect(createdRoom).toBeDefined();
      expect(createdRoom.name).toBe(name);
      expect(createdRoom.description).toBe(description);

      const foundRoom = await Room.getRoomById(createdRoom._id.toString());

      expect(foundRoom).toBeDefined();
      expect(foundRoom?.name).toBe(name);
      expect(foundRoom?.description).toBe(description);
    });
  });

  describe('leaveRoomWithId', () => {
    it('should remove a user ID from a room', async () => {
      const room = new Room.Room({ name: 'Room 1', description: 'Description 1', users: ['user1', 'user2'] });
      await room.save();

      const updatedRoom = await Room.leaveRoomWithId(room._id.toString(), 'user1');

      expect(updatedRoom).toBeDefined();
      expect(updatedRoom.users).toEqual(['user2']);

      const foundRoom = await Room.getRoomById(room._id.toString());

      expect(foundRoom).toBeDefined();
      expect(foundRoom?.users).toEqual(['user2']);
    });
  });



  describe('getUsersByRoomId', () => {
    it('should get the list of user IDs in a room', async () => {
      const room = new Room.Room({ name: 'Room 1', description: 'Description 1', users: ['user1', 'user2'] });
      await room.save();

      const users = await Room.getUsersByRoomId(room._id.toString());

      expect(users).toEqual(['user1', 'user2']);
    });

    it('should return null if no room is found', async () => {
      const users = await Room.getUsersByRoomId('nonexistent_id');

      expect(users).toBeNull();
    });
  });


});
