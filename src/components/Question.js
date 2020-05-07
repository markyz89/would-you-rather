import React, { Component } from 'react'
import { connect } from 'react-redux'

import { formatQuestion } from '../utils/_DATA.js'
import { answerQuestion } from '../actions/users'
import Results from './Results'

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
        const { authedUser, users, question, id } = this.props

        let user = authedUser.userId

        let userAnswerKeys = Object.keys(users[user].answers)
        console.log(userAnswerKeys)
        if(Object.keys(users[user].answers).includes(id)) {
            return (
                <Results id={id} />
            )
        }
        

        //     // would prefer for action to take place when submit button pressed
        // or maybe just have the results view rendered when submit is pressed. Have the state updated when answer is selected
        //     // have the authedUser in the reducer? Do I need to pass that via the action?
        // }
        return (
            <div><h2>Would You Rather...</h2>
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
                <div>
                    <h2>Would you rather...<br/>{question.optionOne.text} or {question.optionTwo.text}?</h2>
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