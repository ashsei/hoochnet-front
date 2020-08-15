import React, { Component } from 'react'
import Logo from './hoochnet.png'
import Login from './Login';
import { useAuth0 } from "@auth0/auth0-react";
import Logout from './Logout';

// !!! Links in Nav Need to Be Edited Upon Setup of Router -- Also need to uniform the links/buttons in the nav to be matching //

const Header = () => {
    const {isAuthenticated} = useAuth0();
    return (
        isAuthenticated ? (
            <div className="header">
                <img src={ Logo } className="logo" alt="HoochNet"/>
                <ul className="nav">
                    <li><a href = "/">Home</a></li>
                    <li><a href = "/">Random Drinks</a></li>
                    <li><a href = "/">Our Favorites</a></li>
                    <li><a href = "/">My Cabinet</a></li>
                    <li><Logout /></li>
                </ul>
            </div>
        ) : (
            <div className="header">
                <img src={ Logo } className="logo" alt="HoochNet"/>
                <ul className="nav">
                    <li><a href = "/">Home</a></li>
                    <li><a href = "/">Random Drinks</a></li>
                    <li><a href = "/">Our Favorites</a></li>
                    <li><Login /></li>
                </ul>
            </div>
        )
    )
}

export default Header;
