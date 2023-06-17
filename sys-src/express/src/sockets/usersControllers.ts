import { Namespace, Socket } from "socket.io";
import { userDisconnected } from "./socketController.js";
import { User } from "model/User.js";

import { getUserByNickname , createUser} from '../db/users.js'; 
import { getRooms , leaveRoomWithId, getUsersByRoomId} from '../db/rooms.js'; 
import { getAllRooms } from "controllers/rooms.js";
interface UserLeftMessage{
  userId: string
  nickname: string
}

const connections: {[user_id: string]: Socket} = {}

function handleUsersNamespace(nsp: Namespace) : void {
  nsp.on("connection", (socket:any) => {
    const namespace = socket.nsp.name;
    if(/^\/ws\/rooms\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}\/users/.test(namespace)){
      // listen to events for user-actions (leave/join)
      if(typeof socket.handshake.query.user_id === 'string'){
        connections[socket.handshake.query.user_id] = socket;
        socket.on("leaveRoom", async (message: UserLeftMessage) => {
          console.log("User disconnected with user-id " + message.userId + " and nickname " + message.nickname);
          
          // Get all the user for the room
          let room_id = "";
          const users:User[] = [];
          const all_rooms=  await getRooms();// get all the rooms
          for (const element of all_rooms) {//itterate through all the rooms
            if ("users" in element && element.users.includes(message.nickname)) { // find the user
              room_id=element.id; //get the id
              break;
            }

          leaveRoomWithId(room_id,message.userId ); // the fonction throw the user and update the users list

          let user_list=getUsersByRoomId(room_id);

          /*
          users.push({id: 'asdfasdfasdfasdf', nickname: 'testUser1'})
          users.push({id: 'asdfasdfasdfasdf', nickname: 'testUser1'})
          users.push({id: 'asdfasdfasdfasdf', nickname: 'testUser1'})
          
          const user:User = {id: 'asdfasdf', nickname: 'asdf'}
             */

          users.filter(x => x.id != message.userId).forEach((user)=>{
            const connection = connections[user.id];
            if(connection){
              connection.emit('userLeft', user);
            }else{
              console.warn('Not able to find connection for user: ' + user.id);
            }
          });

          // TODO: Get room-id
          userDisconnected('asdfasdf', user);
        });
      }else{
        console.error('User-Id was not included in the connection-attempt. Disconnecting socket.')
        socket.disconnect();
      }
    }
  });
}

export {handleUsersNamespace, connections};