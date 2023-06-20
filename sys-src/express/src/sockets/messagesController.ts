import { createMessage } from "./../db/messages.js";
import { getUsersByRoomId } from "./../db/rooms.js";
import { getUserById } from "./../db/users.js";
import { Message } from "./../model/Message.js";
import { User } from "./../model/User.js";
import { Namespace, Socket } from "socket.io";
import { getUserForRoom } from "./socketController.js";

const msg_connections: {[user_id: string]: Socket} = {}

interface MessageMessage{
  text: string,
  user_id: string
}

function handleMessagesNamespace(nsp: Namespace) : void{
  nsp.on("connection", (socket) => {
    const namespace = socket.nsp.name;
    // Change the handlers based on the namespaces
    if(/^\/ws\/rooms\/[0-9a-fA-F]{24}\/messages/.test(namespace)){
      // listen to events for messages
      if(typeof socket.handshake.query.user_id === 'string'){
        msg_connections[socket.handshake.query.user_id] = socket;
        socket.on("sendNewMessage", async (msg: MessageMessage) => {
          console.log("Received a new message from User " + msg.user_id + ": " + msg.text);
          // Get all the user for the room
          const roomId = namespace.slice("/ws/rooms/".length, -("/messages".length));
          const users = await getUserForRoom(roomId);
            
          // Now calculate the visibility of the message based on the position
          // Do not send the message back to the sender
          const sender = users.find(x => x?.id == msg.user_id);
          users.forEach(async x => {
            if(x && x.id != sender?.id){
              // TODO -> Dynamic calculation
              const visibility = 100;
              const db_message = await createMessage(msg.text, msg.user_id, roomId)
              const message = {
                id: db_message._id.toString(),
                text: db_message.text,
                user_id: db_message.user_id.toString(),
                visibility: visibility 
              } as Message;
              
              // emit message via socket
              const connection = msg_connections[x.id]
              if(connection){
                connection.emit('receiveNewMessage', message);
              }else{
                console.warn('Not able to find connection for user: ' + x.id);
              }
            }
          });
        });
      }else{
        console.error('User-Id was not included in the connection-attempt. Disconnecting socket.')
        socket.disconnect();
      }
    }
  }); 
}


export {handleMessagesNamespace, msg_connections };