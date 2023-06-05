import { Namespace } from "socket.io";

interface UserLeftMessage{
  userId: string
  nickname: string
}  

function handleUsersNamespace(nsp: Namespace) : void {
  nsp.on("connection", (socket) => {
    const namespace = socket.nsp.name;
    if(/^\/ws\/rooms\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}\/users/.test(namespace)){
      // listen to events for user-actions (leave/join)
      socket.on("leaveRoom", (message: UserLeftMessage) => {
        console.log("User disconnected with user-id " + message.userId + " and nickname " + message.nickname);
      });
    }
  });
}

export {handleUsersNamespace};