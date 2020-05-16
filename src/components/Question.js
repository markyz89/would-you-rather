import React, { Component } from 'react'
import { connect } from 'react-redux'

import { answerQuestion } from '../actions/users'
import Results from './Results'
import FourOhFour from './FourOhFour'

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionAnswer: null
        }
    }

    handleChange = (e) => {
        let questionAnswer = this.state.questionAnswer
        let authedUser = this.props.authedUser
        let questionId = this.props.id
        this.props.answerQuestion({
            questionAnswer,
            authedUser,
            questionId,     
        })
        return false
    }
    

    loggedInRender() {
        const { authedUser, users, question, id, questions } = this.props

        // object.keys to make sure that the url works.
        if(!Object.keys(questions).includes(id)) {
            return (
                <FourOhFour />
            )
        }


        let user = authedUser.userId

        // let userAnswerKeys = Object.keys(users[user].answers)
        if(Object.keys(users[user].answers).includes(id)) {
            return (
                <Results id={id} />
            )
        }
        
        return (
            <div className="questions">
                <div className="image-content">
                    <img src={users[question.author].avatarURL} alt="user avatar" className="user-avatar"/>
                </div>
                <div className="text-content">
                <h1>{users[question.author].name} asks:</h1>
                    <h2>Would You Rather...</h2>
                    <form>
                        <label>
                        <input
                            type="radio"
                            name="questionOptions"
                            value="optionOne"
                            onChange={() => {this.setState({
                                questionAnswer: "optionOne"
                            })}}

                        />
                        {question.optionOne.text}
                        </label>
                        <label>
                        <input
                            type="radio"
                            name="questionOptions"
                            value="optionTwo"
                            onChange={() => {this.setState({
                                questionAnswer: "optionTwo"
                            })}}

                        />
                        {question.optionTwo.text}
                        </label>

                        <button onClick={() => {this.handleChange()}}>
                        Submit
                        </button>    
                    </form>
                </div>
            </div>
        )
    }

    
    render() {
        const { view, question, authedUser, users } = this.props
        if (view) {
            if(authedUser.userId) {
                return this.loggedInRender()
            } else {
                return <p>Please log in to see the question</p>
            }
            
        } else {
            return(
                <div className="questions">
                    <div className="image-content">
                        <img src={users[question.author].avatarURL} alt="user avatar" className="user-avatar"/>
                    </div>
                    <div className="text-content">
                        <h1>{users[question.author].name} asks:</h1>
                        <h2>Would you rather...<br/>{question.optionOne.text} or {question.optionTwo.text}?</h2>
                    </div>
                </div>
                
            )
        }
    }
}

function mapStateToProps ({authedUser, users, questions}, {id, view}) {
    let question = questions[id]
    
    return {
        authedUser,
        question,
        users,
        questions
        // don't think this is necessary as question is already in correct format
        //question: formatQuestion(question )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        answerQuestion: (answer) => {dispatch(answerQuestion(answer))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)