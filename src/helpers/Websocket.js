import { io } from "socket.io-client";
// todo: wss for https
var socket = null;

function createWebsocket(setCount) {
    socket = new io(process.env.WS_SERVER_URL || 'ws://localhost:4000/', { auth: {token: localStorage.getItem("token"), } });
    // socket.onAny((event, ...args) => {
    //     console.log(event, args);
    //     console.log("shit")
    // });

    socket.on("connection", (n) => {
        // we want to ask the server for the state of the "Event"
        console.log("whoaaaaa");
        console.log("num connected: ", n); // true
        setCount(n);
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