import React, { useState } from 'react';
import GoogleAuth from './GoogleAuth';
import Lobby from './Lobby/Lobby';
import background from '../styles/golden-hour-drawing.png';

const Home = ({isAuthenticated, setAuth}) => {
    const [user, setUser] = useState({ ready: false, gender: .5, preference: [0, 1], wavelength: ""});
    const [clicked, setClicked] = useState();

    return (
        isAuthenticated 
        ? 
            <Lobby user={user} setUser={setUser}/>
        :
            <div className='oAuthButtonContainer' style={{ 
                backgroundImage: `url(${background})`, 
                backgroundPosition: "center",
                backgroundSize: "80%",
                backgroundRepeat: "no-repeat",
            }}> 
                <GoogleAuth userState={user} setUser={setUser} setAuth={setAuth} /> 
                <p>sign in with vt email</p>
                <div className="gradient">
                    <p onClick={() => setClicked(!clicked)}> { clicked ? "basic is good" : "do less" } </p>
                </div>
            </div>
    );
}

export default Home;