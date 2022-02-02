import { io } from "socket.io-client";
// todo: wss for https
var socket = null;

function createWebsocket() {
    socket = new io(process.env.WS_SERVER_URL || 'ws://localhost:4000/ws/', { auth: {token: localStorage.getItem("token")} });

    socket.on("connect", () => {
        // we want to ask the server for the state of the "Event"
        console.log(socket.connected); // true
    });
    
    socket.on("event_state", (state) => {
        // we want to ask the server for the state of the "Event"
        console.log("New State: ", state); // true
    });
    
    socket.on("queued_match", (match) => {
        // we want to ask the server for a new peer to connect to
        console.log("New match: ", match); // true
    });
}






export {
    createWebsocket,
    socket
}