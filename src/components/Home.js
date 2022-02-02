import React, {useState, useEffect} from 'react';
import GoogleAuth from './GoogleAuth';
import Lobby from './Lobby';
const Home = () => {

    const [isAuthenticated, setAuth] = useState(false);

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