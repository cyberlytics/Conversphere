import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Socket, io } from "socket.io-client";
import { Message } from '../interfaces/messages';
import { User, Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private base_socket_endpoint = 'localhost:8080/ws'

  messages_socket: Socket | undefined;
  users_socket: Socket | undefined;

  constructor() {  
    this.messages_socket = undefined;
    this.users_socket = undefined;
  }

  /**
   * Initalizes the socket-connection with the backend.
   * @param roomId The ID for the chat-room.
   * @param user The user object joining the room
   * @returns The subject for the Messages and the Users of the chat-room.
   */
  setupSocketConnection(roomId: string, user: User) {
    // Create sockets
    const messagePath = this.base_socket_endpoint + '/' + roomId + '/messages';
    const usersPath = this.base_socket_endpoint + '/' + roomId + '/users';
    this.messages_socket = io(messagePath, {query: {user_id: user.id}});
    this.users_socket = io(usersPath, {query: {user_id: user.id}});
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

  InitMessagesSocket() : Subject<Message>{
    const messages = new Subject<Message>();

    this.messages_socket?.on('receivedMessage', (message: Message)=>{
      console.log('Received a new message: ');
      console.log(message);
      // Add the new message to the saved messages
      
      messages.next(message);
    });
    return messages;
  }

  InitUsersSocket() : Subject<Users>{
    const userSubject = new Subject<Users>();

    this.users_socket?.on('userChanged', (users: Users)=>{
      console.log('New user array received! ');
     // console.log(user);
     userSubject.next(users);
    });

    
    return userSubject;
  }
}