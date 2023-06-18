import { Namespace, Socket } from "socket.io";
import { userDisconnected } from "./socketController.js";
import { User } from "model/User.js";

import { getUserById} from '../db/users.js'; 
import { getRooms , leaveRoomWithId, getUsersByRoomId} from '../db/rooms.js'; 

interface UserLeftMessage{
  userId: string
  nickname: string
}

const usr_connections: {[user_id: string]: Socket} = {}

function handleUsersNamespace(nsp: Namespace) : void {
  nsp.on("connection", (socket:any) => {
    const namespace = socket.nsp.name;
    if(/^\/ws\/rooms\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}\/users/.test(namespace)){
      // listen to events for user-actions (leave/join)
      if(typeof socket.handshake.query.user_id === 'string'){
        usr_connections[socket.handshake.query.user_id] = socket;
        socket.on("leaveRoom", async (message: UserLeftMessage) => {
          console.log("User disconnected with user-id " + message.userId + " and nickname " + message.nickname);
          
          // Get all the user for the room
          const room_id = namespace.slice("/ws/rooms/".length, -("/users".length));
          // remove the user from the room
          leaveRoomWithId(room_id,message.userId);

          // get the updated user-list from the room
          const user_ids = await getUsersByRoomId(room_id);

          if(user_ids){
              // Get the complete user-information
              const users = user_ids.map(async id =>{
                const user = await getUserById(id);
                if(user){
                  return ({
                    id: user.id,
                    nickname: user.nickname,
                    position:{
                      x: user.position.x,
                      y: user.position.y
                    }
                  } as User);
                }
              });
              user_ids.forEach((user) => {
                const connection = usr_connections[user];
                if(connection){
                  connection.emit('usersUpdate', users);
                }else{
                  console.warn('Not able to find connection for user: ' + user);
                }    
              });

              // Send every user in the room the new user-list
              users.filter(x => x.id != message.userId).forEach((user)=>{
                const connection = usr_connections[user.id];
                if(connection){
                  connection.emit('userLeft', user);
                }else{
                  console.warn('Not able to find connection for user: ' + user.id);
                }
              });

          }else{
            console.warn('Not able to retrieve the users for the room: ' + room_id);
          }

          // Update the socket-lists
          userDisconnected(room_id, message.userId);
        });
      }else{
        console.error('User-Id was not included in the connection-attempt. Disconnecting socket.')
        socket.disconnect();
      }
    }
  });
}

export {handleUsersNamespace, usr_connections};