import React, { useEffect } from "react";
import {playVideo }  from '../helpers/WebRTC';
import WsExample from "./WsExample";
import { createOffer } from '../helpers/WebRTC';

function VideoContainer({match}) {

    useEffect(() => {
        console.log('greetings', match);
        playVideo(match);
    }, []);

    return (
        <div className="card">
            <h3>{match}</h3>
            <video id={`remoteVideo-${match}`} style={{width:"100%", position: "absolute"}} autoPlay playsInline controls={false} />
            <video id={`localVideo-${match}`} style={{width:"100%", position: "absolute", top: "50%"}} autoPlay playsInline controls={false}/>
        </div>
    );
}

export default VideoContainer;