import React, { Component } from 'react'
import Logo from './hoochnet.png'
import Login from './Login'

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <img src={ Logo } className="logo" alt="HoochNet"/>
                <ul className="nav">
                    <li><a href = "/">Home</a></li>
                    <li><a href = "/">Random Drinks</a></li>
                    <li><a href = "/">Our Favorites</a></li>
                    <li><a href = "/">My Cabinet</a></li>
                    <li><Login /></li>
                </ul>
            </div>
        )
    }
}
