import React, { Component } from 'react'
import { connect } from 'react-redux'

import { formatQuestion } from '../utils/_DATA.js'
import { addQuestion } from '../actions/questions'


class NewQuestion extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            questionOneText: '',
            questionTwoText: ''
        }

        this.handleQ1Change = this.handleQ1Change.bind(this)
        this.handleQ2Change = this.handleQ2Change.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleQ1Change(e) {
        this.setState({questionOneText: e.target.value})
    }

    handleQ2Change(e) {
        this.setState({questionTwoText: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const {questionOneText, questionTwoText} = this.state
        const {user, addQuestion} = this.props

        let question = formatQuestion({optionOneText: questionOneText, optionTwoText:questionTwoText, author: user})
        addQuestion(question)
        this.props.history.push('/')
    }

    
    render () {    
        
        return (
            <div>
                {
                this.props.signedIn ?
                <div className="create-question">
                    

                    <h2>Create New Question</h2>
                    <p>Complete the question:</p>
                    <h3>Would you rather...</h3>

                    <form onSubmit={this.handleSubmit}>
                        <input
                        placeholder="Enter Question One Option text here"
                        value = {this.state.questionOneText}
                        onChange={this.handleQ1Change}
                        />

                        <p>OR</p>

                        <input
                        placeholder="Enter Question One Option text here"
                        value = {this.state.questionTwoText}
                        onChange={this.handleQ2Change}
                        />
                        <button type="submit">Submit</button> 
                    </form>

                </div>
                :
                <div>
                    <p>Sign in to create a question</p>
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps ({authedUser}) {
    let user = authedUser.userId;
    return {
        signedIn: authedUser.isSignedIn,
        user
    }

}

function mapDispatchToProps(dispatch) {
    return {
        addQuestion: (question) => {dispatch(addQuestion(question))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion)