import React from 'react';
import logo from './logo.svg';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="p-2">
                <img src={logo} alt="logo" />
            </div>
            <div className="encryption">
                <span className="encrypted">Encrypted</span>
                <span className="plain">b-&+(2'</span>
            </div>
        </div>
    );
};

export default Navbar;