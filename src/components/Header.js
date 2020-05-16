import React, { Component } from 'react'
import { connect } from 'react-redux'

import Login from './Login'
import Nav from './Nav'



class Header extends Component  {

    render () {
        const {isSignedIn, route} = this.props
        let show = false;
        if(isSignedIn || route.length > 1) {
            show = true
        }
        return (
            <div className="header">
                <Nav />
                {show && (
                    <Login />
                    //
                )}
            </div>
        )
    }
}

const mapStateToProps = ( {authedUser}, props ) => {
    
    let route = props.location.pathname

    return { 
        isSignedIn: authedUser.isSignedIn,
        route
    }
}


export default connect(mapStateToProps)(Header)