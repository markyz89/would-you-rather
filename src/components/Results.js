import React, { Component } from 'react'
import { connect } from 'react-redux'


class Results extends Component  {
    render () {
        const {question, authedUser} = this.props

        let totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length 
        //console.log('results view',this.props)
        let OptOneBarWidth = { width: (question.optionOne.votes.length / totalVotes * 100) };
        let OptTwoBarWidth = { width: (question.optionTwo.votes.length / totalVotes * 100) };

        let userAnswer;
        console.log(question)
        if(question.optionOne.votes.includes(authedUser.userId)) {
            userAnswer = "One";
        } else if (question.optionTwo.votes.includes(authedUser.userId)) {
            userAnswer = "Two";
        }

        return (
            <div>
                <h2>Results</h2>

                <div class="option-one">
                    {userAnswer === "One" && <div><p>Your Answer</p></div>}
                    <h4>{question.optionOne.text}</h4>
                        <div class="bar-chart">
                            <div class="bar" style={OptOneBarWidth}></div>
                        </div>   

                    <p>{question.optionOne.votes.length} of {totalVotes} total votes.</p>
                </div>

                <div class="option-two">
                    {userAnswer === "Two" && <div><p>Your Answer</p></div>}
                    <h4>{question.optionTwo.text}</h4>
                    <p>{question.optionTwo.votes.length} of {totalVotes} total votes.</p>
                </div>




            </div>
        )
    }
}

function mapStateToProps({authedUser, questions}, {id}) {
    let question = questions[id]

    return {
        authedUser,
        questions,
        question
    }
}

export default connect(mapStateToProps)(Results)