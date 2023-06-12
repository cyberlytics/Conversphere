import { Message } from "model/Message.js";
import { User } from "model/User.js";
import { Namespace, Socket } from "socket.io";

const connections: {[user_id: string]: Socket} = {}

function handleMessagesNamespace(nsp: Namespace) : void{
  nsp.on("connection", (socket) => {
    const namespace = socket.nsp.name;
    // Change the handlers based on the namespaces
    if(/^\/ws\/rooms\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}\/messages/.test(namespace)){
      // listen to events for messages
      if(typeof socket.handshake.query.user_id === 'string'){
        connections[socket.handshake.query.user_id] = socket;
        socket.on("sendNewMessage", (message: Message) => {
          console.log("Received a new message from User " + message.user_id + ": " + message.text);
          // Get all the user for the room
          // TODO -> replace with correct value
          const users:User[] = [];
          users.push({id: 'asdfasdfasdfasdf', nickname: 'testUser1'})
          users.push({id: 'asdfasdfasdfasdf', nickname: 'testUser1'})
          users.push({id: 'asdfasdfasdfasdf', nickname: 'testUser1'})
          
          users.filter(x => x.id != message.user_id).forEach((user)=>{
            const connection = connections[user.id];
            if(connection){
              connection.emit('receivedMessage', message);
            }else{
              console.warn('Not able to find connection for user: ' + user.id);
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


export {handleMessagesNamespace, connections};