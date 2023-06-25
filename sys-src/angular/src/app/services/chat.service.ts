import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Socket, io } from "socket.io-client";
import { Message } from '../interfaces/messages';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private base_socket_endpoint = 'localhost:8080/ws/rooms'

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
    console.log('Setup socket connection for room: ' + roomId + ' and user: ' + user.nickname);
    const messagePath = this.base_socket_endpoint + '/' + roomId + '/messages';
    const usersPath = this.base_socket_endpoint + '/' + roomId + '/users';
    console.log('MessagePath: ' + messagePath);
    console.log('UsersPath: ' + usersPath);
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
    this.messages_socket?.emit('sendNewMessage', message);
  }

  /**
   * Sends a request to leave the chat-room.
   * @param user User who wants to leave the chat-room.
   */
  LeaveRoom(user: User): void{
    this.users_socket?.emit('leaveRoom', user);
  }

  /**
   *  Sends a request to update the user.
   *  @param user The user to update.
   */
  positionUpdate(user: User): void{
    this.users_socket?.emit('positionUpdate', user);
  }



  /**
   * Subscribes to the websocket chat to receive messages
   * @returns A Message Obejct everytime a new Message was received.
   * @see Message
   */
  InitMessagesSocket() : Subject<Message>{
    const messages = new Subject<Message>();

    this.messages_socket?.on('receiveNewMessage', (message: Message)=>{
     // console.log('Received a new message: '+ message.id + ' ' + message.text + ' ' + message.user_id + ' ' + message.visibility);

      messages.next(message);
    });
    return messages;
  }

  /**
   * Subscribes to the websocket chat to receive user updates
   * @returns A Users Obejct everytime a new User was received.
   * @see Users
   */
  InitUsersSocket() : Subject<User[]>{
    const userSubject = new Subject<User[]>();

    this.users_socket?.on('usersUpdate', (user: User[])=>{
      console.log('Users: '+user[0].id + ' ' + user[0].nickname + ' ' + user[0].position.x + ' ' + user[0].position.y);

      userSubject.next(user);
    });

    return userSubject;
  }
}
