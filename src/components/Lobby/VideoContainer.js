import React, { useEffect } from "react";
import {playVideo }  from '../../helpers/WebRTC';
import WsExample from "../WsExample";
import { createOffer } from '../../helpers/WebRTC';
import '../../styles/lobby.css';
import { isMobile } from 'react-device-detect';

function VideoContainer({match}) {

    const rvStyle =  isMobile 
    ? {width:"100%", position: "absolute"} 
    : {maxWidth:"40vw", maxHeight: "75vh", position: "absolute", left: "50%"};

    const lvStyle = isMobile 
    ? {width:"100%", position: "absolute", top: "50%"}
    : {maxWidth:"40vw", maxHeight: "75vh", position: "absolute", marginTop: "0vh"};

    useEffect(() => {
        console.log('greetings', match);
        playVideo(match);
    }, []);

    return (
        <div className="card">
            <h3>{match}</h3>
            <video id={`remoteVideo-${match}`} style={rvStyle} autoPlay playsInline controls={false} />
            <video id={`localVideo-${match}`} style={lvStyle} autoPlay playsInline controls={false}/>
        </div>
    );
}

export default VideoContainer;