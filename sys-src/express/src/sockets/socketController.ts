import { Namespace, Server } from "socket.io";
import { handleMessagesNamespace, msg_connections } from "./messagesController.js";
import { handleUsersNamespace, usr_connections } from "./usersControllers.js";
import { User } from "./../model/User.js";
import { getUsersByRoomId } from "./../db/rooms.js";
import { getUserById } from "./../db/users.js";

function checkNamespaces(io: Server) : Namespace {
  return io.of((name, auth, next) => 
  {
    console.log('Socket connection attempt to namespace: ' + name);
    // Check if namespace for messages
    //if(/^\/ws\/rooms\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}\/messages/.test(name)){
    if(/^\/ws\/rooms\/[0-9a-fA-F]{24}\/messages/.test(name)){
      // Check if valid room id
      const roomId = name.slice("/ws/rooms/".length, -("/messages".length));
      if(roomId != ""){ // TODO: Check if there is a room with this ID
        console.log("Connection established for topic messages and room-id: " + roomId);
        next(null, true);
      }else{
        next(null, false);
      }
    }else if(/^\/ws\/rooms\/[0-9a-fA-F]{24}\/users/.test(name)){
      // Check if valid room id
      const roomId = name.slice("/ws/rooms/".length, -("/users".length));
      if(roomId != ""){ // TODO: Check if there is a room with this ID
        console.log("Connection established for topic users and room-id: " + roomId);
        next(null, true);
      }else{
        next(null, false);
      }
    }else{
      // not a valid namespace
      next(null, false);
    }
  });
}

function handleNamespaces(nsp: Namespace) : void{
 handleMessagesNamespace(nsp);
 handleUsersNamespace(nsp);
}

function userDisconnected(user_id: string): void{
  if(usr_connections[user_id]){
    usr_connections[user_id].disconnect()
    delete usr_connections[user_id]
  }
  if(msg_connections[user_id]){
    msg_connections[user_id].disconnect()
    delete msg_connections[user_id]
  }
}

/**
 * Get all the user for a given chat-room.
 * @param roomId Id for the room.
 * @returns All the User in the given room.
 */
async function getUserForRoom(roomId: string) : Promise<User[]>{
  // get the updated user-list from the room
  const user_ids = await getUsersByRoomId(roomId);

  console.log('Found following user_ids: ' + user_ids);

  if(user_ids){
    // Get the complete user-information
    const users = await Promise.all(user_ids.map(async id =>{
      const user = await getUserById(id.toString());
      if(user){
        return ({
          id: user.id,
          nickname: user.nickname,
          position:{
            x: user.position?.x ?? 0,
            y: user.position?.y ?? 0
          }
        } as User);
      }
    })) as User[];
    return users;
  }
  return [];
}

export {handleNamespaces, checkNamespaces, userDisconnected, getUserForRoom};