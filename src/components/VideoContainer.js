import React, { useEffect } from "react";
import {playVideoFromCamera}  from '../helpers/WebRTC';

function VideoContainer({match}) {

    useEffect(() => {
        console.log('greetings', match);
        playVideoFromCamera(match)
    }, []);

    return (
        <div className="card">
            <h3>{match}</h3>
            <video className="cardContent" id={`video-${match}`} autoPlay playsInline controls={false}/>
        </div>
    );
}

export default VideoContainer;