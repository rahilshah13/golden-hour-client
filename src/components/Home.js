import React, {useState, useEffect} from 'react';
import GoogleAuth from './GoogleAuth';
import Lobby from './Lobby';
const Home = ({isAuthenticated, setAuth}) => {

    return (
        isAuthenticated 
        ? 
            <Lobby />
        :
            <div className='oAuthButtonContainer'> 
                <GoogleAuth setAuth={setAuth} /> 
                <p>sign in with vt email</p>
            </div>
    );
}

export default Home;