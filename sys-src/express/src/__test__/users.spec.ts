import * as User from '../db/users.js';
import mongoose from 'mongoose';

describe('User Functions1', () => {
  beforeAll(async () => {
    // Connect to the MongoDB database
    await mongoose.connect("mongodb+srv://web_anwendung_projekt:W6aKJmOszJOj7Sw1@cluster0.i5kfluk.mongodb.net/?retryWrites=true&w=majority", {
    });
  });

  afterAll(async () => {
    // Disconnect from the MongoDB database
    await mongoose.disconnect();
  });

  afterEach(async () => {
    // Clear the User collection after each test
    await User.UserModel.deleteMany({});
  });

  describe('getUsers', () => {
    it('should get all users', async () => {
      // Create some mock users
      const oldusers = await User.getUsers();
      await User.createUser('Alice');
      await User.createUser('Bob');

      const users = await User.getUsers();
      expect(users.length).toBe(oldusers.length+2);
    });
  });

  describe('getUserById', () => {
    it('should get a user by ID', async () => {
      
      const newUser = await User.createUser('Alice');

      const user = await User.getUserById(newUser._id.toString());
      expect(user).toBeDefined();
      expect(user?.nickname).toBe('Alice');
    });


  });

  describe('getUserByNickname', () => {
    it('should get a user by nickname', async () => {
      
      await User.createUser('Alice');

      const user = await User.getUserByNickname('Alice');
      expect(user).toBeDefined();
      expect(user?.nickname).toBe('Alice');
    });

    it('should return null for non-existent nickname', async () => {
      const user = await User.getUserByNickname('nonexistent-nickname');
      expect(user).toBeNull();
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user by ID', async () => {
      
      const newUser = await User.createUser('Alice');

      await User.deleteUserById(newUser._id.toString());
      const user = await User.getUserById(newUser._id.toString());
      expect(user).toBeNull();
    });

  });

  describe('createUser', () => {
    it('should create a user with the given nickname', async () => {
      const user = await User.createUser('Alice');
      expect(user).toBeDefined();
      expect(user.nickname).toBe('Alice');
    });
  });

  describe('getAllUserNames', () => {
    it('should get all unique user nicknames', async () => {
      
      await User.createUser('Alice');
      await User.createUser('Bob');
      await User.createUser('Alice');

      const userNames = await User.getAllUserNames();
      expect(userNames.length).toBe(2);
      expect(userNames).toContain('Alice');
      expect(userNames).toContain('Bob');
    });
  });
});




describe('User Functions', () => {
  beforeAll(async () => {
    // Connect to the MongoDB database
    await mongoose.connect("mongodb+srv://web_anwendung_projekt:W6aKJmOszJOj7Sw1@cluster0.i5kfluk.mongodb.net/?retryWrites=true&w=majority", {
    });
  });

  afterAll(async () => {
    
    await mongoose.disconnect();
  });

  afterEach(async () => {
    
    await User.UserModel.deleteMany({});
  });

  describe('getUserById', () => {
    it('should get a user by ID', async () => {
      
      const newUser = await User.createUser('Alice');

      const user = await User.getUserById(newUser._id.toString());
      expect(user).toBeDefined();
      expect(user?.nickname).toBe('Alice');
    });


  });

  describe('getUserByNickname', () => {
    it('should get a user by nickname', async () => {
      
      await User.createUser('Alice');

      const user = await User.getUserByNickname('Alice');
      expect(user).toBeDefined();
      expect(user?.nickname).toBe('Alice');
    });

    it('should return null for non-existent nickname', async () => {
      const user = await User.getUserByNickname('nonexistent-nickname');
      expect(user).toBeNull();
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user by ID', async () => {

      const newUser = await User.createUser('Alice');

      await User.deleteUserById(newUser._id.toString());
      const user = await User.getUserById(newUser._id.toString());
      expect(user).toBeNull();
    });


  });

  describe('createUser', () => {
    it('should create a user with the given nickname', async () => {
      const user = await User.createUser('Alice');
      expect(user).toBeDefined();
      expect(user.nickname).toBe('Alice');
    });
  });

  describe('getAllUserNames', () => {
    it('should get all unique user nicknames', async () => {

      await User.createUser('Alice');
      await User.createUser('Bob');
      await User.createUser('Alice');

      const userNames = await User.getAllUserNames();
      expect(userNames.length).toBe(2);
      expect(userNames).toContain('Alice');
      expect(userNames).toContain('Bob');
    });
  });
});

