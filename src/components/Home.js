import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Question from './Question'
import Login from './Login'

class Home extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            questionStatus: 'unanswered'
        }
    }

    renderQuestions(userId) {

        const { questions, users } = this.props
        const { questionStatus } = this.state

        let userAnswers = Object.keys(users[userId].answers) 
            return Object.values(questions).filter((question) => {
                if(questionStatus === 'answered') {
                    return userAnswers.includes(question.id)
                } else {
                    return !userAnswers.includes(question.id)
                }
            }).sort((a,b) => b.timestamp - a.timestamp )           
            .map((question) => {
                return (
                    <div className="home-question-view" key={question.id}>
                        <Question id={question.id} />
                        <Link to={`/question/${question.id}`} id={question.id}>
                            <button>View Poll</button>
                        </Link>
                    </div>
                    
                )
            })
    }

    render () {
        // console.log('signed in?', this.props.signedIn)
        const { userId } = this.props
  
        return (
            <div>
                {
                this.props.signedIn ?
                <div>
                    <button onClick={() => this.setState({questionStatus: 'unanswered'})}>Unanswered Questions</button> 
                    <button onClick={() => this.setState({questionStatus: 'answered'})}>Answered Questions</button>        
                    {this.renderQuestions(userId)}
                </div>
                
                :
                <div className="home-login">
                    <p>Log in to see the questions</p>
                    <Login />
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps ({authedUser, questions, users}) {
    return {
        signedIn: authedUser.isSignedIn,
        questions,
        userId: authedUser.userId,
        users
    }
}

export default connect(mapStateToProps)(Home)