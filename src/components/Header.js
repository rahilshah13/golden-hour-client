import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div>
            <Link to="/home"> Golden Hour </Link>
            <div> <GoogleAuth /> </div>
        </div>
    );
}

export default Header;