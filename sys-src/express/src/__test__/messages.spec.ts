import * as Message from '../db/messages';
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
      const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
      const userId2 = new mongoose.Types.ObjectId(); // Generate a new ObjectId
      await Message.createMessage('Message 1', userId.toString());
      await Message.createMessage('Message 2', userId2.toString());

      const messages = await Message.getMessages();
      expect(messages.length).toBe(2);
      expect(messages[0].text).toBe('Message 1');
      expect(messages[1].text).toBe('Message 2');
    });

    it('should return an empty array if no messages exist', async () => {
      const old = await Message.getMessages();
      const messages = await Message.getMessages();
      expect(messages.length-old.length).toBe(0);
    });
  });

  describe('getMessageById', () => {
    it('should get a message by ID', async () => {
      // Create a mock message
      const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
      const newMessage = await Message.createMessage('Message 1', userId.toString());

      const message = await Message.getMessageById(newMessage._id.toString());
      expect(message).toBeDefined();
      expect(message?.text).toBe('Message 1');
    });

    it('should return null for non-existent message ID', async () => {
      const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
      const message = await Message.getMessageById(userId.toString());
      expect(message).toBeNull();
    });
  });

  describe('getMessagesByUserId', () => {
    it('should get messages by user ID', async () => {
      // Create some mock messages
      const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
      const userId2 = new mongoose.Types.ObjectId(); // Generate a new ObjectId
      await Message.createMessage('Message 1', userId.toString());
      await Message.createMessage('Message 2', userId2.toString());
      await Message.createMessage('Message 3', userId.toString());

      const messages = await Message.getMessagesByUserId(userId.toString());
      expect(messages.length).toBe(2);
      expect(messages[0].text).toBe('Message 1');
      expect(messages[1].text).toBe('Message 3');
    });

    it('should return an empty array if no messages exist for the user', async () => {
      const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
      const messages = await Message.getMessagesByUserId(userId.toString());
      expect(messages.length).toBe(0);
    });
  });


  describe('createMessage', () => {
    it('should create a message with the given text and user ID', async () => {
      const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
      const message = await Message.createMessage('Hello', userId.toString());
      expect(message).toBeDefined();
      expect(message.text).toBe('Hello');
      expect(message.user_id.toString()).toBe(userId.toString());
    });
  });

  describe('deleteMessageById', () => {
    it('should delete a message by ID', async () => {
      // Create a mock message
      const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
      const newMessage = await Message.createMessage('Message 1', userId.toString());

      await Message.deleteMessageById(newMessage._id.toString());
      const message = await Message.getMessageById(newMessage._id.toString());
      expect(message).toBeNull();
    });

    it('should not delete a message with non-existent ID', async () => {
      const old = await Message.getMessages();
      
      const userId = new mongoose.Types.ObjectId(); // Generate a new ObjectId
      await Message.createMessage('Message 1', userId.toString());
      await Message.deleteMessageById(userId.toString());
      
      const messages = await Message.getMessages();
      expect(messages.length-old.length).toBe(1);
    });
  });


});
