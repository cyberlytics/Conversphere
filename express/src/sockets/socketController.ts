import { Namespace, Server } from "socket.io";
import { handleMessagesNamespace } from "./messagesController.js";
import { handleUsersNamespace } from "./usersControllers.js";


function checkNamespaces(io: Server) : Namespace {
  return io.of((name, auth, next) => 
  {
    // Check if namespace for messages
    if(/^\/ws\/rooms\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}\/messages/.test(name)){
      // Check if valid room id
      const roomId = name.slice("/ws/rooms/".length, -("/messages".length));
      if(roomId != ""){ // TODO: Check if there is a room with this ID
        console.log("Connection established for topic messages and room-id: " + roomId);
        next(null, true);
      }else{
        next(null, false);
      }
    }else if(/^\/ws\/rooms\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}\/users/.test(name)){
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

export {handleNamespaces, checkNamespaces};