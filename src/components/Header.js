import React, { Component } from 'react'

import Login from './Login'
import Nav from './Nav'



class Header extends Component  {
    render () {
        return (
            <div>
                <Nav />
                
                <Login />
            </div>
        )
    }
}

export default Header