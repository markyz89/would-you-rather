import React, { Component } from 'react'
import { connect } from 'react-redux'


class Results extends Component  {
    render () {
        const {question, authedUser, users} = this.props

        let totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length 
        let OptOneBarWidth = { width: `${question.optionOne.votes.length / totalVotes * 100}%` };
        let OptTwoBarWidth = { width: `${question.optionTwo.votes.length / totalVotes * 100}%` };

        let userAnswer;
        if(question.optionOne.votes.includes(authedUser.userId)) {
            userAnswer = "One";
        } else if (question.optionTwo.votes.includes(authedUser.userId)) {
            userAnswer = "Two";
        }

        return (
            <div className="results-container">
                <div className="question-asker">
                    <h1>{users[question.author].name} asked:</h1>
                    <div className="image-content">
                        <img src={users[question.author].avatarURL} alt="user avatar" className="user-avatar"/>
                    </div>
                </div>

                <div className="results">
                    <h2>Would you rather...</h2>

                    <div className="option-one">
                        
                        <div className="answer-box">
                            <h4>{question.optionOne.text}</h4>
                            {userAnswer === "One" && <div><p>Your Answer</p></div>}
                        </div>
                        
                            <div className="bar-chart">
                                <div className="bar" style={OptOneBarWidth}></div>
                            </div>   

                        <p>{question.optionOne.votes.length} of {totalVotes} total votes.</p>
                    </div>

                    <div className="option-two">
                        <div className="answer-box">
                            <h4>{question.optionTwo.text}</h4>
                            {userAnswer === "Two" && <div><p>Your Answer</p></div>}
                        </div>
                        <div className="bar-chart">
                                <div className="bar" style={OptTwoBarWidth}></div>
                            </div>   
                        <p>{question.optionTwo.votes.length} of {totalVotes} total votes.</p>
                    </div>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, {id}) {
    let question = questions[id]

    return {
        authedUser,
        questions,
        question,
        users
    }
}

export default connect(mapStateToProps)(Results)