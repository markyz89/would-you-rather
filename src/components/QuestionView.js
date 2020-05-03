import React, { Component } from 'react'

import Question from './Question'



class QuestionView extends Component  {
    render () {
        const { id } = this.props.match.params 
        return (
            <div>
                <Question id={id} view="solo"/>
            </div>
        )
    }
}

export default QuestionView