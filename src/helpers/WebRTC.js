import { socket } from './Websocket';
const constraints = {'video': true, 'audio': true};
const configuration = {'iceServers': [{'urls': ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']}]}
const peerConnection = new RTCPeerConnection(configuration);

let remoteStream = null; 
let localStream = null;
let localVideo = null;
let remoteVideo = null;

async function createOffer() {
    console.log("offer sent!")
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", {"offer": offer});
};

socket.on("offer", async (message) => {
    if(message.answer) {
        console.log("answer recieved: ", message.answer);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(message.answer));
    } else if (message.offer) {
        console.log("offer recieved")
        peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("offer", {'answer': answer});
    }
});

peerConnection.onicecandidate = e => {
    if (e.candidate) {
        console.log("sent ice candidate.");
        socket.emit('new_ice_candidate', e.candidate);
    }
};

// Listen for remote ICE candidates and add them to the local RTCPeerConnection
socket.on('remote_ice_candidate', async candidate => {
    if (candidate) {
        try {
            console.log("added remote ice candidate.");
            await peerConnection.addIceCandidate(candidate);
        } catch (e) {
            console.error('Error adding received ice candidate', e);
        }
    }
});

peerConnection.onconnectionstatechange = e => {
    if (peerConnection.connectionState === 'connected') {
        console.log("peers connected!!+*");
    }
};


// Fetch an array of devices of a certain type
async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === type)
}

////////////////////////////
async function playVideo(match) {
    try {
        localStream = await navigator.mediaDevices.getUserMedia(constraints);
        remoteStream = new MediaStream();
        localVideo = document.getElementById(`localVideo-${match}`);
        remoteVideo = document.getElementById(`remoteVideo-${match}`);

        localStream.getTracks().forEach((t) => {
            peerConnection.addTrack(t, localStream);
        });

        peerConnection.ontrack = event => {
            console.log("peerConnection ontrack: ", event);
            remoteVideo.srcObject = event.streams[0];
        };


        localVideo.srcObject = localStream;
        remoteVideo.srcObject = remoteStream;

    } catch(e) { console.error('Error opening video camera.', e) }
}

/////////////////////////////


export {
    getConnectedDevices,
    createOffer,
    playVideo,
    peerConnection,
} 