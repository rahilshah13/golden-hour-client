import React, {useState, useEffect} from 'react';
import SwipePage from './SwipePage';
import { socket, createWebsocket } from '../helpers/Websocket';
import '../styles/lobby.css';

const tempDate = Date.now()

function Lobby() {
    // not_started, started
    const [event, setEvent] = useState({state: "not_started", start: Date.now(), end: 6969});
    const [now, setNow] = useState(Date.now());
    const [count, setCount] = useState(1);

    // TODO: make sure connection isn't being reset on re-render or refresh (?)
    useEffect(() => {
        createWebsocket(setCount);
        setEvent({ state: "started"});
    },[]);

    setInterval(() => setNow(Date.now()), 10000);

    switch(event) {
        case "started":
            return ( <SwipePage /> );
        default:
            return ( 
                <div className='lobbyContainer'>
                    <p>I JUST WALKED INTO THE LOBBY!</p> 
                    <p>COUNTDOWN: {now - tempDate} </p>
                    <p>Number of People Waiting: {count} </p>
                </div>
            );
    }
}



export default Lobby;