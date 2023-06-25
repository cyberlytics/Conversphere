import { Namespace, Socket } from "socket.io";
import { getUserForRoom, userDisconnected } from "./socketController";

import { deleteRoomById, updateRoomWithId} from '../db/rooms'; 

interface UserLeftMessage{
  userId: string
  nickname: string
}

const usr_connections: {[user_id: string]: Socket} = {}

function handleUsersNamespace(nsp: Namespace) : void {
  nsp.on("connection", async (socket:Socket) => {
    const namespace = socket.nsp.name;
    if(/^\/ws\/rooms\/[0-9a-fA-F]{24}\/users/.test(namespace)){
      // listen to events for user-actions (leave/join)
      if(typeof socket.handshake.query.user_id === 'string'){
        usr_connections[socket.handshake.query.user_id] = socket;
        socket.on("userUpdate", async (message: UserLeftMessage) => {
          console.log("User disconnected with user-id " + message.userId + " and nickname " + message.nickname);
          
          // Get all the user for the room
          const room_id = namespace.slice("/ws/rooms/".length, -("/users".length));
          // remove the user from the room
          await updateRoomWithId(room_id,message.userId);

          // Update the socket-lists
          // userDisconnected(message.userId);

          // Send update to all participants in the room and if the room is now empty -> delete the room
          await updateUserListForRoom(room_id);
        });

        // send a notification to the users in the room with the updated user-list
        const room_id = namespace.slice("/ws/rooms/".length, -("/users".length));
        updateUserListForRoom(room_id);
      }else{
        console.error('User-Id was not included in the connection-attempt. Disconnecting socket.')
        socket.disconnect();
      }
    }
  });
}

/**
 * Sends a update to all the users in the room with the updated user-list.
 * @param roomId The room for the updates.
 */
async function updateUserListForRoom(roomId: string){
  const users = await getUserForRoom(roomId);
  if(users.length > 0){
    users.forEach(user => {
      // Get connection for user
      const connection = usr_connections[user.id];
      if(connection){
        connection.emit('usersUpdate', users);
      }else{
        console.warn('Not able to find connection for user: ' + user.id);
      }
    })
  }else{
    console.warn('Not able to retrieve users for the room: ' + roomId + ' Deleting room...');
    deleteRoomById(roomId);
  }
}

export {handleUsersNamespace, usr_connections};