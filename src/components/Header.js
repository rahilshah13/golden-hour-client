import React from 'react';
import '../App.css';

const Header = ({isAuthenticated}) => {
    
    const style = { marginLeft: 'auto', 
                    marginRight: '0', 
                    display: 'flex', 
                    justifyContent: isAuthenticated ? 'space-between' : 'flex-start',
                    margin: '5%'
    };

    return (
        <div style={style}>
            <p> golden hour </p>
            { isAuthenticated ? <p> logout </p> : null }
        </div>
    );
}

export default Header;