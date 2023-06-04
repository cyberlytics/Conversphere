import { Namespace } from "socket.io";

interface Message{
    userId: string
    text: string
}  

function handleMessagesNamespace(nsp: Namespace) : void{
  nsp.on("connection", (socket) => {
    const namespace = socket.nsp.name;
    // Change the handlers based on the namespaces
    if(/^\/ws\/rooms\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}\/messages/.test(namespace)){
      // listen to events for messages
      socket.on("sendNewMessage", (message: Message) => {
        console.log("Received a new message from User " + message.userId + ": " + message.text);
      });
    }
});  

}


export {handleMessagesNamespace};