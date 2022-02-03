import React, {useState, useEffect} from 'react';
import SwipePage from './SwipePage';
import { socket, createWebsocket } from '../helpers/Websocket';
import '../styles/lobby.css';

const tempDate = Date.now()

function Lobby() {
    // not_started, started
    const [event, setEvent] = useState({ status: "not_started", start: Date.now(), end: 6969 });
    const [user, setUser] = useState({ ready: false, gender: 50, seeking: ""});

    const [now, setNow] = useState(Date.now());
    const [count, setCount] = useState(1);


    // TODO: make sure connection isn't being reset on re-render or refresh (?)
    useEffect(() => {
        createWebsocket(setCount);
        setEvent({...event, eventStatus: "started"});
    },[]);

    setInterval(() => setNow(Date.now()), 10000);

    switch(event) {
        case "started":
            return ( <SwipePage /> );
        default:
            return ( 
                <div className='lobbyContainer'>
                    <p>LOBBY</p> 
                    <p>COUNTDOWN: {now - tempDate} </p>
                    <p>Number of People Waiting: {count} </p>
                    <input type="range" min="1" max="100" step="1" value={user.gender} onChange={(e) => setUser({...user, gender: e.target.value})} />
                    <span> 
                        { <p> I'm {user.gender} </p> }
                    </span>
                
                    <span> 
                        {
                            user.seeking === ""
                            ? <p> drop down selection </p>
                            : <p> my matching preference is {user.seeking} </p> 
                        }
                    </span>
                    
                </div>
            );
    }
}



export default Lobby;