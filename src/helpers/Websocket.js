import { io } from "socket.io-client";
// todo: wss for https
const socket = new io(process.env.WS_SERVER_URL || 'ws://localhost:4000/', { auth: {token: localStorage.getItem("token")}, autoConnect: false});

socket.on("connection", (n) => {
    console.log("num connected: ", n); // true
});

socket.on("event_state", (state) => {
    // we want to ask the server for the state of the "Event"
    console.log("New State: ", state); // true
});


socket.on("ready_state", (state) => {
    // we want to ask the server for the state of the "Event"
    console.log("New State: ", state); // true
});

socket.on("queued_match", (match) => {
    // we want to ask the server for a new peer to connect to
    console.log("New match: ", match); // true
});

socket.on("logout", (idk) => {
    console.log("idkkkk");
});


export {
    socket
}