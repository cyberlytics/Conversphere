import { Namespace, Socket } from "socket.io";
import { userDisconnected } from "./socketController.js";
import { User } from "model/User.js";

interface UserLeftMessage{
  userId: string
  nickname: string
}

const connections: {[user_id: string]: Socket} = {}

function handleUsersNamespace(nsp: Namespace) : void {
  nsp.on("connection", (socket) => {
    const namespace = socket.nsp.name;
    if(/^\/ws\/rooms\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}\/users/.test(namespace)){
      // listen to events for user-actions (leave/join)
      if(typeof socket.handshake.query.user_id === 'string'){
        connections[socket.handshake.query.user_id] = socket;
        socket.on("leaveRoom", (message: UserLeftMessage) => {
          console.log("User disconnected with user-id " + message.userId + " and nickname " + message.nickname);
          // Get all the user for the room
          // TODO -> replace with correct value
          const users:User[] = [];
          users.push({id: 'asdfasdfasdfasdf', nickname: 'testUser1'})
          users.push({id: 'asdfasdfasdfasdf', nickname: 'testUser1'})
          users.push({id: 'asdfasdfasdfasdf', nickname: 'testUser1'})
          
          const user:User = {id: 'asdfasdf', nickname: 'asdf'}

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