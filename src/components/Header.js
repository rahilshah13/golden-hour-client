import React from 'react';
import '../App.css';
import { socket } from '../helpers/Websocket';

function handleLogout(setAuth) {
    // clear cookies
    setAuth(false);
    console.log("LOGOUT!");
    socket.emit("logout", "hello");  
    socket.disconnect();
}

const Header = ({isAuthenticated, setAuth}) => {
    
    const style = { marginLeft: 'auto', 
                    marginRight: '0', 
                    display: 'flex', 
                    justifyContent: isAuthenticated ? 'space-between' : 'flex-start',
                    marginLeft: '2%',
                    marginRight: '2%'
    };

    return (
        <div style={style}>
            <p> golden hour </p>
            { isAuthenticated ? <p href="/" onClick={() => handleLogout(setAuth)}> logout </p> : null }
        </div>
    );
}

export default Header;