import React, {useState, useEffect} from 'react';
import SwipePage from './SwipePage';
import { socket, createWebsocket } from '../helpers/Websocket';

function Lobby() {
    // not_started, started
    const [event, setEvent] = useState({state: "not_started"});

    // TODO: make sure connection isn't being reset on re-render or refresh (?)
    useEffect((setEvent)=>{
        createWebsocket();
        setEvent({state: "started"});
    },[]);

    switch(event) {
        case "not_started":
            return ( <p>I JUST WALKED INTO THE LOBBY!</p> );
        case "started":
            return ( <SwipePage /> );
        default:
            return ( <p>I JUST WALKED INTO THE LOBBY!</p> )
    }
}

export default Lobby;