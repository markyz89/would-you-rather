import React, { Component } from 'react'
import { signIn, signOut } from '../actions'

import { connect } from 'react-redux'

class Login extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            user: 'sarahedo'
        }
        this.selectUser = this.selectUser.bind(this)
    }

    renderUsers(users) {
        return Object.values(users).map((user) => {
            return (
                <option value={user.id}>{user.name}</option>
            )
        })
    }

    selectUser(event) {
        this.setState({user: event.target.value})
    }
    
    onLogin() {
        this.props.signIn(this.state.user);
    }
    onLogout() {
        this.props.signOut();
    }

    render () {
 
        const {isSignedIn, users, userId } = this.props
            return (
                !isSignedIn
                ?
                <div>
                    <select value={this.state.user} onChange={this.selectUser}>
                        {this.renderUsers(users)}

                    </select>
                    <button onClick={() => this.onLogin()}>Log In</button> 
                </div>
                :
                <div>
                    <p>Hello {users[userId].name}</p>
                    <button onClick={() => this.onLogout()}>Log Out</button>
                </div>
            )
        }
    }

const mapStateToProps = ( {authedUser, users} ) => {
    
    return { 
        isSignedIn: authedUser.isSignedIn,
        userId: authedUser.userId,
        users
    }
}

export default connect(mapStateToProps, {signIn, signOut})(Login)