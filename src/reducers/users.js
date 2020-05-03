import { RECEIVE_USERS, ANSWER_QUESTION } from '../actions/types'

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS : 
            return (
                {...state,
                ...action.users}
            )
            case ANSWER_QUESTION : 
                console.log(action)
                console.log(state)
                let { questionId, questionAnswer } = action.answer

                let newAnsweredQuestion = {[questionId] : questionAnswer}

                let userAnswers = state[action.answer.authedUser.userId].answers

                let newAnswers = {...userAnswers, ...newAnsweredQuestion}
                  
                return (
                    {...state, ...newAnswers}
                )
        default :
            return state
    }
}