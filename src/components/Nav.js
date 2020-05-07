import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Nav extends Component  {
    render () {
        return (
            <div>
                <Link to="/" >
                    <button>Home</button>
                </Link>
                <Link to="/new">
                    <button>New Question</button>
                </Link>
                <Link to="/leaderboard">
                    <button>Leaderboard</button>
                </Link>
            </div>
        )
    }
}

export default Nav