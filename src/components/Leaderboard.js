import React, { Component } from 'react'
import { connect } from 'react-redux'


class Leaderboard extends Component  {
    render () {
        const { users, authedUser } = this.props

        if(!authedUser.userId) {
            return <p>Please log in to see the Leaderboard</p>
        }


        const SortedUsers = Object.values(users).map((user) => {
            return {
                'username': user.name,
                'avatar': user.avatarURL,
                'questionScore': user.questions.length,
                'answerScore': Object.keys(user.answers).length,
                'totalScore': user.questions.length + Object.keys(user.answers).length,
            }
        })

        SortedUsers.sort((a,b) => b.totalScore - a.totalScore)

        return (
            <div>
                {SortedUsers.map((user) => {
                    
                    return(
                        <div className="score-card" key={user.username}>
                            <div className="user">
                                <h2>{user.username}</h2>
                                <img src={user.avatar} alt="user avatar" className="user-avatar"/>
                            </div>
                            <div className="score">    
                                <p>Answered Questions: {user.answerScore}</p>
                                <p>Created Questions: {user.questionScore}</p>
                                <div className="total-score">
                                    <h3>Score: {user.totalScore}</h3>
                                </div>
                            </div>
                            
                        </div>
                        
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps({users, authedUser}) {

    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(Leaderboard)