import React, { useState } from 'react';
import GoogleAuth from './GoogleAuth';
import Lobby from './Lobby/Lobby';
const Home = ({isAuthenticated, setAuth}) => {
    const [user, setUser] = useState({ ready: false, gender: .5, preference: [0, 1], wavelength: ""});
    const [clicked, setClicked] = useState();

    return (
        isAuthenticated 
        ? 
            <Lobby user={user} setUser={setUser}/>
        :
            <div className='oAuthButtonContainer'> 
                <GoogleAuth userState={user} setUser={setUser} setAuth={setAuth} /> 
                <p>sign in with vt email</p>
                <div className="gradient">
                    <p onClick={() => setClicked(!clicked)}> { clicked ? "basic is good" : "do less" } </p>
                </div>
            </div>
    );
}

export default Home;