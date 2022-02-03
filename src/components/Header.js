import React from 'react';
import '../App.css';

const handleLogout = () => {
    console.log("LOGOUT!");
}

const Header = ({isAuthenticated}) => {
    
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
            { isAuthenticated ? <p onClick={handleLogout}> logout </p> : null }
        </div>
    );
}

export default Header;