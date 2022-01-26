// Create WebSocket connection.
// todo: wss for https
const socket = new WebSocket('ws://localhost:4000/ws');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

export {
    socket
}