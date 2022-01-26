import React, { useState, useEffect } from "react";
import {updateCameraList, getConnectedDevices, playVideoFromCamera}  from '../helpers/WebRTC';
import WsExample from "./WsExample";

function SwipePage() {

    useEffect(async () => {
        const videoCameras = await getConnectedDevices('videoinput');
        updateCameraList(videoCameras);
    },[]);

    playVideoFromCamera();

    return (
        <div>
            <video id="localVideo" autoPlay playsInline controls={false}/>
            <WsExample />
        </div>
    );
}

export default SwipePage;