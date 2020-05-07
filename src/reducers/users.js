import { RECEIVE_USERS, ANSWER_QUESTION } from '../actions/types'

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS : 
            return (
                {...state,
                ...action.users}
            )
            case ANSWER_QUESTION : 
                let { questionId, questionAnswer } = action.answer

                let newAnsweredQuestion = {[questionId] : questionAnswer}

                let userAnswers = state[action.answer.authedUser.userId].answers

                let newAnswers = {...userAnswers, ...newAnsweredQuestion}

                  
                return {
                    ...state,
                    [state[action.answer.authedUser.userId].id]: {
                    ...state[action.answer.authedUser.userId],
                        answers: {
                        ...state[action.answer.authedUser.userId].answers,
                        ...newAnsweredQuestion
                        }    
                    }
                }


        default :
            return state
    }
}