import React, {useState, useEffect} from 'react';
import GoogleAuth from './GoogleAuth';
import Lobby from './Lobby/Lobby';
const Home = ({isAuthenticated, setAuth}) => {
    const [user, setUser] = useState({ ready: false, gender: .5, preference: [0, 1], wavelength: ""});
    console.log("user updated: ", user);

    return (
        isAuthenticated 
        ? 
            <Lobby user={user} setUser={setUser}/>
        :
            <div className='oAuthButtonContainer'> 
                <GoogleAuth userState={user} setUser={setUser} setAuth={setAuth} /> 
                <p>sign in with vt email</p>
                <div style={{marginTop: "90vh", position: "absolute"}}>
                    <p> { Math.random() < .5 ? "do less." : "basic is good."}</p>
                </div>
            </div>
    );
}

export default Home;