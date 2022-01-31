// Create WebSocket connection.
// todo: wss for https
const socket = new WebSocket('ws://localhost:4000/ws/auth?token=blahblah');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
// socket.addEventListener('message', async message => {
//     console.log('Message from server ', message);
//     if (message.answer) {
//         const remoteDesc = new RTCSessionDescription(message.answer);
//         await peerConnection.setRemoteDescription(remoteDesc);
//     } else if(message.offer) {
//         peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
//         const answer = await peerConnection.createAnswer();
//         await peerConnection.setLocalDescription(answer);
//         socket.send({'answer': answer});
//     }
// });

export {
    socket
}