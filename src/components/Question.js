import React, { Component } from 'react'
import { connect } from 'react-redux'

import { formatQuestion } from '../utils/_DATA.js'
import { answerQuestion } from '../actions/users'

class Question extends Component {

    // Need to render results if the question has been answered
    // Probably worth rendering a new component for this.
    // 

    handleChange = (event) => {
        let questionAnswer = event.target.value
        let authedUser = this.props.authedUser
        let questionId = this.props.id
        this.props.answerQuestion({
            questionAnswer,
            authedUser,
            questionId,     
        })
    }
    

    loggedInRender() {
        const { authedUser, users, question, id } = this.props

        // console.log(authedUser.userId)
        // console.log(question.optionOne.text)
        let answered = false;
        // let questionResponse;
        let user = authedUser.userId
        // console.log(users)
        // console.log(authedUser.userId)
        //let userAnswers = users[user].answers
        let userAnswerKeys = Object.keys(users[user].answers)
        console.log(userAnswerKeys)
        if(Object.keys(users[user].answers).includes(id)) {
            answered = true;
        }
        console.log(answered)

        //     // I want to be rendering out the results component here rather than checking a checkbox.
        //     // return <Results />

        //     // need to hook up an onchange method to the form.
        //     // this will have to dispatch an action. As a result will presumably have to create an action then 
        //     // a reducer to handle the action before I can expect something to show up in the store.
        //     // use mapDispatch to props to put the action on the props? Seems to be either that or importing

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
                            onChange={this.handleChange}

                        />
                        {question.optionOne.text}
                        </label>
                        <label>
                        <input
                            type="radio"
                            name="questionOptions"
                            value="optionTwo"
                            onChange={this.handleChange}

                        />
                        {question.optionTwo.text}
                        </label>
                        
                        
                    </form>

                
                </div>
        )
    }

    
    render() {
        const { view, question, authedUser } = this.props
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