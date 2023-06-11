import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Socket, io } from "socket.io-client";
import { Message, Messages } from '../interfaces/messages';
import { User, Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private base_socket_endpoint = 'localhost:8080/ws'

  messages_socket: Socket | undefined;
  users_socket: Socket | undefined;

  messages: Messages;
  users: Users;


  constructor() {  
    this.messages_socket = undefined;
    this.users_socket = undefined;
    this.messages = {messages: []};
    this.users = {users: []};
  }

  /**
   * Initalizes the socket-connection with the backend.
   * @param roomId The ID for the chat-room.
   * @param user The user object joining the room
   * @returns The subject for the Messages and the Users of the chat-room.
   */
  setupSocketConnection(roomId: string, user: User) : {messages: BehaviorSubject<Messages>, users: BehaviorSubject<Users>} {
    // Create sockets
    const messagePath = this.base_socket_endpoint + '/' + roomId + '/messages';
    const usersPath = this.base_socket_endpoint + '/' + roomId + '/users';
    this.messages_socket = io(messagePath, {query: {user_id: user.id}});
    this.users_socket = io(usersPath, {query: {user_id: user.id}});
    
    // initalize sockets
    const messagesSubject = this.initMessagesSocket();
    const usersSubject = this.initUsersSocket();

    return {messages: messagesSubject, users: usersSubject};
  }

  /**
   * Closes the socket-connections.
   */
  closeSocketConnection(){
    this.messages_socket?.close();
    this.messages_socket = undefined;
    this.users_socket?.close();
    this.users_socket = undefined;
  }

  /**
   * Sends a new message to the chat-room.
   * @param message The message to send.
   */
  SendMessage(message: Message): void{
    this.messages_socket?.emit('sendMessage', message);
  }

  /**
   * Sends a request to leave the chat-room.
   * @param user User who wants to leave the chat-room.
   */
  LeaveRoom(user: User): void{
    this.users_socket?.emit('leaveRoom', user);
  }

  private initMessagesSocket() : BehaviorSubject<Messages>{
    const messages = new BehaviorSubject<Messages>(this.messages);

    this.messages_socket?.on('receivedMessage', (message: Message)=>{
      console.log('Received a new message: ');
      console.log(message);
      // Add the new message to the saved messages
      this.messages.messages.push(message);
      messages.next(this.messages);
    });
    return messages;
  }

  private initUsersSocket() : BehaviorSubject<Users>{
    const users = new BehaviorSubject<Users>(this.users);
    this.users_socket?.on('userJoined', (user: User)=>{
      console.log('New user connected to chat-room: ');
      console.log(user);
      // Add the user
      this.users.users.push(user);
      users.next(this.users);
    });
    this.users_socket?.on('userLeft', (user: User) => {
      console.log('User disconnected from chat-room: ');
      console.log(user);
      // Remove the user from the saved users
      const idx = this.users.users.indexOf(user);
      if(idx > -1){
        this.users.users.splice(idx, 1);
        users.next(this.users);
      }else{
        // not able to find the value
        console.error('Disconnected user not found.');
      }
    });
    return users;
  }
}