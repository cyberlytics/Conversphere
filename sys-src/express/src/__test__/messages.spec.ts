import * as Message from '../db/messages.js';
import mongoose from 'mongoose';

describe('Message Functions', () => {
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
    // Clear the Message collection after each test
    await Message.MessageModel.deleteMany({});
  });

  describe('getMessages', () => {
    it('should get all messages', async () => {
      // Create some mock messages
      await Message.createMessage('Message 1', 'user1');
      await Message.createMessage('Message 2', 'user2');

      const messages = await Message.getMessages();
      expect(messages.length).toBe(2);
      expect(messages[0].text).toBe('Message 1');
      expect(messages[1].text).toBe('Message 2');
    });

    it('should return an empty array if no messages exist', async () => {
      const messages = await Message.getMessages();
      expect(messages.length).toBe(0);
    });
  });

  describe('getMessageById', () => {
    it('should get a message by ID', async () => {
      // Create a mock message
      const newMessage = await Message.createMessage('Message 1', 'user1');

      const message = await Message.getMessageById(newMessage._id.toString());
      expect(message).toBeDefined();
      expect(message?.text).toBe('Message 1');
    });

    it('should return null for non-existent message ID', async () => {
      const message = await Message.getMessageById('nonexistent-id');
      expect(message).toBeNull();
    });
  });

  describe('getMessagesByUserId', () => {
    it('should get messages by user ID', async () => {
      // Create some mock messages
      await Message.createMessage('Message 1', 'user1');
      await Message.createMessage('Message 2', 'user2');
      await Message.createMessage('Message 3', 'user1');

      const messages = await Message.getMessagesByUserId('user1');
      expect(messages.length).toBe(2);
      expect(messages[0].text).toBe('Message 1');
      expect(messages[1].text).toBe('Message 3');
    });

    it('should return an empty array if no messages exist for the user', async () => {
      const messages = await Message.getMessagesByUserId('nonexistent-user');
      expect(messages.length).toBe(0);
    });
  });

  describe('getMessagesByRoomId', () => {
    it('should get messages by room ID', async () => {
      // Create some mock messages
      await Message.createMessage('Message 1', 'user1');
      await Message.createMessage('Message 2', 'user2');
      await Message.createMessage('Message 3', 'user1');

      const messages = await Message.getMessagesByRoomId('room1');
      expect(messages.length).toBe(1);
      expect(messages[0].text).toBe('Message 3');
    });

    it('should return an empty array if no messages exist for the room', async () => {
      const messages = await Message.getMessagesByRoomId('nonexistent-room');
      expect(messages.length).toBe(0);
    });
  });

  describe('createMessage', () => {
    it('should create a message with the given text and user ID', async () => {
      const message = await Message.createMessage('Hello', 'user1');
      expect(message).toBeDefined();
      expect(message.text).toBe('Hello');
      expect(message.user_id).toBe('user1');
    });
  });

  describe('deleteMessageById', () => {
    it('should delete a message by ID', async () => {
      // Create a mock message
      const newMessage = await Message.createMessage('Message 1', 'user1');

      await Message.deleteMessageById(newMessage._id.toString());
      const message = await Message.getMessageById(newMessage._id.toString());
      expect(message).toBeNull();
    });

    it('should not delete a message with non-existent ID', async () => {
      await Message.createMessage('Message 1', 'user1');

      await Message.deleteMessageById('nonexistent-id');
      const messages = await Message.getMessages();
      expect(messages.length).toBe(1);
    });
  });


});
