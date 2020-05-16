import React, { Component } from 'react'

import Question from './Question'



class QuestionView extends Component  {
    render () {
        const { id } = this.props.match.params 

        // Need to have something here that checks if the ID in the address matches an ID in the questions array
        // At the moment, the behaviour is confusing. If you go to a question id that doesn't exist, you just get logged out.
        // More info on this knowledge link - https://knowledge.udacity.com/questions/95233
        // Also need to have the user avatar = probably easier in the question component as better access

        return (
            <div>
                <Question id={id} view="solo"/>
            </div>
        )
    }
}

export default QuestionView