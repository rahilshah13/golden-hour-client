import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div>
            <Link to="/">
                Golden Hour
            </Link>
            <div>
                <Link to="/">
                    info
                </Link>
                <GoogleAuth />
            </div>
        </div>
    )
}

export default Header;