import { socket } from './Websocket';

const constraints = {'video': true, 'audio': true};
const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}

// Listen for changes to media devices and update the list accordingly
navigator.mediaDevices.addEventListener('devicechange', event => {
    const newCameraList = getConnectedDevices('video');
    updateCameraList(newCameraList);
});

// Updates the select element with the provided set of cameras
function updateCameraList(cameras) {
    const listElement = document.querySelector('select#availableCameras');
    cameras.map(camera => {
        const cameraOption = document.createElement('option');
        cameraOption.label = camera.label;
        cameraOption.value = camera.deviceId;
    }).forEach(cameraOption => listElement.add(cameraOption));
}

// Fetch an array of devices of a certain type
async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === type)
}

async function playVideoFromCamera(matchId) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoElement = document.getElementById(`video-${matchId}`);
        videoElement.srcObject = stream;
    } catch(error) {
        // TODO: HANDLE NO video camera or mic found
        console.error('Error opening video camera.', error);
    }
}

async function makeCall() {
    const peerConnection = new RTCPeerConnection(configuration);
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.send({'offer': offer});
}


export {
    updateCameraList,
    getConnectedDevices,
    playVideoFromCamera,
    makeCall
} 