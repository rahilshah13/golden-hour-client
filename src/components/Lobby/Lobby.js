import React, {useState, useEffect} from 'react';
import SwipePage from '../SwipePage';
import { socket } from '../../helpers/Websocket';
import { FaHourglassHalf, FaUsers } from "react-icons/fa";
import { GenderSlider, getGenderLabel } from './GenderSlider';
import { PreferenceSlider, getPrefLabel } from './PreferenceSlider';
import { WavelengthField } from './WavelengthField';
import '../../styles/lobby.css';
import LabelButton from './LabelButton';

const tempDate = Date.now()
function handleReadyButton() {
    socket.emit("profile_update", "ligma");
}

const popOverButtonStyle = {"background": "none", "border": "none"};

function Lobby({user, setUser}) {
    // not_started, started
    const [event, setEvent] = useState({ ready: false, start: Date.now(), end: 6969, nUsers: 1});
    const [now, setNow] = useState(Date.now());
    const [genderEl, setGenderEl] = useState(null);
    const [prefEl, setPrefEl] = useState(null);
    const [wavelength, setWavelength] = useState("");


    const handleDebugToggleButton = (e) => {
        setUser({...user, ready: !user.ready});
        setEvent({...event, ready: !event.ready});
    };

    const handleGenderPopover = (e) => {setGenderEl(e.currentTarget)};
    const handlePrefPopover = (e) => {setPrefEl(e.currentTarget)};

    // TODO: make sure connection isn't being reset on re-render or refresh (?)
    useEffect(() => { socket.connect() },[]);

    // setInterval(() => {
    //     setNow(Date.now())
    //     setEvent({...event, nUsers: event.nUsers+1})
    // }, 5000);

    if(event.ready && user.ready)
            return ( 
                <div className='swipeContainer'>
                    <SwipePage /> 
                    <button onClick={handleDebugToggleButton}> toggle pages [DEBUG] </button>
                </div>
            );
    else {
        return ( 
            <div className='lobbyContainer'>
                <div className="timerAndCounter">
                    <div><FaHourglassHalf /> {now - tempDate} </div>
                    <div><FaUsers /> {event.nUsers}</div>
                </div>
                
                <GenderSlider user={user} setUser={setUser} anchorEl={genderEl} setAnchorEl={setGenderEl}/>
                <LabelButton onClick={handleGenderPopover} text={getGenderLabel(user.gender)} val={user.gender} mode="g"/>

                <PreferenceSlider setUser={setUser} user={user} anchorEl={prefEl} setAnchorEl={setPrefEl}/>
                <LabelButton onClick={handlePrefPopover} text={getPrefLabel(user.preference)} val={user.preference} mode="p" />
                <WavelengthField user={user} setUser={setUser}/>
                <div style={{margin: "5%"}}>
                    <button onClick={handleReadyButton}>ready</button>
                </div>
                <div style={{margin: "5%"}}>
                    <button onClick={handleDebugToggleButton}> toggle pages [DEBUG] </button>
                </div>
            </div>
        );
    }
}



export default Lobby;